const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  getAllUsers,
  protect,
  updateMe,
  validate,
  updateUserDetail,
  RequestAccountVerification,
  verifyAccount,
  searchUsers,
  requestAccess,
  grantAccess,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/updateDetails", updateUserDetail);
router.post("/requestAccess", requestAccess);
router.post("/grantAccess", grantAccess);
router.post("/forgotPassword", forgotPassword);
router.post("/requestAccountVerification", RequestAccountVerification);
router.patch("/resetPassword/:token", resetPassword);
router.patch("/verifyAccount", verifyAccount);
// router.patch("/verifyAccount", verifyAccount);
router.patch("/updateMe", protect, updateMe);
router.get("/validate", protect, validate);
router.get("/search", protect, searchUsers);
router.get("/", protect, getAllUsers);

module.exports = router;
