import React from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Button,
} from '@mui/material';
import { Menu, Lock } from '@mui/icons-material';
import { useValue } from '../../context/provider';
import If from '../if/if.component';
import UserIcons from './user-icons.component';
import ACTIONS from '../../context/actions';

const Navbar = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();
  return (
    <AppBar>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ mr: 1 }}>
            <IconButton>
              <Menu />
            </IconButton>
          </Box>
          <Typography
            variant='h6'
            component='h1'
            noWrap
            sx={{
              flexGrow: 1,
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            TraveLZ
          </Typography>
          <Typography
            variant='h6'
            component='h1'
            noWrap
            sx={{
              flexGrow: 1,
              display: {
                xs: 'flex',
                md: 'none',
              },
            }}
          >
            TLZ
          </Typography>
          <If
            condition={!currentUser}
            render={() => (
              <Button
                color='inherit'
                startIcon={<Lock />}
                onClick={() =>
                  dispatch({
                    type: ACTIONS.OPEN_LOGIN,
                  })
                }
              >
                Login
              </Button>
            )}
            elseRender={() => <UserIcons />}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
