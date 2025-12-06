import React from 'react';
import { Box, Typography } from '@mui/material';
import ImagePlaceholder from '../common/ImagePlaceholder';

const ContactHeader: React.FC = () => {
    return (
        <Box sx={{ position: 'relative', height: 350, color: 'white', mb: 8 }}>
            {/* Background Image Placeholder */}
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
                <ImagePlaceholder height="100%" text="Contact Background Details" borderRadius={0} />
            </Box>

            {/* Overlay */}
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
                    Contáctanos
                </Typography>
                <Typography variant="h6" sx={{ maxWidth: 800, px: 2 }}>
                    Próxima a cuidarnos
                </Typography>
            </Box>
        </Box>
    );
};

export default ContactHeader;
