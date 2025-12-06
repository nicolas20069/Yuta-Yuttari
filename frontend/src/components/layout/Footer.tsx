import React from 'react';
import { Box, Container, Grid, Typography, Link, TextField, Button } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 6,
                px: 2,
                mt: 'auto',
                backgroundColor: '#002B5B',
                color: 'white'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <Typography variant="h6" color="inherit" gutterBottom>
                            Tuta Yuttari
                        </Typography>
                        <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                            El servicio del Hotel Tuta Yuttari fue excepcional. No hubo problemas, no hubo problemas.
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 2 }}>
                        <Typography variant="h6" color="inherit" gutterBottom>
                            Links
                        </Typography>
                        <Link href="#" color="inherit" display="block" underline="hover" sx={{ mb: 1 }}>Reservar Habitación</Link>
                        <Link href="#" color="inherit" display="block" underline="hover" sx={{ mb: 1 }}>Habitaciones</Link>
                        <Link href="#" color="inherit" display="block" underline="hover" sx={{ mb: 1 }}>Contacto</Link>
                        <Link href="#" color="inherit" display="block" underline="hover" sx={{ mb: 1 }}>Explorar</Link>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 2 }}>
                        <Typography variant="h6" color="inherit" gutterBottom>
                            Compañía
                        </Typography>
                        <Link href="#" color="inherit" display="block" underline="hover" sx={{ mb: 1 }}>Política de privacidad</Link>
                        <Link href="#" color="inherit" display="block" underline="hover" sx={{ mb: 1 }}>Política de reembolso</Link>
                        <Link href="#" color="inherit" display="block" underline="hover" sx={{ mb: 1 }}>F.A.Q</Link>
                        <Link href="#" color="inherit" display="block" underline="hover" sx={{ mb: 1 }}>Nosotros</Link>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 2 }}>
                        <Typography variant="h6" color="inherit" gutterBottom>
                            Redes Sociales
                        </Typography>
                        <Link href="#" color="inherit" display="block" underline="hover" sx={{ mb: 1 }}>Facebook</Link>
                        <Link href="#" color="inherit" display="block" underline="hover" sx={{ mb: 1 }}>X</Link>
                        <Link href="#" color="inherit" display="block" underline="hover" sx={{ mb: 1 }}>Instagram</Link>
                        <Link href="#" color="inherit" display="block" underline="hover" sx={{ mb: 1 }}>LinkedIn</Link>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 3 }}>
                        <Typography variant="h6" color="inherit" gutterBottom>
                            Newsletter
                        </Typography>
                        <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" sx={{ mb: 2 }}>
                            Suscríbete al newsletter para conocer sobre promociones, novedades y mucho más!
                        </Typography>
                        <Box component="form" sx={{ display: 'flex', bgcolor: 'white', borderRadius: 1, p: 0.5 }}>
                            <TextField
                                variant="standard"
                                placeholder="Ingresa tu correo"
                                InputProps={{ disableUnderline: true, sx: { pl: 1 } }}
                                fullWidth
                            />
                            <Button variant="contained" color="success" size="small" sx={{ borderRadius: 1 }}>
                                Suscribirse
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={5}>
                    <Typography variant="body2" color="rgba(255, 255, 255, 0.5)" align="center">
                        {'Tuta Yuttari © '} {new Date().getFullYear()}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
