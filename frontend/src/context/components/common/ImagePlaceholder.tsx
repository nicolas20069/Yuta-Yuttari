import React from 'react';
import { Box, Typography } from '@mui/material';

interface ImagePlaceholderProps {
    width?: string | number;
    height?: string | number;
    text?: string;
    borderRadius?: string | number;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
    width = '100%',
    height = 200,
    text = 'Image Placeholder',
    borderRadius = 0
}) => {
    return (
        <Box
            sx={{
                width: width,
                height: height,
                bgcolor: 'grey.300',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'grey.600',
                borderRadius: borderRadius,
                overflow: 'hidden'
            }}
        >
            <Typography variant="body2">{text}</Typography>
        </Box>
    );
};

export default ImagePlaceholder;
