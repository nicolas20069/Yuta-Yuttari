import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ImagePlaceholder from '../common/ImagePlaceholder';

interface ExploreItemProps {
    title: string;
    description: string;
    imageText?: string;
}

const ExploreItem: React.FC<ExploreItemProps> = ({ title, description, imageText }) => {
    return (
        <Box sx={{ position: 'relative', mb: 8, height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Background Image */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1
                }}
            >
                <ImagePlaceholder height="100%" text={imageText || title} borderRadius={4} />
            </Box>

            {/* Content Card */}
            <Paper
                elevation={3}
                sx={{
                    position: 'relative',
                    width: '80%',
                    maxWidth: 700,
                    p: 4,
                    textAlign: 'center',
                    borderTop: '5px solid #002B5B', // Blue accent matching design
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)'
                }}
            >
                <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom sx={{ color: '#D4AF37' }}>
                    {/* Note: Design uses a gold/yellow color for title? Or is it orange? 
                       Looking at the image, "Habitaciones Lujosas" looks gold/orange. 
                       "Gym" looks gold. "Restaurante" looks gold.
                       Let's try a gold color #D4AF37 or similiar.
                    */}
                    {title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {description}
                </Typography>
            </Paper>
        </Box>
    );
};

export default ExploreItem;
