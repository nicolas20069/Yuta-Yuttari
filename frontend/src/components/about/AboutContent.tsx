import React from 'react';
import { Container, Box, Typography } from '@mui/material';

const AboutContent: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ paddingY: '80px' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, '@media (max-width: 900px)': { gridTemplateColumns: '1fr' } }}>
        <Box>
          <Box sx={{ backgroundColor: '#f0f0f0', height: '300px', borderRadius: '8px' }} />
        </Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
            Nuestra Historia
          </Typography>
          <Typography sx={{ marginBottom: '20px', lineHeight: 1.8 }}>
            Yuta & Yuttari nació con la visión de crear un espacio donde la comodidad y el servicio
            excepcional se unen para ofrecerle una experiencia inolvidable. Con más de 20 años en
            la industria hotelera, nos hemos posicionado como líderes en la región.
          </Typography>
          <Typography sx={{ marginBottom: '20px', lineHeight: 1.8 }}>
            Nuestro compromiso es brindarte el mejor servicio posible, con atención al detalle y
            calidez humana en cada interacción. Cada miembro de nuestro equipo está dedicado a
            hacer de tu estancia una experiencia memorable.
          </Typography>
          <Typography sx={{ marginBottom: '20px', lineHeight: 1.8 }}>
            Contamos con modernas instalaciones, habitaciones de lujo, y un equipo de profesionales
            capacitados para satisfacer tus necesidades.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ marginTop: '80px' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          Nuestros Valores
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3 }}>
          {[
            { title: 'Excelencia', description: 'Nos esforzamos por la perfección en todo lo que hacemos' },
            { title: 'Integridad', description: 'Actuamos con honestidad y transparencia' },
            { title: 'Sostenibilidad', description: 'Comprometidos con el cuidado del medio ambiente' },
            { title: 'Innovación', description: 'Constantemente mejoramos nuestros servicios' },
          ].map((value, index) => (
            <Box key={index} sx={{ textAlign: 'center' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {value.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default AboutContent;
