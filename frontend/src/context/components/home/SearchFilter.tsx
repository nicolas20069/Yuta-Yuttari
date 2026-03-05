import React from 'react';
import { Box, Container, Paper, Grid, Typography, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import HotelIcon from '@mui/icons-material/Hotel';

const SearchFilter: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: -4, mb: 8, position: 'relative', zIndex: 2 }}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocationOnIcon color="action" />
                            <Box>
                                <Typography variant="caption" color="textSecondary">Location</Typography>
                                <Typography variant="body2" fontWeight="bold">Abuja</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <HotelIcon color="action" />
                            <Box>
                                <Typography variant="caption" color="textSecondary">Habitación</Typography>
                                <Typography variant="body2" fontWeight="bold">Suite</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PersonIcon color="action" />
                            <Box>
                                <Typography variant="caption" color="textSecondary">Personas</Typography>
                                <Typography variant="body2" fontWeight="bold">2+</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarTodayIcon color="action" />
                            <Box>
                                <Typography variant="caption" color="textSecondary">Check In</Typography>
                                <Typography variant="body2" fontWeight="bold">12 oct 2024</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarTodayIcon color="action" />
                            <Box>
                                <Typography variant="caption" color="textSecondary">Check Out</Typography>
                                <Typography variant="body2" fontWeight="bold">15 oct 2024</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Button variant="contained" color="success" fullWidth sx={{ height: '100%' }}>
                            Reserva
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default SearchFilter;
