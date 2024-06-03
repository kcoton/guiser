import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Connect from './Connect';
import Profiles from './Profiles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SwitchAccountRoundedIcon from '@mui/icons-material/SwitchAccountRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function NavigationBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const iconMap = {
    'Home': <HomeRoundedIcon />,
    'Profiles': <SwitchAccountRoundedIcon />,
    'Connect': <ShareRoundedIcon />,
    'Generate': <AddBoxRoundedIcon />,
    'Drafts': <EditNoteRoundedIcon />,
    'Settings': <SettingsApplicationsRoundedIcon />,
    'Logout': <LogoutRoundedIcon />,
  }

  const routesMap = {
    'Home': '/',
    'Profiles': '/profiles',
    'Connect': '/connect',
    'Generate': '/generate',
    'Drafts': '/drafts',
    'Settings': '/settings',
    'Logout': '/logout',
  }
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Guiser
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
        {['Home', 'Profiles', 'Connect', 'Generate'].map((text) => (
            <ListItem key={text} disablePadding>
                <Link to={routesMap[text]}>
                    <ListItemButton>
                        <ListItemIcon>
                          {iconMap[text]}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </Link>
            </ListItem>
        ))}
        </List>
        <Divider />
        <List>
        {['Drafts', 'Settings', 'Logout'].map((text) => (
            <ListItem key={text} disablePadding>
                <Link to={routesMap[text]}>
                    <ListItemButton>
                        <ListItemIcon>
                          {iconMap[text]}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </Link>
            </ListItem>
        ))}
        </List>

      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/connect" element={<Connect />} />
        </Routes>
      </Main>
    </Box>
  );
}

export default NavigationBar;