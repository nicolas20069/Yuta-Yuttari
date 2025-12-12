import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useAuth } from "../context/AuthContext";
import { Box, CircularProgress } from "@mui/material";
import Hero from "../components/home/Hero";
import SearchFilter from "../components/home/SearchFilter";
import Facilities from "../components/home/Facilities";
import FeaturedRooms from "../components/home/FeaturedRooms";
import Testimonials from "../components/home/Testimonials";
import Footer from "../components/layout/Footer";
import "../styles/dashboard.css";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout, loading } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <CircularProgress />
        </Box>
      );
    }

    return (
        <div className="dashboard-container">
            {/* Toggle button */}
            <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
            </button>

            {/* Sidebar */}
            <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
                <div className="sidebar">
                    <div className="sidebar-header">
                        <div className="sidebar-user-info">
                            <AccountCircleIcon sx={{ fontSize: 40, color: 'white' }} />
                            <div>
                                <h3>{user?.name || 'Usuario'}</h3>
                                <p>{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="sidebar-menu">
                        <div className="sidebar-option" onClick={() => { navigate("/"); setIsSidebarOpen(false); }}>
                            <HomeIcon />
                            <span>Inicio</span>
                        </div>

                        <div className="sidebar-option" onClick={() => { navigate("/profile"); setIsSidebarOpen(false); }}>
                            <AccountCircleIcon />
                            <span>Mi Perfil</span>
                        </div>

                        <div className="sidebar-option" onClick={handleLogout}>
                            <LogoutIcon />
                            <span>Cerrar Sesión</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content - Landing page content */}
            <div className="main-content" style={{ width: '100%', padding: 0, marginLeft: 0 }}>
                <Hero />
                <SearchFilter />
                <Facilities />
                <FeaturedRooms />
                <Testimonials />
                <Footer />
            </div>
        </div>
    );
};

export default Dashboard;
