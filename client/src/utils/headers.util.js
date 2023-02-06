export const getHeaders = (token) => {
  let headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    return {
      ...headers,
      authorization: `Bearer ${token}`,
    };
  }
  return headers;
};
