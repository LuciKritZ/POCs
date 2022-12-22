import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import If from '../if/if.component';

const Password = ({ passwordRef, id = 'password', label = 'Password' }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDown = (e) => e.preventDefault();

  const handleClick = () =>
    setShowPassword((prevPasswordFlag) => !prevPasswordFlag);

  return (
    <TextField
      margin='normal'
      variant='standard'
      id={id}
      label={label}
      type={showPassword ? 'text' : 'password'}
      fullWidth
      inputRef={passwordRef}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
              <If
                condition={showPassword}
                render={() => <VisibilityOff />}
                elseRender={() => <Visibility />}
              />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Password;
