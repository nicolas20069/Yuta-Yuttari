import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '40px 0 20px',
        marginTop: '60px',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 4, marginBottom: '30px' }}>
          <Box>
            <Typography variant="h6" sx={{ marginBottom: '15px' }}>
              Sobre Nosotros
            </Typography>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '8px' }}>
              Nuestra Historia
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '8px' }}>
              Nuestro Equipo
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block' }}>
              Empleos
            </Link>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ marginBottom: '15px' }}>
              Servicio al Cliente
            </Typography>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '8px' }}>
              Contacto
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '8px' }}>
              Preguntas Frecuentes
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block' }}>
              Soporte
            </Link>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ marginBottom: '15px' }}>
              Políticas
            </Typography>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '8px' }}>
              Términos de Servicio
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '8px' }}>
              Política de Privacidad
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block' }}>
              Política de Cookies
            </Link>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ marginBottom: '15px' }}>
              Síguenos
            </Typography>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '8px' }}>
              Facebook
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '8px' }}>
              Twitter
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block' }}>
              Instagram
            </Link>
          </Box>
        </Box>

        <Box sx={{ borderTop: '1px solid #555', paddingTop: '20px', textAlign: 'center' }}>
          <Typography variant="body2">
            &copy; {currentYear} Yuta & Yuttari. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
