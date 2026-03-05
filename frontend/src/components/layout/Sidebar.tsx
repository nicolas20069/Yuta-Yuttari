import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../../context/AuthContext";
import "../../styles/dashboard.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className={`sidebar-wrapper ${isOpen ? "open" : ""}`}>
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
          <div className="sidebar-option" onClick={() => handleNavigation("/dashboard")}>
            <HomeIcon />
            <span>Inicio</span>
          </div>

          <div className="sidebar-option" onClick={() => handleNavigation("/reservas")}>
            <CalendarMonthIcon />
            <span>Mis Reservas</span>
          </div>

          <div className="sidebar-option" onClick={() => handleNavigation("/profile")}>
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
  );
};

export default Sidebar;
