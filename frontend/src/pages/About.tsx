import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AboutContent from '../components/about/AboutContent';
import PageHeader from '../components/common/PageHeader';
import { Box } from '@mui/material';

const About: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
                <PageHeader
                    title="Nosotros"
                    subtitle="El mejor servicio a tu alcance. Conoce nuestra historia."
                    imageText="Edificio del Hotel"
                />
                <AboutContent />
            </Box>
            <Footer />
        </Box>
    );
};

export default About;
