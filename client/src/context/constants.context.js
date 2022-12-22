export const LOCAL_STORAGE_VARIABLES = {
  CURRENT_USER: 'currentUser',
};

export const NO_MATCHED_ACTION = 'No matched action!';

export const initialState = {
  currentUser: null,
  isLoginOpen: false,
  isLoading: false,
  alert: {
    open: false,
    severity: 'info',
    message: '',
  },
};
