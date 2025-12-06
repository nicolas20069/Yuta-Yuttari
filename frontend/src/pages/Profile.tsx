import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HotelIcon from "@mui/icons-material/Hotel";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../styles/profile.css";
import axios from "axios";

const Profile = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);

    const storedAvatar = localStorage.getItem("userAvatar");
    if (storedAvatar) setAvatar(storedAvatar);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userAvatar");
    navigate("/login");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post("http://localhost:3000/api/user/avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setAvatar(response.data.url);
      localStorage.setItem("userAvatar", response.data.url);
      setError("");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    } catch (err) {
      console.error("Error al subir imagen:", err);
      setError("Error al subir la imagen");
    }
  };

  return (
    <div className="profile-container">
      <div className="main-content">
        <div className="profile-header">
          <label htmlFor="avatar-upload" className="profile-avatar-wrapper">
            <img
              src={avatar || "/avatar.png"}
              alt="Perfil"
              className="profile-avatar"
            />
            <input
              type="file"
              id="avatar-upload"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </label>
          <h2 className="profile-name">{userName || "Usuario"}</h2>
        </div>

        <div className="profile-options">
          <button className="profile-option" onClick={() => navigate("/account")}>
            <AccountCircleIcon />
            <div>
              <strong>Account</strong>
              <p>Gestiona tu cuenta</p>
            </div>
          </button>

          <button className="profile-option" onClick={() => navigate("/security")}>
            <DashboardIcon />
            <div>
              <strong>Seguridad</strong>
              <p>Autenticación de factores</p>
            </div>
          </button>

          <button className="profile-option" onClick={() => navigate("/preferences")}>
            <DashboardIcon />
            <div>
              <strong>Preferencias</strong>
              <p>Modo oscuro</p>
            </div>
          </button>

          <button className="profile-option" onClick={() => navigate("/bookings")}>
            <DashboardIcon />
            <div>
              <strong>Bookings</strong>
              <p>Gestiona tus reservas</p>
            </div>
          </button>

          <button className="profile-option" onClick={() => navigate("/settings")}>
            <DashboardIcon />
            <div>
              <strong>Settings</strong>
              <p>Configura tus notificaciones</p>
            </div>
          </button>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          <LogoutIcon />
          <span>Salir</span>
        </button>

        {error && <p className="auth-error">{error}</p>}
      </div>

      {showToast && (
        <div className="toast-success">
          Imagen actualizada exitosamente ✅
        </div>
      )}

      <div className="bottom-nav">
        <button
          onClick={() => navigate("/dashboard")}
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          <HomeIcon />
          <span>Inicio</span>
        </button>
        <button
          onClick={() => navigate("/bookings")}
          className={location.pathname === "/bookings" ? "active" : ""}
        >
          <DashboardIcon />
          <span>Booking</span>
        </button>
        <button
          onClick={() => navigate("/rooms")}
          className={location.pathname === "/rooms" ? "active" : ""}
        >
          <HotelIcon />
          <span>Rooms</span>
        </button>
        <button
          onClick={() => navigate("/account")}
          className={location.pathname === "/account" ? "active" : ""}
        >
          <AccountCircleIcon />
          <span>Account</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;