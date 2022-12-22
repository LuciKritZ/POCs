import React, { useState } from 'react';
import { Box, Badge, IconButton, Tooltip, Avatar } from '@mui/material';
import { Mail, Notifications } from '@mui/icons-material';
import { useValue } from '../../context/provider';
import UserMenu from './user-menu.component';
import useCheckToken from '../../hooks/check-token.hook';

const UserIcons = () => {
  useCheckToken();
  const {
    state: { currentUser },
  } = useValue();
  const [anchorUserMenu, setAnchorUserMenu] = useState(null);
  return (
    <Box>
      <IconButton size='large' color='inherit'>
        <Badge color='error' badgeContent={5}>
          <Mail />
        </Badge>
      </IconButton>
      <IconButton size='large' color='inherit'>
        <Badge color='error' badgeContent={20}>
          <Notifications />
        </Badge>
      </IconButton>
      <Tooltip title='Settings'>
        <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
          <Avatar src={currentUser?.photo} alt={currentUser?.name}>
            {currentUser?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <UserMenu
        anchorUserMenu={anchorUserMenu}
        setAnchorUserMenu={setAnchorUserMenu}
      />
    </Box>
  );
};

export default UserIcons;
