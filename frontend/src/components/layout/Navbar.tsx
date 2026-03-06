import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem, Avatar, useMediaQuery, useTheme, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    console.log('[Navbar] User updated:', user?.email, 'Avatar:', user?.avatar);
  }, [user?.avatar, user?.id]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', color: '#333', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Toolbar sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: { xs: '8px 12px', sm: '8px 16px' },
        minHeight: { xs: '60px', sm: '70px' }
      }}>
        {/* Logo - Always left */}
        <Box
          component="img"
          src="/logo.png"
          alt="Yuta Yuttari Logo"
          onClick={() => navigate('/')}
          sx={{ 
            width: { xs: 50, sm: 60 }, 
            height: { xs: 50, sm: 60 }, 
            borderRadius: '50%', 
            objectFit: 'cover',
            cursor: 'pointer',
            flexShrink: 0
          }}
        />

        {/* Desktop Navigation - Visible on md and up */}
        {!isSmallScreen && (
          <Box sx={{ 
            display: 'flex', 
            gap: 0.5,
            alignItems: 'center'
          }}>
            <Button 
              color="inherit" 
              onClick={() => navigate('/')}
              sx={{ 
                padding: '8px 12px', 
                fontSize: '0.875rem',
                minWidth: 'unset'
              }}
            >
              Inicio
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/rooms')}
              sx={{ 
                padding: '8px 12px', 
                fontSize: '0.875rem',
                minWidth: 'unset'
              }}
            >
              Habitaciones
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/about')}
              sx={{ 
                padding: '8px 12px', 
                fontSize: '0.875rem',
                minWidth: 'unset'
              }}
            >
              Nosotros
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/contact')}
              sx={{ 
                padding: '8px 12px', 
                fontSize: '0.875rem',
                minWidth: 'unset'
              }}
            >
              Contacto
            </Button>
            
            {user ? (
              <>
                <Avatar
                  src={user.avatar || localStorage.getItem('userAvatar') || undefined}
                  alt={user.name || user.email}
                  sx={{ 
                    marginLeft: '8px',
                    cursor: 'pointer', 
                    backgroundColor: '#1976d2',
                    width: 40,
                    height: 40,
                    fontSize: '0.9rem',
                    img: {
                      objectFit: 'cover'
                    }
                  }}
                  onClick={handleMenuOpen}
                >
                  {!user.avatar && !localStorage.getItem('userAvatar') ? user.email?.charAt(0).toUpperCase() : null}
                </Avatar>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>Perfil</MenuItem>
                  <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/login')}
                  sx={{ 
                    padding: '8px 12px', 
                    fontSize: '0.875rem',
                    minWidth: 'unset'
                  }}
                >
                  Iniciar sesión
                </Button>
                <Button
                  variant="contained"
                  sx={{ 
                    backgroundColor: '#1976d2',
                    padding: '8px 16px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    textTransform: 'none',
                    minWidth: 'unset',
                    '&:hover': {
                      backgroundColor: '#1565c0'
                    }
                  }}
                  onClick={() => navigate('/register')}
                >
                  Registrarse
                </Button>
              </>
            )}
          </Box>
        )}

        {/* Mobile Hamburger Menu - Visible on xs and sm */}
        {isSmallScreen && (
          <>
            <IconButton
              color="inherit"
              onClick={handleMobileMenuOpen}
              sx={{ padding: '6px' }}
            >
              <MenuIcon sx={{ fontSize: '1.5rem' }} />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMobileMenuClose}
            >
              <MenuItem onClick={() => { navigate('/'); handleMobileMenuClose(); }}>Inicio</MenuItem>
              <MenuItem onClick={() => { navigate('/rooms'); handleMobileMenuClose(); }}>Habitaciones</MenuItem>
              <MenuItem onClick={() => { navigate('/about'); handleMobileMenuClose(); }}>Nosotros</MenuItem>
              <MenuItem onClick={() => { navigate('/contact'); handleMobileMenuClose(); }}>Contacto</MenuItem>
              <MenuItem divider />
              {user ? (
                <>
                  <MenuItem onClick={() => { navigate('/profile'); handleMobileMenuClose(); }}>Perfil</MenuItem>
                  <MenuItem onClick={() => { handleLogout(); handleMobileMenuClose(); }}>Cerrar sesión</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => { navigate('/login'); handleMobileMenuClose(); }}>Iniciar sesión</MenuItem>
                  <MenuItem onClick={() => { navigate('/register'); handleMobileMenuClose(); }}>Registrarse</MenuItem>
                </>
              )}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
