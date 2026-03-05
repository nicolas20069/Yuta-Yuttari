import React from 'react';
import { Box, Container, Typography, Grid, Paper, Avatar, Rating } from '@mui/material';

const Testimonials: React.FC = () => {
    const reviews = [
        { name: 'Anthony Waff', date: '9 abr. 2024', rating: 5, text: 'The service at the Hotel Montelbello was exceptional. There was absolutely no issue that was not addressed timely and with satisfactory results.' },
        { name: 'Regina Bels', date: '9 abr. 2024', rating: 5, text: 'The service at the Hotel Montelbello was exceptional. There was absolutely no issue that was not addressed timely and with satisfactory results.' },
        { name: 'Sarryn Viny', date: '9 abr. 2024', rating: 3, text: 'The service at the Hotel Montelbello was exceptional. There was absolutely no issue that was not addressed timely and with satisfactory results.' },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h4" align="center" fontWeight="bold" gutterBottom sx={{ mb: 6 }}>
                Testimonios
            </Typography>

            <Grid container spacing={4}>
                {reviews.map((review, index) => (
                    <Grid size={{ xs: 12, md: 4 }} key={index}>
                        <Paper elevation={0} sx={{ p: 3, border: '1px solid #eee', height: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="caption" color="textSecondary">{review.date}</Typography>
                                <Rating value={review.rating} readOnly size="small" />
                            </Box>
                            <Typography variant="body2" paragraph color="textSecondary" sx={{ mb: 4 }}>
                                "{review.text}"
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'grey.300' }}>U</Avatar>
                                <Typography variant="subtitle2" fontWeight="bold">
                                    {review.name}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Testimonials;
