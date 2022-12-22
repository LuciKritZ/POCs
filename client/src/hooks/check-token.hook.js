import { useEffect } from 'react';
import { useValue } from '../context/provider';
import jwtDecode from 'jwt-decode';
import ACTIONS from '../context/actions';

const useCheckToken = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (currentUser) {
      const decodedToken = jwtDecode(currentUser.token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch({
          type: ACTIONS.UPDATE_USER,
          payload: null,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useCheckToken;
