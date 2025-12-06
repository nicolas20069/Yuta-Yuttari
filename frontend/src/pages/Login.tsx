import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { loginUser } from "../services/authService";
import "../styles/auth.css";

const Login = () => {
  const [email, setEmail] = useState("");       // Estado para el email
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [error, setError] = useState("");       // Estado para mensajes de error
  const [success, setSuccess] = useState("");   // Estado para mensaje de éxito
  const navigate = useNavigate();               // Hook para redirección

  // Función para manejar el envío del formulario de inicio de sesión
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (!email || !password) {
      setError("Completa todos los campos");
      setSuccess("");
      return;
    }

    try {
      const response = await loginUser(email, password);
      localStorage.setItem("authToken", response.token || ""); // Guarda el token en localStorage
      setSuccess(response.message); // ✅ Usa el mensaje del backend

      // Limpia el formulario 
      setEmail("");
      setPassword("");
      setError("");

      // Espera 2 segundos antes de redirigir
      setTimeout(() => {
        navigate("/dashboard"); // Cambia esto según tu ruta protegida
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Credenciales incorrectas o error de conexión");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">
        Yuta Yuttari
      </h1>

      <div className="form-wrapper">
        <form className="auth-form" onSubmit={handleLogin}>
          <InputField
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button text="Sign In" type="submit" />

          <p className="auth-redirect">
            ¿Don't have an account yet?
            <br />
            <Link className="redirect-link" to="/register">Create one here</Link>
          </p>
        </form>

        {/* Mensajes interactivos */}
        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}
      </div>
    </div>
  );
};

export default Login;