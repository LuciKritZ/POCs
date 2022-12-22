import React, { useState } from 'react';
import { Google } from '@mui/icons-material';
import { Button } from '@mui/material';
import jwtDecode from 'jwt-decode';

import { useValue } from '../../context/provider';
import ACTIONS from '../../context/actions';

const OneTapLogin = () => {
  const [disabled, setDisabled] = useState(false);
  const { dispatch } = useValue();

  const handleResponse = (response) => {
    const token = response?.credential;
    const decodedToken = jwtDecode(token);
    const { sub: id, email, name, picture: photo } = decodedToken;
    dispatch({
      type: ACTIONS.UPDATE_USER,
      payload: {
        id,
        email,
        name,
        photo,
        token,
        google: true,
      },
    });
    dispatch({
      type: ACTIONS.CLOSE_LOGIN,
    });
  };

  const handleGoogleLogin = () => {
    setDisabled(true);
    try {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleResponse,
      });
      window.google.accounts.id.prompt((notification) => {
        if (notification?.isNotDisplayed()) {
          throw new Error('Try to clear the cookies or try again later!');
        }
        if (
          notification?.isSkippedMoment() ||
          notification?.isDismissedMoment()
        ) {
          setDisabled(false);
        }
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.UPDATE_ALERT,
        payload: {
          open: true,
          severity: 'error',
          message: error?.message || 'Unable to perform the login.',
        },
      });
      console.log(error);
    }
  };

  return (
    <Button
      variant='outlined'
      startIcon={<Google />}
      disabled={disabled}
      onClick={handleGoogleLogin}
    >
      Login with Google
    </Button>
  );
};

export default OneTapLogin;
