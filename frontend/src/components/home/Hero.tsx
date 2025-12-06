import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const Hero: React.FC = () => {
    return (
        <Box sx={{ py: 8 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} alignItems="center">
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            {/* Logo placeholder small if needed */}
                        </Box>
                        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                            Tuta Yuttari
                        </Typography>
                        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
                            El hotel donde el descanso es asegurado
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button variant="contained" color="success" size="large" sx={{ borderRadius: 5, px: 4 }}>
                                Reserva
                            </Button>

                            <Button
                                startIcon={<PlayCircleOutlineIcon sx={{ fontSize: 40 }} />}
                                color="inherit"
                                sx={{ textTransform: 'none' }}
                            >
                                Explora el hotel
                            </Button>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Box
                            component="img"
                            src="https://i.postimg.cc/bwwjSyqq/Gemini-Generated-Image-tdry1ttdry1ttdry.png"
                            alt="Hotel Facade"
                            sx={{
                                width: '100%',
                                height: 400,
                                objectFit: 'cover',
                                borderRadius: 2,
                                boxShadow: 3
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Hero;
