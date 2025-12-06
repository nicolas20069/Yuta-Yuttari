import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import SearchFilter from '../components/home/SearchFilter';
import Facilities from '../components/home/Facilities';
import FeaturedRooms from '../components/home/FeaturedRooms';
import Testimonials from '../components/home/Testimonials';

const Home: React.FC = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <SearchFilter />
            <Facilities />
            <FeaturedRooms />
            <Testimonials />
            <Footer />
        </>
    );
};

export default Home;
