import { toast } from "react-toastify";
import { axios } from "../../utils/axios";
import {
  accountVerificationRoute,
  forgotPasswordRoute,
  loginRoute,
  passwordResetRoute,
  profileUpdateRoute,
  signupRoute,
} from "../../utils/requests/apiRoutes";
import { showError } from "../../utils/showError";
import {
  authenticationSuccess,
  autoAuthenticationSuccess,
  logout,
  setAuthenticationLoading,
  updateProfileSuccess,
} from "../slices/authSlice";

export const registerUser = (data, navigate) => {
  return async (dispatch) => {
    dispatch(setAuthenticationLoading(true));
    try {
      const { url } = signupRoute();
      const res = await axios.post(url, data);
      dispatch(setAuthenticationLoading(false));
      if (res.status === 200) {
        toast.success(
          "Account created Successfully, Check your email for a link to verify it"
        );
        localStorage.setItem("userEmail", data?.email);
        navigate("/verify-account");
      }
    } catch (err) {
      toast.error(showError(err));
      dispatch(setAuthenticationLoading(false));
    }
  };
};

export const updateUserDetails = (data, userId) => {
  return async (dispatch) => {
    dispatch(setAuthenticationLoading(true));
    try {
      const { url } = profileUpdateRoute(userId);
      const res = await axios.patch(url, data);
      localStorage.setItem("CurrentUser", JSON.stringify(res.data));
      dispatch(updateProfileSuccess(res.data));
      dispatch(setAuthenticationLoading(false));
      if (res.status === 200) {
        toast.success("Profile updated Successfully");
      }
    } catch (err) {
      toast.error(showError(err));
      dispatch(setAuthenticationLoading(false));
    }
  };
};

export const loginUser = (data, navigate) => {
  return async (dispatch) => {
    dispatch(setAuthenticationLoading(true));
    try {
      const { url } = loginRoute();
      const res = await axios.post(url, data);
      dispatch(
        authenticationSuccess({
          data: res?.data,
          user: res?.data?.user,
          token: res?.data?.token,
        })
      );
      toast.success("Login successful");
      SaveTokenInLocalStorage(dispatch, res?.data);
      dispatch(setAuthenticationLoading(false));
      navigate("/dashboard");
    } catch (err) {
      dispatch(setAuthenticationLoading(false));
      if (err?.response?.status === 401) {
        return toast.error("Invalid email/password!");
      } else if (err?.response?.status === 403) {
        return toast.error("Please verify your account and try again");
      } else {
        toast.error(showError(err));
      }
    }
  };
};

export const forgotPassword = (data) => {
  return async (dispatch) => {
    dispatch(setAuthenticationLoading(true));
    try {
      const { url } = forgotPasswordRoute();
      const res = await axios.post(url, data);
      if (res.status === 200) {
        toast.success("Please check your email for a link to reset password");
      }
      dispatch(setAuthenticationLoading(false));
    } catch (err) {
      dispatch(setAuthenticationLoading(false));
      toast.error(showError(err));
    }
  };
};

export const verifyCode = (data, navigate) => {
  return async (dispatch) => {
    dispatch(setAuthenticationLoading(true));
    try {
      const { url } = accountVerificationRoute();
      const res = await axios.post(url, data);
      dispatch(setAuthenticationLoading(false));
      if (res.status === 200) {
        navigate("/login");
        toast.success("Account verified successfully");
        localStorage.removeItem("userEmail");
      }
    } catch (err) {
      dispatch(setAuthenticationLoading(false));
      toast.error(showError(err));
    }
  };
};

export const resetPassword = (data, navigate) => {
  return async (dispatch) => {
    dispatch(setAuthenticationLoading(true));
    try {
      const { url } = passwordResetRoute();
      const res = await axios.post(url, data);
      toast.success("Password changed successfully");
      dispatch(setAuthenticationLoading(false));
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      dispatch(setAuthenticationLoading(false));
      toast.error(showError(err));
    }
  };
};

export const SaveTokenInLocalStorage = (dispatch, userDetails) => {
  const expiresIn =
    new Date(userDetails.tokenExpiry).getTime() - new Date().getTime();
  console.log(expiresIn);
  logOutTimer(dispatch, expiresIn);
  let AuthTokenDetails = {
    token: userDetails.token,
    expiresIn: expiresIn,
    tokenExpiry: userDetails.tokenExpiry,
  };
  localStorage.setItem("AuthToken", JSON.stringify(AuthTokenDetails));
  localStorage.setItem("CurrentUser", JSON.stringify(userDetails.user));
};

export const logOutTimer = (dispatch, timer) => {
  setTimeout(() => {
    dispatch(logout());
  }, timer);
};

export const AutoAuthenticate = (dispatch) => {
  const AuthToken = localStorage.getItem("AuthToken");
  const CurrentUser = localStorage.getItem("CurrentUser");
  let UserToken = "";
  if (!AuthToken) {
    dispatch(logout());
    return;
  }
  UserToken = JSON.parse(AuthToken);
  let expireDate = new Date(UserToken.tokenExpiry);
  let todaysDate = new Date();
  if (todaysDate > expireDate) {
    return dispatch(logout());
  }
  let data = {
    token: UserToken.token,
    user: JSON.parse(CurrentUser),
  };
  // validateToken(UserToken)
  dispatch(autoAuthenticationSuccess(data));

  const timer = expireDate.getTime() - todaysDate.getTime();
  logOutTimer(dispatch, timer);
};
