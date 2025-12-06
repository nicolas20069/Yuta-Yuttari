import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { loginUser } from "../services/authService";
import "../styles/auth.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Completa todos los campos");
      setSuccess("");
      return;
    }

    try {
      const response = await loginUser(email, password);
      localStorage.setItem("authToken", response.token || "");
      setSuccess(response.message);
      setEmail("");
      setPassword("");
      setError("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Credenciales incorrectas o error de conexión");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="auth-container">
      {/* Logo circular */}
      <img src="/logo.png" alt="Yuta Yuttari" className="auth-logo" />

      <h1 className="auth-title">Yuta Yuttari</h1>

      <div className="form-wrapper">
        <form className="auth-form" onSubmit={handleLogin}>
          {/* Ícono de usuario */}
          <div className="auth-icon">👤</div>

          <InputField
            type="email"
            placeholder="correo3@prueba.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Enlace de recuperación */}
          <Link to="/forgot-password" className="auth-link red-link">
            Olvidé mi contraseña
          </Link>

          <Button text="Iniciar Sesión" type="submit" />

          <Link to="/register" className="auth-link">
            Registrarse
          </Link>

          {/* Social login */}
          <div className="social-login">
            <button className="social-button apple">Continue with Apple</button>
            <button className="social-button google">Continue with Google</button>
          </div>
        </form>

        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}
      </div>
    </div>
  );
};

export default Login;