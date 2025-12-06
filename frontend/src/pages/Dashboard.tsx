import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import "../styles/dashboard.css";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            {/* Toggle button */}
            <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
            </button>

            {/* Sidebar */}
            <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
                <div className="sidebar">

                    <div className="sidebar-option" onClick={() => navigate("/profile")}>
                        <AccountCircleIcon />
                        <span>Perfil</span>
                    </div>

                    <div className="sidebar-option" onClick={handleLogout}>
                        <LogoutIcon />
                        <span>Salir</span>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="main-content">
                <h2 className="title-dashboard">Bienvenido al Inicio</h2>
                {/* Aquí va tu contenido */}
            </div>
        </div>
    );
};

export default Dashboard;