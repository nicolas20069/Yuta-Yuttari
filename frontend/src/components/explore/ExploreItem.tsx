import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

interface ExploreItemProps {
  title: string;
  description: string;
  onSelect?: () => void;
}

const ExploreItem: React.FC<ExploreItemProps> = ({ title, description, onSelect }) => {
  return (
    <Card sx={{ '&:hover': { boxShadow: 8 }, transition: 'all 0.3s' }}>
      <Box sx={{ backgroundColor: '#f0f0f0', height: '200px' }} />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '15px' }}>
          {description}
        </Typography>
        <Button variant="outlined" onClick={onSelect}>
          Ver Más
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExploreItem;
