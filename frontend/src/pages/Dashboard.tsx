import { useAuth } from "../context/AuthContext";
import { Box, CircularProgress } from "@mui/material";
import DashboardLayout from "../components/layout/DashboardLayout";
import Hero from "../components/home/Hero";
import SearchFilter from "../components/home/SearchFilter";
import Facilities from "../components/home/Facilities";
import FeaturedRooms from "../components/home/FeaturedRooms";
import Testimonials from "../components/home/Testimonials";
import Footer from "../components/layout/Footer";
import "../styles/dashboard.css";

const Dashboard = () => {
    const { loading } = useAuth();
    // Removed useNavigate and logout as they are handled in Sidebar/Layout or not needed here directly
    // state for sidebar is now in DashboardLayout

    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <CircularProgress />
        </Box>
      );
    }

    return (
        <DashboardLayout>
            <Hero />
            <SearchFilter />
            <Facilities />
            <FeaturedRooms />
            <Testimonials />
            <Footer />
        </DashboardLayout>
    );
};

export default Dashboard;
