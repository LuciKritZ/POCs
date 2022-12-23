import { createContext, useContext, useEffect, useReducer } from 'react';
import { getCurrentUser } from '../helpers/local-storage.helper';
import ACTIONS from './actions';
import { initialState } from './constants.context';
import reducer from './reducer';

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      dispatch({
        type: ACTIONS.UPDATE_USER,
        payload: currentUser,
      });
    }
  }, []);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
