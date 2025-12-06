import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Paper, Divider, Stack } from '@mui/material';
import { loginUser } from '../services/authService';
import googleIcon from '../assets/icons_google.svg';
import appleIcon from '../assets/icons_apple.svg';

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
            sx={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover', mb: 3 }}
          />

          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom color="primary">
            Bienvenido
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            Inicia sesión para continuar
          </Typography>

          <Box component="form" onSubmit={handleLogin} noValidate>
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
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

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 2 }}>
              <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2', fontSize: '0.9rem' }}>
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 2, mb: 2, bgcolor: '#002B5B', '&:hover': { bgcolor: '#001a38' } }}
            >
              Iniciar Sesión
            </Button>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="textSecondary">
                ¿No tienes una cuenta?{' '}
                <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>
                  Regístrate
                </Link>
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="textSecondary">
                O inicia con
              </Typography>
            </Divider>

            <Stack spacing={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Box component="img" src={googleIcon} alt="Google" sx={{ width: 20, height: 20 }} />}
                sx={{ color: 'text.primary', borderColor: '#ddd', textTransform: 'none' }}
              >
                Continuar con Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Box component="img" src={appleIcon} alt="Apple" sx={{ width: 20, height: 20 }} />}
                sx={{ color: 'text.primary', borderColor: '#ddd', textTransform: 'none' }}
              >
                Continuar con Apple
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;