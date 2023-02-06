import ACTIONS from '../context/actions';
import { useValue } from '../context/provider';
import fetchData from '../utils/fetch-data.util';
const url = process.env.REACT_APP_SERVER_URL + '/user';

export const register = async (user, dispatch) => {
  dispatch({
    type: ACTIONS.START_LOADER,
  });

  const result = await fetchData(
    {
      url: url + '/register/',
      body: user,
    },
    dispatch
  );

  if (result) {
    dispatch({
      type: ACTIONS.UPDATE_USER,
      payload: result,
    });
    dispatch({
      type: ACTIONS.CLOSE_LOGIN,
    });
    dispatch({
      type: ACTIONS.UPDATE_ALERT,
      payload: {
        open: true,
        severity: 'success',
        message: 'Your account has been created successfully',
      },
    });
  }

  dispatch({
    type: ACTIONS.END_LOADER,
  });
};

export const login = async (user, dispatch) => {
  dispatch({
    type: ACTIONS.START_LOADER,
  });

  const result = await fetchData(
    {
      url: url + '/login/',
      body: user,
    },
    dispatch
  );

  if (result) {
    dispatch({
      type: ACTIONS.UPDATE_USER,
      payload: result,
    });
    dispatch({
      type: ACTIONS.CLOSE_LOGIN,
    });
  }

  dispatch({
    type: ACTIONS.END_LOADER,
  });
};

export const useUpdateUser = (payload) => {
  const { dispatch } = useValue();
  dispatch({
    type: ACTIONS.UPDATE_USER,
    payload,
  });
};
