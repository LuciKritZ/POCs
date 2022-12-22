import { Menu, MenuItem, ListItemIcon } from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
import React from 'react';
import { useValue } from '../../context/provider';
import useCheckToken from '../../hooks/check-token.hook';
import ACTIONS from '../../context/actions';

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  useCheckToken();
  const {
    dispatch,
    state: { currentUser },
  } = useValue();

  const handleCloserUserMenu = () => {
    setAnchorUserMenu(null);
  };

  const testAuthorization = async () => {
    const url = process.env.REACT_APP_SERVER_URL + '/room';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${currentUser.token}`,
        },
      });
      const data = await response.json();

      console.log(data);
      if (!data.success) {
        if (response.status === 401) {
          dispatch({
            type: ACTIONS.UPDATE_USER,
            payload: null,
          });
        }
        throw new Error(data?.message);
      }
    } catch (error) {
      dispatch({
        type: ACTIONS.UPDATE_ALERT,
        payload: {
          open: true,
          severity: 'error',
          message: error?.message,
        },
      });
      console.error(error);
    }
  };

  return (
    <Menu
      anchorEl={anchorUserMenu}
      open={Boolean(anchorUserMenu)}
      onClose={handleCloserUserMenu}
      onClick={handleCloserUserMenu}
    >
      {/* For testing purpose */}
      <MenuItem onClick={testAuthorization}>
        <ListItemIcon>
          <Settings fontSize='small' />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => dispatch({ type: ACTIONS.UPDATE_USER, payload: null })}
      >
        <ListItemIcon>
          <Logout fontSize='small' />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
