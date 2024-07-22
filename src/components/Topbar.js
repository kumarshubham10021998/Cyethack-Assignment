import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Avatar, Select, FormControl } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { logout } from '../utils/auth'; // Import the logout function

const drawerWidth = 240;

const Topbar = ({ handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mode, setMode] = useState('light');
  const [scanner, setScanner] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModeChange = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const handleScannerChange = (event) => {
    setScanner(event.target.value);
  };

  const handleLogout = () => {
    logout(); // Clear authentication data
    setAnchorEl(null); // Close the menu
    navigate('/login'); // Redirect to login page
  };

  return (
    <AppBar
      position="fixed"
      sx={{ 
        width: { sm: `calc(100% - ${drawerWidth}px)` }, 
        ml: { sm: `${drawerWidth}px` },
        bgcolor: mode === 'light' ? 'primary.main' : 'grey.900'
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          CyeNET
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={scanner}
            onChange={handleScannerChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Scanner' }}
            sx={{ color: 'inherit', '.MuiSvgIcon-root': { color: 'inherit' } }}
          >
            <MenuItem value="">
              <em>Scanner</em>
            </MenuItem>
            <MenuItem value={10}>Scanner 1</MenuItem>
            <MenuItem value={20}>Scanner 2</MenuItem>
            <MenuItem value={30}>Scanner 3</MenuItem>
          </Select>
        </FormControl>
        <IconButton color="inherit" onClick={handleModeChange}>
          {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleMenu}>
          <Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem> {/* Add Logout Menu Item */}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
