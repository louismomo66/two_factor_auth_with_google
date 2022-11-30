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
  url: `/api/v1/auth/forgot-password`,
});
export const passwordResetRoute = () => ({
  url: `/api/v1/auth/reset-password`,
});

export const requestAccountVerificationRoute = () => ({
  url: `/api/v1/users/requestAccountVerification`,
});
export const accountVerificationRoute = () => ({
  url: `/api/v1/auth/verify-email`,
});
export const getStats = () => ({
  url: `/api/v1/lab-access/stats`,
});
