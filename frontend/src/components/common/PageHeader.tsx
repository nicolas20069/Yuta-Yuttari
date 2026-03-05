import React from 'react';
import { Box, Typography } from '@mui/material';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
        {title}
      </Typography>
      {subtitle && <Typography variant="h6">{subtitle}</Typography>}
    </Box>
  );
};

export default PageHeader;
