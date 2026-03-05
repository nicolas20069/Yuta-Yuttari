import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import ImagePlaceholder from '../common/ImagePlaceholder';

const FeaturedRooms: React.FC = () => {
    const rooms = [
        { id: 1, name: 'Televisión, toallas y desayuno', label: 'Disponible' },
        { id: 2, name: 'Televisión, vista a la ciudad, baño privado', label: 'Disponible' },
        { id: 3, name: 'Televisión, toallas, comidas, refrigerador, jacuzzi, servicio al cuarto', label: '¡Solo por hoy!' },
    ];

    return (
        <Box sx={{ py: 8, bgcolor: '#f5f5f5', backgroundImage: 'url("path/to/dark-pattern-bg")', backgroundSize: 'cover' }}>
            <Box sx={{
                py: 8,
                px: 2,
                background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))',
                color: 'white',
                textAlign: 'center'
            }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Habitaciones Lujosas
                </Typography>
                <Typography variant="body1">
                    Todo el confort, en una habitación.
                </Typography>
            </Box>

            <Container maxWidth="lg" sx={{ mt: -5 }}>
                <Grid container spacing={4}>
                    {rooms.map((room) => (
                        <Grid size={{ xs: 12, md: 4 }} key={room.id}>
                            <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                <Box sx={{ position: 'relative' }}>
                                    <ImagePlaceholder height={250} text="Room Image" />
                                    <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        sx={{ position: 'absolute', top: 16, right: 16, textTransform: 'none' }}
                                    >
                                        {room.label}
                                    </Button>
                                </Box>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary">
                                        {room.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default FeaturedRooms;
