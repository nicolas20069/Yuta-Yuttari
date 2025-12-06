import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/common/PageHeader';
import RoomCard from '../components/rooms/RoomCard';
import { Box, Container, Grid } from '@mui/material';

const roomsData = [
    { id: 1, title: 'Suite', price: '$ 1.200.000', imageText: 'Suite View' },
    { id: 2, title: 'Matrimonial', price: '$ 800.000', imageText: 'Matrimonial Bed' },
    { id: 3, title: 'Confort', price: '$ 600.000', imageText: 'Confort Room' },
    { id: 4, title: 'Individual', price: '$ 450.000', imageText: 'Single Room' },
    { id: 5, title: 'Minimalista', price: '$ 560.000', imageText: 'Minimalist Style' },
];

const Rooms: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
                <PageHeader
                    title="Habitaciones y Suite"
                    subtitle="Todo el confort que mereces"
                    imageText="Luxury Room Banner"
                />

                <Container maxWidth="lg" sx={{ mb: 8 }}>
                    <Grid container spacing={4}>
                        {roomsData.map((room) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={room.id}>
                                <RoomCard
                                    title={room.title}
                                    price={room.price}
                                    imageText={room.imageText}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
            <Footer />
        </Box>
    );
};

export default Rooms;
