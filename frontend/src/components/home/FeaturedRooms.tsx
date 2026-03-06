import React from 'react';
import { Box, Container, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FeaturedRooms: React.FC = () => {
  const navigate = useNavigate();

  const rooms = [
    {
      id: 1,
      name: 'Habitación Estándar',
      price: '$50/noche',
      image: '🛏️',
    },
    {
      id: 2,
      name: 'Habitación Deluxe',
      price: '$100/noche',
      image: '🛏️',
    },
    {
      id: 3,
      name: 'Suite Presidencial',
      price: '$200/noche',
      image: '🛏️',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ paddingY: '80px' }}>
      <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '50px' }}>
        Habitaciones Destacadas
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
        {rooms.map((room) => (
            <Card key={room.id} sx={{ '&:hover': { boxShadow: 8, transform: 'translateY(-5px)' }, transition: 'all 0.3s' }}>
              <Box sx={{ fontSize: '60px', textAlign: 'center', padding: '20px', backgroundColor: '#f5f5f5' }}>
                {room.image}
              </Box>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                  {room.name}
                </Typography>
                <Typography variant="body2" color="primary" sx={{ marginBottom: '10px' }}>
                  {room.price}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate('/rooms')}
                >
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          ))
        }
      </Box>
    </Container>
  );
};

export default FeaturedRooms;
