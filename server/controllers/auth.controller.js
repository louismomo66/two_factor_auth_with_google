const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../users/user");
const { userExtractor } = require("../../utils/middleware");
const AppError = require("../../utils/AppError");
const Email = require("../../utils/email");
const crypto = require("crypto");

router.post("/login", async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });
  if (!(user && password)) throw new AppError("Invalid email or password", 401);
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  if (!user.enabled) {
    return response.status(401).json({
      error: "Account not enabled",
    });
  }

  const userForToken = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    id: user._id,
  };
  const expiryHours = parseInt(process.env.JWT_EXPIRES_IN);
  const expiresIn = expiryHours * 60 * 60; // has to be seconds
  const tokenExpiry = new Date();
  tokenExpiry.setHours(tokenExpiry.getHours() + expiryHours);

  const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });

  response.status(200).send({
    user,
    token,
    tokenExpiry,
  });
});

router.post("/register", async (req, res, next) => {
  const passwordHash = req.body.password;
  const body = req.body;
  let verifyToken = '' + Math.floor(100000 + Math.random() * 900000)
  delete body.password;
  const user = await User.create({ ...body, passwordHash, verifyToken });

  const subject = "Email Verification";
  const message = "Verify your Email address";

  await new Email(user, subject, message).sendVerifyAccount(verifyToken);
  res.status(200).send({
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });
});

router.patch("/updateuser", userExtractor, async (req, res) => {
  const { firstName, lastName, phone, country, city, street, partner } =
    req.body;
  if (!firstName || !lastName || !country || !city || !street) {
    return res.status(400).json({
      error: "Provide all values",
    });
  }
  const user = await User.findOne({ _id: req.user.id });
  //update
  user.firstName = firstName;
  user.lastName = lastName;
  user.address.country = country;
  user.address.city = city;
  user.address.street = street;
  user.phone = phone;
  user.partner = partner;

  await user.save();

  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET);
  res.status(200).send({
    user,
    token,

    phone: user.phone,
    firstName: user.firstName,
    country: user.address.country,
    city: user.address.city,
    street: user.address.street,
    partner: user.partner,
  });
});

router.post('/forgot-password', async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  const returnUrl = req.body.returnUrl;
  if (!returnUrl) throw new AppError("Return url not specified", 400)
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `${returnUrl}?token=${resetToken}`;
    const subject = "Reset Password";
    const message = "Request for password reset";

    await new Email(user, subject, message).sendPasswordReset(resetURL);

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(err)
    return next(
      new AppError("There was an error sending the email. Try again later!", 500))
  }
})

router.post('/reset-password', async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.passwordHash = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.status(200).json({
    status: "success",
    message: "Password reset successfully",
  });
});

router.post('/verify-email', async (req, res, next) => {
  const email = req.body.email;
  const code = req.body.code;
  if(!email || !code) throw new AppError('Email and Code are required', 400);

  const user = await User.findOne({
    email: email,
    verifyToken: code
  });

  if(!user) throw new AppError('Invalid email or code', 400);
  user.verifyToken = ''
  user.emailConfirmed = true;
  user.enabled = true;

  await user.save();

  res.status(200).json({
    status: "success",
    message: "Account verified successfully",
    user: user
  });

});

module.exports = router;
