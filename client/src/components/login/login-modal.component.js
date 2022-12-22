import React, { useEffect, useRef, useState } from 'react';
import { useValue } from '../../context/provider';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { Close, Send } from '@mui/icons-material';
import If from '../if/if.component';
import Password from '../form/password.component';
import OneTapLogin from '../one-tap-login/one-tap-login.component';
import ACTIONS from '../../context/actions';

const LoginModal = () => {
  const {
    state: { isLoginOpen },
    dispatch,
  } = useValue();
  const [title, setTitle] = useState('Login');
  const [isRegister, setIsRegister] = useState(false);

  // References to the input fields.
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleClose = () => dispatch({ type: ACTIONS.CLOSE_LOGIN });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Testing Loader
    dispatch({
      type: ACTIONS.START_LOADER,
    });
    setTimeout(() => {
      dispatch({
        type: ACTIONS.END_LOADER,
      });
    }, 6000);

    // Testing Notifications
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    if (password !== confirmPassword) {
      dispatch({
        type: ACTIONS.UPDATE_ALERT,
        payload: {
          open: true,
          severity: 'error',
          message: 'Passwords do not match.',
        },
      });
    }
  };

  const handleRegister = () =>
    setIsRegister((prevRegisterFlag) => !prevRegisterFlag);

  useEffect(() => {
    isRegister ? setTitle('Register') : setTitle('Login');
  }, [isRegister]);

  return (
    <Dialog open={isLoginOpen} onClose={handleClose}>
      <DialogTitle>
        {title}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Please fill your information in the fields below:
          </DialogContentText>
          <If
            condition={isRegister}
            render={() => (
              <TextField
                autoFocus
                margin='normal'
                variant='standard'
                id='name'
                label='Name'
                type='text'
                fullWidth
                inputRef={nameRef}
                inputProps={{
                  minLength: 2,
                }}
                required
              />
            )}
          />
          <TextField
            autoFocus={!isRegister}
            margin='normal'
            variant='standard'
            id='email'
            label='Email'
            type='text'
            fullWidth
            inputRef={emailRef}
            required
          />
          <Password {...{ passwordRef }} />
          <If
            condition={isRegister}
            render={() => (
              <Password
                passwordRef={confirmPasswordRef}
                id='confirmPassword'
                label='Confirm Password'
              />
            )}
          />
        </DialogContent>
        <DialogActions
          sx={{
            px: '19px',
          }}
        >
          <Button type='submit' variant='contained' endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
      <DialogActions
        sx={{
          justifyContent: 'left',
          p: '5px 24px',
        }}
      >
        <If
          condition={isRegister}
          render={() => 'Do you have an account? Sign in now.'}
          elseRender={() => "Don't you have an account? Create one now."}
        />
        <Button onClick={handleRegister}>
          <If
            condition={isRegister}
            render={() => 'Login'}
            elseRender={() => 'Register'}
          />
        </Button>
      </DialogActions>
      <DialogActions
        sx={{
          justifyContent: 'center',
          py: '24px',
        }}
      >
        <OneTapLogin />
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
