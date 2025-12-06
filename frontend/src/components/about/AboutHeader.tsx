import React from 'react';
import { Box, Typography } from '@mui/material';
import ImagePlaceholder from '../common/ImagePlaceholder';

const AboutHeader: React.FC = () => {
    return (
        <Box sx={{ position: 'relative', height: 400, color: 'white', mb: 8 }}>
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
                <ImagePlaceholder height="100%" text="Hotel Building Background" borderRadius={0} />
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}
            >
                <Typography variant="h2" fontWeight="bold" gutterBottom>
                    Nosotros
                </Typography>
                <Typography variant="h6" sx={{ maxWidth: 800, px: 2 }}>
                    Tu refugio moderno en la montaña verde.
                </Typography>
                <Typography variant="body2" sx={{ maxWidth: 800, px: 2, mt: 1 }}>
                    Prometemos un confortable viaje para garantizar que disfrutes el entorno de descanso total.
                </Typography>

                <Box
                    component="img"
                    src="https://i.postimg.cc/wTVpBy8f/Gemini-Generated-Image-5hrhni5hrhni5hrh.png"
                    alt="Logo"
                    sx={{
                        mt: 4,
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid white'
                    }}
                />
            </Box>
        </Box>
    );
}

export default AboutHeader;
