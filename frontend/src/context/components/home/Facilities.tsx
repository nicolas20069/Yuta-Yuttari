import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import PoolIcon from '@mui/icons-material/Pool';
import WifiIcon from '@mui/icons-material/Wifi';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import LightbulbIcon from '@mui/icons-material/Lightbulb';


const facilities = [
    { icon: <PoolIcon fontSize="large" color="primary" />, name: 'Piscina Olímpica' },
    { icon: <WifiIcon fontSize="large" color="success" />, name: 'WIFI 5G' },
    { icon: <RestaurantIcon fontSize="large" color="error" />, name: 'Desayuno' },
    { icon: <FitnessCenterIcon fontSize="large" sx={{ color: 'black' }} />, name: 'Gym' },
    { icon: <SportsEsportsIcon fontSize="large" color="success" />, name: 'Centro de juegos' },
    { icon: <LightbulbIcon fontSize="large" sx={{ color: '#FFD700' }} />, name: '24/7 Light' },
    { icon: <LocalLaundryServiceIcon fontSize="large" sx={{ color: 'black' }} />, name: 'Lavandería' },
    { icon: <DirectionsCarIcon fontSize="large" sx={{ color: 'olive' }} />, name: 'Parqueadero' },
];

const Facilities: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
                Nuestras Instalaciones
            </Typography>
            <Typography variant="body1" align="center" color="textSecondary" sx={{ mb: 6 }}>
                Te ofrecemos servicios a la altura de 5 estrellas por el menor precio
            </Typography>

            <Grid container spacing={4}>
                {facilities.map((facility, index) => (
                    <Grid size={{ xs: 6, sm: 3 }} key={index}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 2,
                                bgcolor: '#f9f9f9',
                                '&:hover': { bgcolor: '#f0f0f0' }
                            }}
                        >
                            {facility.icon}
                            <Typography variant="subtitle1" fontWeight="bold">{facility.name}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Facilities;
