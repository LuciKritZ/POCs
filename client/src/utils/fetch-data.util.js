import ACTIONS from '../context/actions';
import { getHeaders } from './headers.util';

const DEFAULT_ERROR_MESSAGE = "Couldn't fetch data";

const fetchData = async (
  { url, method = 'POST', token = '', body = null },
  dispatch
) => {
  const headers = getHeaders(token);
  body = body
    ? {
        body: JSON.stringify(body),
      }
    : {};
  try {
    const response = await fetch(url, {
      method,
      headers,
      ...body,
    }).then((res) => res.json());
    const data = response;

    if (!data) {
      if (response.status === 401) {
        dispatch({
          type: ACTIONS.UPDATE_USER,
          payload: null,
        });
      }
    }
    if (!data?.success) {
      throw new Error(data.message || DEFAULT_ERROR_MESSAGE);
    }
    return data.result;
  } catch (error) {
    dispatch({
      type: ACTIONS.UPDATE_ALERT,
      payload: {
        open: true,
        severity: 'error',
        message: error.message,
      },
    });
    console.error(error);
    return;
  }
};

export default fetchData;
