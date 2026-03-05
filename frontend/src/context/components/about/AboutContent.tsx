import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import ImagePlaceholder from '../common/ImagePlaceholder';

const AboutContent: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ mb: 8 }}>
            <Grid container spacing={6} alignItems="center">
                {/* Imagen del Gerente (Izquierda) */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <ImagePlaceholder
                            height={400}
                            text="Maximiliano Nario (Photo)"
                            borderRadius={2}
                        />
                        <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                            Maximiliano Nario (Gerente)
                        </Typography>
                    </Box>
                </Grid>

                {/* Texto descriptivo (Derecha) */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Typography paragraph align="justify" sx={{ mb: 3 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
                    </Typography>
                    <Typography paragraph align="justify">
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AboutContent;
