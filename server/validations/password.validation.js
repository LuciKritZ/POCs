export const passwordValidator = (password) => {
  if (password.length < 6) {
    return false;
  }
  return true;
};
