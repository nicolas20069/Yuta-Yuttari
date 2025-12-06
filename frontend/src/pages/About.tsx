import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AboutHeader from '../components/about/AboutHeader';
import AboutContent from '../components/about/AboutContent';

const About: React.FC = () => {
    return (
        <>
            <Navbar />
            <AboutHeader />
            <AboutContent />
            <Footer />
        </>
    );
};

export default About;
