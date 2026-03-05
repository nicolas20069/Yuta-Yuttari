import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '100px 20px',
        textAlign: 'center',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
          Bienvenido a Yuta & Yuttari
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: '30px' }}>
          Encuentra las mejores habitaciones y servicios para tu estadía
        </Typography>
        <Box sx={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/rooms')}
          >
            Ver Habitaciones
          </Button>
          <Button
            variant="outlined"
            sx={{ color: 'white', borderColor: 'white' }}
            size="large"
            onClick={() => navigate('/about')}
          >
            Conocer Más
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
