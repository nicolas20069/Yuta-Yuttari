import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import ImagePlaceholder from '../common/ImagePlaceholder';
import BedIcon from '@mui/icons-material/Bed';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';

interface RoomCardProps {
    title: string;
    price: string; // Formatted price e.g. "$ 1.200.000"
    imageText?: string;
}

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RoomCard: React.FC<RoomCardProps> = ({ title, price, imageText }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleReservaClick = () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: { pathname: '/reservas' } } });
        } else {
            navigate('/reservas');
        }
    };

    return (
        <Card sx={{ borderRadius: 2, boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ height: 250, position: 'relative' }}>
                <ImagePlaceholder height="100%" text={imageText || title} borderRadius={0} />
            </Box>

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body1" fontWeight="bold" color="text.primary" sx={{ mb: 2 }}>
                    {price}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary', mb: 3 }}>
                    {/* Iconos de características simulados */}
                    <WifiIcon fontSize="small" />
                    <AcUnitIcon fontSize="small" />
                    <BedIcon fontSize="small" />
                </Box>

                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    sx={{ fontWeight: 'bold' }}
                    onClick={handleReservaClick}
                >
                    RESERVA YA
                </Button>
            </CardContent>
        </Card>
    );
};

export default RoomCard;
