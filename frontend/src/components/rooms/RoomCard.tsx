import React from 'react';
import { Card, CardContent, Typography, Button, Box, Rating } from '@mui/material';

interface RoomCardProps {
  name: string;
  price: number;
  rating?: number;
  description?: string;
  onSelect?: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  name,
  price,
  rating = 4.5,
  description = 'Habitación cómoda y acogedora',
  onSelect,
}) => {
  return (
    <Card sx={{ '&:hover': { boxShadow: 8, transform: 'translateY(-5px)' }, transition: 'all 0.3s' }}>
      <Box sx={{ backgroundColor: '#f0f0f0', height: '200px' }} />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
          {name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <Rating value={rating} readOnly size="small" />
          <Typography variant="body2" color="textSecondary" sx={{ marginLeft: '10px' }}>
            ({rating})
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '15px' }}>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            ${price}/noche
          </Typography>
          <Button variant="contained" size="small" onClick={onSelect}>
            Reservar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
