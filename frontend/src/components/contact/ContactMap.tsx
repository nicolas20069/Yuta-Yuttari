import React from 'react';
import { Box } from '@mui/material';
import ImagePlaceholder from '../common/ImagePlaceholder';

const ContactMap: React.FC = () => {
    return (
        <Box sx={{ width: '100%', height: 400, mt: 4 }}>
            {/* 
                Idealmente aquí iría un iframe de Google Maps o una imagen real del mapa.
                Por ahora usamos el placeholder como se acordó, 
                pero con estilo "mapa" si es posible, o simplemente el placeholder.
            */}
            <ImagePlaceholder height="100%" text="Google Maps Location (Placeholder)" borderRadius={0} />
        </Box>
    );
};

export default ContactMap;
