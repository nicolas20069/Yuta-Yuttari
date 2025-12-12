import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Paper, Alert, CircularProgress } from '@mui/material';
import { resendVerification } from '../services/authService';

const VerificationPending = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email || '';
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [resendError, setResendError] = useState('');

  const handleResendEmail = async () => {
    if (!email) {
      setResendError('Email no disponible. Por favor regístrate nuevamente.');
      return;
    }

    setResendLoading(true);
    setResendMessage('');
    setResendError('');

    try {
      const response = await resendVerification(email);
      setResendMessage(response.message || 'Se envió un nuevo correo de verificación.');
      setTimeout(() => {
        setResendMessage('');
      }, 5000);
    } catch (err: any) {
      setResendError(err.response?.data?.message || 'Error al reenviar el correo. Intenta nuevamente.');
    } finally {
      setResendLoading(false);
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
        py: 4,
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
            Verifica tu Cuenta
          </Typography>

          <Alert severity="info" sx={{ my: 2 }}>
            <Typography variant="body2">
              Hemos enviado un enlace de verificación a <strong>{email}</strong>. 
              Por favor, revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta.
            </Typography>
          </Alert>

          <Typography variant="body2" color="textSecondary" sx={{ my: 3 }}>
            ¿No recibiste el correo? Puedes reenviarlo usando el botón de abajo.
          </Typography>

          {resendMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {resendMessage}
            </Alert>
          )}

          {resendError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {resendError}
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleResendEmail}
              disabled={resendLoading}
              sx={{ bgcolor: '#002B5B', '&:hover': { bgcolor: '#001a38' } }}
            >
              {resendLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Reenviar Correo de Verificación'}
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{ color: '#002B5B', borderColor: '#002B5B' }}
            >
              Ir a Iniciar Sesión
            </Button>
          </Box>

          <Typography variant="body2" color="textSecondary" sx={{ mt: 3 }}>
            ¿Ya tienes cuenta verificada?{' '}
            <span
              onClick={() => navigate('/login')}
              style={{
                textDecoration: 'none',
                color: '#1976d2',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Inicia sesión
            </span>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default VerificationPending;
