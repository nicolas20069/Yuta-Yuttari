import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import ImagePlaceholder from '../common/ImagePlaceholder';

const AboutContent: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ mb: 8 }}>
            <Grid container spacing={6} alignItems="center">
                <Grid size={{ xs: 12, md: 5 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <ImagePlaceholder height={400} text="Maximiliano Nario (Photo)" borderRadius={2} />
                        <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                            Maximiliano Nario (Gerente)
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 7 }}>
                    <Typography paragraph align="justify">
                        Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </Typography>
                    <Typography paragraph align="justify">
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Typography>
                    <Typography paragraph align="justify">
                        Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AboutContent;
