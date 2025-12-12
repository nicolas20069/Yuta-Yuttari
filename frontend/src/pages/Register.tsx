import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Paper, Divider, Stack } from '@mui/material';
import { registerUser } from '../services/authService';
import { getApiBaseUrl } from '../services/api';
import googleIcon from '../assets/icons_google.svg';
import appleIcon from '../assets/icons_apple.svg';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
        const response = await registerUser({ name, email, phone, password });
        setSuccess('Registro exitoso. Redirigiendo a verificación...');
        setError("");
        // Redirect to verification pending page after 1 second
        setTimeout(() => {
          navigate('/verification-pending', { state: { email } });
        }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrar. Intenta nuevamente.");
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

          {/* Logo */}
          <Box
            component="img"
            src="/logo.png"
            alt="Yuta Yuttari Logo"
            sx={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', mb: 3 }}
          />

          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom color="primary">
            Crear Cuenta
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            Únete a Yuta Yuttari
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre Completo"
              name="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Teléfono"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              helperText="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              sx={{ mt: 4, mb: 2, bgcolor: '#002B5B', '&:hover': { bgcolor: '#001a38' } }}
            >
              Registrarse
            </Button>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="textSecondary">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>
                  Inicia Sesión
                </Link>
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="textSecondary">
                O regístrate con
              </Typography>
            </Divider>

            <Stack spacing={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Box component="img" src={googleIcon} alt="Google" sx={{ width: 20, height: 20 }} />}
                sx={{ color: 'text.primary', borderColor: '#ddd', textTransform: 'none' }}
              >
                Registrarse con Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Box component="img" src={appleIcon} alt="Apple" sx={{ width: 20, height: 20 }} />}
                sx={{ color: 'text.primary', borderColor: '#ddd', textTransform: 'none' }}
              >
                Registrarse con Apple
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;