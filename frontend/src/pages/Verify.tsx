import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Container, Paper, Typography, Button, CircularProgress, Alert } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import api from '../services/api';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState<string>('');
  const hasVerified = useRef(false);

  useEffect(() => {
    const verifyAccount = async () => {
      // Prevenir doble ejecución en React StrictMode
      if (hasVerified.current) return;
      hasVerified.current = true;

      const token = searchParams.get('token');
      
      // Validar que existe el token
      if (!token) {
        setStatus('error');
        setMessage('Token de verificación faltante. Por favor revisa el enlace en tu email.');
        return;
      }

      try {
        // Llamar al backend NestJS
        const response = await api.get(`api/auth/verify`, {
          params: { token }
        });
        
        setStatus('success');
        setMessage(response.data.message || 'Cuenta verificada correctamente');
        
        // Redirigir después de 3 segundos
        setTimeout(() => {
          navigate('/login');
        }, 3000);
        
      } catch (err: any) {
        setStatus('error');
        
        // Manejar errores de NestJS
        const errorMessage = err.response?.data?.message || 
                            err.response?.data?.error ||
                            'Error al verificar la cuenta. El token puede ser inválido o haber expirado.';
        
        setMessage(errorMessage);
      }
    };

    verifyAccount();
  }, [searchParams, navigate]);

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 4 
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, textAlign: 'center' }} elevation={3}>
          
          {/* ESTADO: Verificando */}
          {status === 'verifying' && (
            <>
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Verificando tu cuenta
              </Typography>
              <CircularProgress size={60} sx={{ my: 3 }} />
              <Typography variant="body1" color="text.secondary">
                Por favor espera mientras verificamos tu cuenta...
              </Typography>
            </>
          )}

          {/* ESTADO: Éxito */}
          {status === 'success' && (
            <>
              <CheckCircleIcon sx={{ fontSize: 70, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight={600} color="success.main">
                ¡Verificación exitosa!
              </Typography>
              <Alert severity="success" sx={{ my: 2 }}>
                {message}
              </Alert>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Serás redirigido al inicio de sesión en unos segundos...
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate('/login')}
                fullWidth
              >
                Ir a Iniciar Sesión
              </Button>
            </>
          )}

          {/* ESTADO: Error */}
          {status === 'error' && (
            <>
              <ErrorIcon sx={{ fontSize: 70, color: 'error.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight={600} color="error.main">
                Error en la verificación
              </Typography>
              <Alert severity="error" sx={{ my: 2 }}>
                {message}
              </Alert>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Si el problema persiste, solicita un nuevo enlace de verificación.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/login')}
                  fullWidth
                >
                  Ir a Iniciar Sesión
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => navigate('/register')}
                  fullWidth
                >
                  Volver a Registrarse
                </Button>
              </Box>
            </>
          )}
          
        </Paper>
      </Container>
    </Box>
  );
};

export default Verify;