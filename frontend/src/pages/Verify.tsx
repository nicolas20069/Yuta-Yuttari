import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Container, Paper, Typography, Button, CircularProgress, Alert } from '@mui/material';
import api from '../services/api';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'idle'|'verifying'|'success'|'error'>('idle');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Token de verificación faltante');
      return;
    }

    const verify = async () => {
      setStatus('verifying');
      try {
        const res = await api.get(`/api/auth/verify?token=${encodeURIComponent(token)}`);
        setStatus('success');
        setMessage(res.data?.message || 'Cuenta verificada correctamente. Redirigiendo a iniciar sesión...');
        setTimeout(() => navigate('/login'), 2500);
      } catch (err: any) {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Error verificando la cuenta. Por favor intenta de nuevo.');
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, textAlign: 'center' }} elevation={3}>
          <Typography variant="h5" gutterBottom>
            Verificando tu cuenta
          </Typography>
          {status === 'verifying' && <CircularProgress sx={{ my: 2 }} />}
          {message && (
            <Alert severity={status === 'error' ? 'error' : 'success'} sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" onClick={() => navigate('/login')}>
              Ir a Iniciar Sesión
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Verify;
