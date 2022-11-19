export const isValidEmail = (value) => {
  if (
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
      value
    )
  ) {
    return true;
  } else {
    return false;
  }
};

export const isEmptyObject = (obj) => {
  return JSON.stringify(obj) === "{}";
};
