import ACTIONS from '../context/actions';
import { useValue } from '../context/provider';

export const useUpdateUser = (payload) => {
  const { dispatch } = useValue();
  dispatch({
    type: ACTIONS.UPDATE_USER,
    payload,
  });
};
