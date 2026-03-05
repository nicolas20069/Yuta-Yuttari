import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const ContactMap: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ paddingY: '80px' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, '@media (max-width: 900px)': { gridTemplateColumns: '1fr' } }}>
        <Box>
          <Box sx={{ backgroundColor: '#f0f0f0', height: '400px', borderRadius: '8px' }}>
            {/* Aquí iría un mapa embebido de Google Maps o similar */}
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography color="textSecondary">Mapa embebido</Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
            Información de Contacto
          </Typography>
          <Box sx={{ marginBottom: '30px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
              📍 Dirección
            </Typography>
            <Typography>123 Calle Principal, Ciudad, País</Typography>
          </Box>
          <Box sx={{ marginBottom: '30px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
              📞 Teléfono
            </Typography>
            <Typography>+1 (555) 123-4567</Typography>
          </Box>
          <Box sx={{ marginBottom: '30px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
              📧 Email
            </Typography>
            <Typography>info@yutayuttari.com</Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
              🕐 Horarios
            </Typography>
            <Typography>Lunes - Viernes: 9:00 AM - 6:00 PM</Typography>
            <Typography>Sábado - Domingo: 10:00 AM - 4:00 PM</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactMap;
