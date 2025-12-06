import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ExploreItem from '../components/explore/ExploreItem';
import { Box, Container, Typography } from '@mui/material';
import ImagePlaceholder from '../components/common/ImagePlaceholder';

const Explore: React.FC = () => {
    const exploreItems = [
        {
            title: "Habitaciones Lujosas",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
            imageText: "Luxury Bedroom View"
        },
        {
            title: "Gym",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
            imageText: "Gym with Mountain View"
        },
        {
            title: "Restaurante",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
            imageText: "Restaurant Table Setting"
        }
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}>

                {/* Hero / Header Image for Explore Page - "Reception" */}
                <Box sx={{ width: '100%', height: 400, mb: 6 }}>
                    <ImagePlaceholder height="100%" text="Hotel Reception / Lobby" borderRadius={0} />
                </Box>

                <Container maxWidth="lg" sx={{ mb: 8 }}>
                    <Typography
                        variant="h3"
                        align="center"
                        gutterBottom
                        sx={{ mb: 6, fontWeight: 'medium' }}
                    >
                        Toma el tour
                    </Typography>

                    {exploreItems.map((item, index) => (
                        <ExploreItem
                            key={index}
                            title={item.title}
                            description={item.description}
                            imageText={item.imageText}
                        />
                    ))}
                </Container>
            </Box>
            <Footer />
        </Box>
    );
};

export default Explore;
