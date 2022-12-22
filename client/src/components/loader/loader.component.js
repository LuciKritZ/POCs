import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useValue } from '../../context/provider';

const Loader = () => {
  const {
    state: { isLoading },
  } = useValue();
  return (
    <Backdrop
      open={isLoading}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
    >
      <CircularProgress
        sx={{
          color: 'white',
        }}
      />
    </Backdrop>
  );
};

export default Loader;
