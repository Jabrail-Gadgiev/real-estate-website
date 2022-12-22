import { MenuItem, Menu } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CottageIcon from '@mui/icons-material/Cottage';
import {Link as ReactLink} from 'react-router-dom';
import NavBtn from './NavBtn';
import { UserContext } from './UserContext';
import { useContext, useState } from 'react';
import {Tooltip, IconButton, Avatar} from '@mui/material';

function logoHover(e) {
  e.target.style.color = "#594545"
}

export default function NavBar() {
  const {loggedIn, logoutUser} = useContext(UserContext);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function showAvatar() {
    if (loggedIn) {
      return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem>
            <Typography textAlign="center">Dashboard</Typography>
          </MenuItem>
          <MenuItem component={ReactLink} to={"/settings"}>
            <Typography textAlign="center">Settings</Typography>
          </MenuItem>
          <MenuItem onClick={logoutUser}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    )
    } else {
      return <NavBtn/>
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <CottageIcon
          fontSize='large' 
          sx={{color: '#594545', mr:2}}/>
          <Typography component={ReactLink} onMouseOver={logoHover} to={'/'} variant="h6" color="#594545" sx={{ flexGrow: 1, textDecoration: 'none', fontWeight: '600'}}>
            PLACEHOLDER
          </Typography>
          {showAvatar()}
        </Toolbar>
      </AppBar>
    </Box>
  );
};