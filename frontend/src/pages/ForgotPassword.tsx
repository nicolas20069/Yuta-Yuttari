import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';
import { forgotPassword } from '../services/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Por favor, introduce tu correo electrónico.");
      setSuccess("");
      return;
    }

    try {
      const response = await forgotPassword(email);
      setSuccess(response.message || 'Si el correo electrónico está registrado, recibirás un enlace para restablecer tu contraseña.');
      setError("");
      setEmail("");
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || "Error al intentar restablecer la contraseña.";
      console.error("Error en forgot password:", errorMsg);
      setError(errorMsg);
      setSuccess("");
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
            Restablecer Contraseña
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            Introduce tu correo electrónico para recibir un enlace de restablecimiento.
          </Typography>

          <Box component="form" onSubmit={handleForgotPassword} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Enviar Enlace
            </Button>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="textSecondary">
                ¿Recuerdas tu contraseña?{' '}
                <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>
                  Inicia Sesión
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
