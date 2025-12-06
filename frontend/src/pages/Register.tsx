import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { registerUser } from "../services/authService";
import "../styles/auth.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (!email || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios");
      setSuccess("");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setSuccess("");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setSuccess("");
      return;
    }

    try {
      const response = await registerUser(email, password);
      setSuccess(response.message); // ✅ Usa el mensaje del backend
      setError("");

      // Esperar 3 segundos antes de redirigir
      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrar. Intenta nuevamente.");
      setSuccess("");
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">
        Yuta Yuttari
      </h1>

      <div className="form-wrapper">
        <form className="auth-form" onSubmit={handleSubmit}>
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button text="Register" type="submit" />

          <p className="auth-redirect">
            ¿Do you already have an account?
            <br />
            <Link className="redirect-link" to="/login">Sign in here</Link>
          </p>
        </form>

        {/* Mensajes interactivos */}
        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}
      </div>
    </div>
  );
};

export default Register;