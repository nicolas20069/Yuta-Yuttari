import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactHeader from '../components/contact/ContactHeader';
import ContactForm from '../components/contact/ContactForm';
import ContactMap from '../components/contact/ContactMap';
import { Box } from '@mui/material';

const Contact: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
                <ContactHeader />
                <ContactForm />
                <ContactMap />
            </Box>
            <Footer />
        </Box>
    );
};

export default Contact;
