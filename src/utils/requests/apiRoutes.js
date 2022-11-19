//AUTH ROUTES
export const loginRoute = () => ({
  url: `/api/v1/auth/login`,
});
export const signupRoute = () => ({
  url: `/api/v1/auth/register`,
});
export const profileUpdateRoute = (userId) => ({
  url: `/api/v1/users/${userId}`,
});
export const getPartnersRoute = () => ({
  url: `/api/v1/partners`,
});

export const forgotPasswordRoute = () => ({
  url: `/api/v1/users/forgotPassword`,
});
export const passwordResetRoute = (resetToken) => ({
  url: `/api/v1/users/resetPassword/${resetToken}`,
});

export const requestAccountVerificationRoute = () => ({
  url: `/api/v1/users/requestAccountVerification`,
});
export const accountVerificationRoute = (verificationToken) => ({
  url: `/api/v1/users/verifyAccount/${verificationToken}`,
});
