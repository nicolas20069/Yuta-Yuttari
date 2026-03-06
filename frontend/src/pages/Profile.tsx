import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HotelIcon from "@mui/icons-material/Hotel";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../styles/profile.css";
import api, { getApiBaseUrl } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user, refreshUser } = useAuth();

  useEffect(() => {
    const storedName = localStorage.getItem("userName") || user?.name || "Usuario";
    setUserName(storedName);

    // Asegurar que el token esté en los headers de axios
    const token = localStorage.getItem('auth_token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log('[Profile] Token loaded from localStorage and set in axios headers');
    } else {
      console.warn('[Profile] No token found in localStorage!');
    }
  }, [user?.name]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("userName");
    localStorage.removeItem("userAvatar");
    navigate("/login");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Límites
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      setError("❌ Por favor selecciona una imagen válida (JPG, PNG, GIF, WebP)");
      return;
    }

    // Validar MIME type
    if (!allowedMimes.includes(file.type)) {
      setError(`❌ Tipo de archivo no permitido: ${file.type}. Solo se aceptan: JPG, PNG, GIF, WebP`);
      return;
    }

    // Validar extensión
    const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      setError(`❌ Extensión no permitida: ${fileExt}. Solo se aceptan: ${allowedExtensions.join(', ')}`);
      return;
    }

    // Validar tamaño
    if (file.size > maxFileSize) {
      setError(`❌ Archivo demasiado grande. Tamaño máximo: 5MB. Tu archivo: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      // Debug: verificar token antes de subir
      console.log('[Profile] Token:', localStorage.getItem('auth_token')?.substring(0, 20) + '...' || 'NO TOKEN');
      console.log('[Profile] Authorization header:', api.defaults.headers.common['Authorization'] || 'NO HEADER');
      
      const response = await api.post("/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.url) {
        // Construir URL completa si es relativa
        const fullUrl = response.data.url.startsWith('http') 
          ? response.data.url 
          : getApiBaseUrl().replace('/api', '') + response.data.url;
        
        localStorage.setItem("userAvatar", fullUrl);
        setError("");
        setShowToast(true);
        
        // Refrescar el contexto para actualizar el avatar globalmente
        await refreshUser();
        
        setTimeout(() => setShowToast(false), 4000);
      }
    } catch (err: any) {
      console.error("Error al subir imagen:", err);
      const errorMessage = err.response?.data?.message || err.message || "Error al subir la imagen";
      setError(`❌ ${errorMessage}`);
    }
  };

  return (
    <div className="profile-container">
      <div className="main-content">
        <div className="profile-header">
          <label htmlFor="avatar-upload" className="profile-avatar-wrapper">
            <img
              src={user?.avatar || localStorage.getItem("userAvatar") || "/avatar.png"}
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