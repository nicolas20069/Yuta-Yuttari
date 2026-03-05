import React, { useState } from 'react';
import { Card, TextField, Button, Box, Container } from '@mui/material';

const SearchFilter: React.FC = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');

  const handleSearch = () => {
    console.log({ checkIn, checkOut, guests });
    // Implementar lógica de búsqueda
  };

  return (
    <Container maxWidth="lg" sx={{ marginY: '-40px', position: 'relative', zIndex: 10 }}>
      <Card sx={{ padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
          <Box>
            <TextField
              fullWidth
              label="Fecha de entrada"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="Fecha de salida"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="Número de huéspedes"
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              inputProps={{ min: '1' }}
            />
          </Box>
          <Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default SearchFilter;
