import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', color: '#333' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={() => navigate('/')}>
            Logo
          </Button>
        </Box>
        <Button color="inherit" onClick={() => navigate('/')}>
          Inicio
        </Button>
        <Button color="inherit" onClick={() => navigate('/rooms')}>
          Habitaciones
        </Button>
        <Button color="inherit" onClick={() => navigate('/about')}>
          Nosotros
        </Button>
        <Button color="inherit" onClick={() => navigate('/contact')}>
          Contacto
        </Button>
        {user ? (
          <>
            <Avatar
              sx={{ marginLeft: '10px', cursor: 'pointer' }}
              onClick={handleMenuOpen}
            >
              {user.email?.charAt(0).toUpperCase()}
            </Avatar>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => navigate('/profile')}>Perfil</MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Iniciar sesión
            </Button>
            <Button
              variant="contained"
              sx={{ marginLeft: '10px' }}
              onClick={() => navigate('/register')}
            >
              Registrarse
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
