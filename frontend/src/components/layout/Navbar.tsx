import React from 'react';
import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth(); // Get auth state

    const handleReservaClick = () => {
        if (!isAuthenticated) {
            navigate('/reservas');
        } else {
            navigate('/login');
        }
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#002B5B' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo Placeholder */}
                    {/* Logo Image */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        <Box
                            component="img"
                            src="https://i.postimg.cc/wTVpBy8f/Gemini-Generated-Image-5hrhni5hrhni5hrh.png"
                            alt="Tuta Yuttari Logo"
                            sx={{
                                width: 60,
                                height: 60,
                                borderRadius: 1,
                                objectFit: 'cover'
                            }}
                        />
                    </Box>

                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 3 }}>
                        <Button
                            component={Link}
                            to="/"
                            sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none' }}
                        >
                            Inicio
                        </Button>
                        <Button
                            component={Link}
                            to="/explore"
                            sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none' }}
                        >
                            Explorar
                        </Button>
                        <Button
                            component={Link}
                            to="/rooms"
                            sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none' }}
                        >
                            Habitaciones
                        </Button>
                        <Button
                            component={Link}
                            to="/about"
                            sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none' }}
                        >
                            Nosotros
                        </Button>
                        <Button
                            component={Link}
                            to="/contact"
                            sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none' }}
                        >
                            Contacto
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{
                                bgcolor: '#4CAF50',
                                '&:hover': { bgcolor: '#45a049' },
                                textTransform: 'none',
                                fontWeight: 'bold'
                            }}
                            onClick={handleReservaClick}
                        >
                            Reserva Ya!
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
