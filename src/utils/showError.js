export const showError = (error) => {
  const errorMsg =
    error?.response?.data?.error ||
    "Failed to perform action, An Error Occurred!!";
  return errorMsg;
};
