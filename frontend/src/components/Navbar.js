import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Chip,
  Container,
} from '@mui/material';
import {
  Menu as MenuIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', path: '/', icon: <DashboardIcon /> },
    { text: 'Courses', path: '/courses', icon: <SchoolIcon /> },
    { text: 'Students', path: '/students', icon: <PeopleIcon /> },
    { text: 'Enrollments', path: '/enrollments', icon: <AssignmentIcon /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ pt: 2 }}>
      <Typography 
        variant="h6" 
        sx={{ 
          px: 3, 
          py: 2, 
          fontWeight: 700,
          background: 'linear-gradient(45deg, #fff, #f0f0f0)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        🎓 Course Management
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            selected={location.pathname === item.path}
            onClick={() => setMobileOpen(false)}
            sx={{
              mx: 2,
              mb: 1,
              borderRadius: 2,
              backgroundColor: location.pathname === item.path 
                ? 'rgba(255, 255, 255, 0.2)' 
                : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&.Mui-selected': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{ 
                '& .MuiListItemText-primary': {
                  fontWeight: location.pathname === item.path ? 600 : 500,
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 0 } }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                flexGrow: 1,
                fontWeight: 700,
                background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              🎓 University Course Management
            </Typography>
            
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    color="inherit"
                    component={RouterLink}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      backgroundColor: location.pathname === item.path 
                        ? 'rgba(255, 255, 255, 0.2)' 
                        : 'transparent',
                      backdropFilter: location.pathname === item.path 
                        ? 'blur(10px)' 
                        : 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {isMobile && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 280,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
