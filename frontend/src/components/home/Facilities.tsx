import React from 'react';
import { Container, Box, Card, Typography } from '@mui/material';

const Facilities: React.FC = () => {
  const facilities = [
    { icon: '🍽️', title: 'Restaurante', description: 'Disfruta de comidas exquisitas' },
    { icon: '🏊', title: 'Piscina', description: 'Relájate en nuestra piscina' },
    { icon: '🏋️', title: 'Gimnasio', description: 'Mantente en forma' },
    { icon: '🎉', title: 'Eventos', description: 'Salones para eventos especiales' },
  ];

  return (
    <Container maxWidth="lg" sx={{ paddingY: '80px' }}>
      <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '50px' }}>
        Nuestras Instalaciones
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
        {facilities.map((facility, index) => (
          <Card key={index} sx={{ textAlign: 'center', padding: '20px', '&:hover': { boxShadow: 8 } }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>{facility.icon}</div>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              {facility.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {facility.description}
            </Typography>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Facilities;
