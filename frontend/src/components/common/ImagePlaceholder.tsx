import React from 'react';
import { Box } from '@mui/material';

interface ImagePlaceholderProps {
  width?: string | number;
  height?: string | number;
  text?: string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ 
  width = '100%', 
  height = '200px', 
  text = 'Imagen'
}) => {
  return (
    <Box
      sx={{
        width,
        height,
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#999',
        fontSize: '16px',
        borderRadius: '8px',
      }}
    >
      {text}
    </Box>
  );
};

export default ImagePlaceholder;
