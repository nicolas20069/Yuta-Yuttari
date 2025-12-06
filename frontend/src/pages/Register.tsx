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
      {/* Logo circular desde carpeta assets */}
      <img src="/logo.png" alt="Yuta Yuttari" className="auth-logo" />

      {/* Título principal */}
      <h1 className="auth-title">Yuta Yuttari</h1>

      <div className="form-wrapper">
        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Ícono de usuario */}
          <div className="auth-icon">👤</div>

          {/* Campos del formulario */}
          <InputField
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            type="email"
            placeholder="correo3@prueba.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="tel"
            placeholder="+234810013370"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Botón de registro */}
          <Button text="Registrarse" type="submit" />

          {/* Enlace para redirigir al login */}
          <Link to="/login" className="auth-link">
            Iniciar Sesión
          </Link>

          {/* Botones de redes sociales */}
          <div className="social-login">
            <button className="social-button apple">Continue with Apple</button>
            <button className="social-button google">Continue with Google</button>
          </div>
        </form>

        {/* Mensajes de error y éxito */}
        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}
      </div>
    </div>
  );
};

export default Register;