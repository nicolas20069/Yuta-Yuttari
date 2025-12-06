import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { registerUser } from "../services/authService";
import "../styles/auth.css";

const Register = () => {
  // Estados para los campos del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (!name || !email || !phone || !password) {
      setError("Todos los campos son obligatorios");
      setSuccess("");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setSuccess("");
      return;
    }

    try {
      // Llamada al servicio de registro
      const response = await registerUser({ name, email, phone, password });
      setSuccess(response.message);
      setError("");

      // Redirige al login después de 3 segundos
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrar. Intenta nuevamente.");
      setSuccess("");
    }
  };

  return (

    <div className="auth-container">
      <img src="/logo.png" alt="Yuta Yuttari" className="auth-logo" />
      <form className="auth-form" onSubmit={handleSubmit}>

        <InputField
          type="text"
          placeholder="👤 Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          type="email"
          placeholder="✉️ correo@prueba.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="tel"
          placeholder="📞 +57"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="🔐 Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button text="Registrarse" type="submit" />
        <Link to="/login" className="auth-link">
          Iniciar Sesión
        </Link>

        <div className="social-login">
          <h2 className="opciones"> Registrate con </h2>

          <button className="social-button apple">
            <span className="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16.365 1.43c0 1.14-.42 2.1-1.26 2.91-.84.81-1.785 1.23-2.85 1.17-.09-1.11.375-2.07 1.395-2.88.96-.78 2.04-1.17 3.12-1.2zM19.5 18.95c-.66 1.53-1.44 2.88-2.34 4.05-.63.81-1.29 1.53-2.01 2.16-.51.45-1.05.69-1.62.72-.42.03-.93-.12-1.53-.45-.6-.33-1.14-.51-1.62-.54-.48-.03-1.08.15-1.8.54-.72.39-1.26.6-1.62.63-.66.06-1.29-.21-1.89-.81-.63-.6-1.23-1.38-1.8-2.34-.81-1.35-1.44-2.91-1.89-4.68-.51-1.89-.75-3.66-.72-5.31.03-1.77.42-3.27 1.17-4.5.75-1.23 1.77-2.01 3.06-2.34.81-.21 1.77-.15 2.88.18.45.12 1.08.36 1.89.72.81.36 1.5.54 2.07.54.48 0 1.17-.18 2.07-.54.9-.36 1.62-.6 2.16-.72 1.65-.39 3.03-.12 4.05.81-1.59 1.02-2.37 2.46-2.34 4.32.03 1.44.54 2.64 1.53 3.6.45.42.96.75 1.53.99-.12.33-.27.66-.45.99z" />
              </svg>
            </span>
            <span className="social-text">Continue with Apple</span>
          </button>

          <button className="social-button google">
            <span className="social-icon">
              {/* Google SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285F4" d="M21.6 12.227c0-.818-.073-1.604-.21-2.364H12v4.472h5.4c-.234 1.26-.936 2.328-1.98 3.045v2.52h3.204c1.875-1.728 2.976-4.272 2.976-7.673z" />
                <path fill="#34A853" d="M12 22c2.7 0 4.968-.9 6.624-2.445l-3.204-2.52c-.9.6-2.055.945-3.42.945-2.625 0-4.848-1.77-5.64-4.155H3.036v2.61C4.68 19.905 8.1 22 12 22z" />
                <path fill="#FBBC05" d="M6.36 13.825c-.21-.6-.33-1.245-.33-1.9s.12-1.305.33-1.905V7.41H3.036A9.96 9.96 0 002 11.925c0 1.62.39 3.15 1.035 4.515l3.324-2.61z" />
                <path fill="#EA4335" d="M12 6.9c1.47 0 2.79.51 3.825 1.515l2.865-2.865C17.016 3.9 14.745 2.9 12 2.9c-3.9 0-7.32 2.1-8.964 5.1l3.324 2.61C7.152 8.67 9.375 6.9 12 6.9z" />
              </svg>
            </span>
            Continue with Google</button>
        </div>
      </form>

      {error && <p className="auth-error">{error}</p>}
      {success && <p className="auth-success">{success}</p>}
    </div>
  );
};

export default Register;