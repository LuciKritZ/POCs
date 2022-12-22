import ACTIONS from './actions';
import {
  LOCAL_STORAGE_VARIABLES,
  NO_MATCHED_ACTION,
} from './constants.context';

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.OPEN_LOGIN:
      return { ...state, isLoginOpen: true };

    case ACTIONS.CLOSE_LOGIN:
      return { ...state, isLoginOpen: false };

    case ACTIONS.START_LOADER:
      return { ...state, isLoading: true };

    case ACTIONS.END_LOADER:
      return { ...state, isLoading: false };

    case ACTIONS.UPDATE_ALERT:
      return { ...state, alert: action.payload };

    case ACTIONS.UPDATE_USER:
      localStorage.setItem(
        LOCAL_STORAGE_VARIABLES.CURRENT_USER,
        JSON.stringify(action.payload)
      );
      return { ...state, currentUser: action.payload };

    default:
      throw new Error(NO_MATCHED_ACTION);
  }
};

export default reducer;
