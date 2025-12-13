import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';
import { resetPassword } from '../services/authService';

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!token) {
      setError("Token de restablecimiento no encontrado.");
      return;
    }

    try {
      // ✅ CORREGIDO: token primero, password segundo
      const response = await resetPassword(token, password);
      setSuccess(response.message || 'Tu contraseña ha sido restablecida con éxito.');
      setError("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || "Error al restablecer la contraseña. El token puede ser inválido o haber expirado.";
      console.error("Error en reset password:", errorMsg);
      setError(errorMsg);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>

          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom color="primary">
            Crea una Nueva Contraseña
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            Introduce tu nueva contraseña a continuación.
          </Typography>

          <Box component="form" onSubmit={handleResetPassword} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Nueva Contraseña"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar Nueva Contraseña"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography color="success.main" variant="body2" sx={{ mt: 1 }}>
                {success}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2, bgcolor: '#002B5B', '&:hover': { bgcolor: '#001a38' } }}
            >
              Restablecer Contraseña
            </Button>

            <Box sx={{ mt: 2 }}>
              <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Volver a Iniciar Sesión
              </Link>
            </Box>

          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ResetPassword;