import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, Typography, Box, ListItemIcon } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListIcon from '@mui/icons-material/List';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const location = useLocation();
  
  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <DrawerContent activeRoute={location.pathname} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        <DrawerContent activeRoute={location.pathname} />
      </Drawer>
    </Box>
  );
};

const DrawerContent = ({ activeRoute }) => {
  const handleClick = (route, event) => {
    if (event.type === 'click') {
      console.log(`Left click on ${route}`);
      // Handle left click action
    } else if (event.type === 'contextmenu') {
      event.preventDefault();
      console.log(`Right click on ${route}`);
      // Handle right click action
    }
  };

  return (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Dashboard
        </Typography>
      </Toolbar>
      <List>
        <ListItem
          button
          component={Link}
          to="/dashboard"
          onClick={(event) => handleClick('/dashboard', event)}
          onContextMenu={(event) => handleClick('/dashboard', event)}
          sx={{
            backgroundColor: activeRoute === '/dashboard' ? 'primary.main' : 'transparent',
            color: activeRoute === '/dashboard' ? 'white' : 'inherit',
          }}
        >
          <ListItemIcon>
            <DashboardIcon style={{ color: activeRoute === '/dashboard' ? 'white' : 'inherit' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/list"
          onClick={(event) => handleClick('/list', event)}
          onContextMenu={(event) => handleClick('/list', event)}
          sx={{
            backgroundColor: activeRoute === '/list' ? 'primary.main' : 'transparent',
            color: activeRoute === '/list' ? 'white' : 'inherit',
          }}
        >
          <ListItemIcon>
            <ListIcon style={{ color: activeRoute === '/list' ? 'white' : 'inherit' }} />
          </ListItemIcon>
          <ListItemText primary="List" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
