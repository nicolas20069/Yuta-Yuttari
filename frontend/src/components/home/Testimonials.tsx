import React from 'react';
import { Container, Box, Card, Typography, Rating } from '@mui/material';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Juan Pérez',
      rating: 5,
      comment: 'Excelente servicio y habitaciones cómodas. ¡Volvería sin dudarlo!',
    },
    {
      name: 'María García',
      rating: 5,
      comment: 'Atmósfera perfecta, personal muy atento. Recomendado al 100%.',
    },
    {
      name: 'Carlos López',
      rating: 4,
      comment: 'Buenas instalaciones y ubicación estratégica. Muy satisfecho.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ paddingY: '80px' }}>
      <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '50px' }}>
        Lo que Dicen Nuestros Clientes
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
        {testimonials.map((testimonial, index) => (
          <Card key={index} sx={{ padding: '20px', height: '100%' }}>
            <Rating value={testimonial.rating} readOnly sx={{ marginBottom: '10px' }} />
            <Typography variant="body2" sx={{ marginBottom: '15px', fontStyle: 'italic' }}>
              "{testimonial.comment}"
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              - {testimonial.name}
            </Typography>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Testimonials;
