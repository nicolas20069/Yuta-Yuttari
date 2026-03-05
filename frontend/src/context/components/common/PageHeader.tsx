import React from 'react';
import { Box, Typography } from '@mui/material';
import ImagePlaceholder from './ImagePlaceholder';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    imageText?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, imageText }) => {
    return (
        <Box sx={{ position: 'relative', height: 350, color: 'white', mb: 8 }}>
            {/* Background Image Placeholder */}
            {/* 
                En el futuro, esto se reemplazará por una URL de imagen real pasada como prop (backgroundImageUrl).
            */}
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
                <ImagePlaceholder
                    height="100%"
                    text={imageText || `${title} Background`}
                    borderRadius={0}
                />
            </Box>

            {/* Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0,0,0,0.5)', // Oscurecer la imagen para legibilidad
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}
            >
                <Typography variant="h2" fontWeight="bold" gutterBottom>
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant="h6" sx={{ maxWidth: 800, px: 2 }}>
                        {subtitle}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default PageHeader;
