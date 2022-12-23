export const LOCAL_STORAGE_VARIABLES = {
  CURRENT_USER: 'currentUser',
};

export const getCurrentUser = () => {
  const currentUser = localStorage.getItem(
    LOCAL_STORAGE_VARIABLES.CURRENT_USER
  );
  return JSON.parse(currentUser);
};

export const setCurrentUser = (currentUser) => {
  localStorage.setItem(
    LOCAL_STORAGE_VARIABLES.CURRENT_USER,
    JSON.stringify(currentUser)
  );
};
