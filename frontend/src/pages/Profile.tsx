/* Modulo para el perfil de usuario */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import "../styles/profile.css";


const Profile = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <div className="profile-container">

            <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
            </button>

            <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
                <div className="sidebar">

                    <div className="sidebar-option" onClick={() => navigate("/dashboard")}>
                        <DashboardIcon />
                        <span>Dashboard</span>
                    </div>

                    <div className="sidebar-option" onClick={handleLogout}>
                        <LogoutIcon />
                        <span>Salir</span>
                    </div>
                </div>
            </div>

            <div className="main-content" >
                <h2 className="title-dashboard">Bienvenido a tu perfil</h2>

                <h3 className="datos-personales"> </h3>
            </div >



        </div>

    );




}
export default Profile;