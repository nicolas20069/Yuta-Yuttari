import React, { useState } from 'react';
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from './Sidebar';
import "../../styles/dashboard.css";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dashboard-container">
      {/* Toggle button */}
      <button 
        className="menu-toggle" 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Menu"
      >
        {isSidebarOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main content */}
      <div className="main-content" style={{ width: '100%', padding: 0, marginLeft: 0 }}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
