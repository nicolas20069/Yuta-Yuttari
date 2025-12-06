import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Paper } from '@mui/material';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form data:', formData);
        alert('Mensaje enviado (simulación)');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 8, px: 2 }}>
            <Paper elevation={0} sx={{ p: 4, maxWidth: 900, mx: 'auto' }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Nombre Completo
                        </Typography>
                        <TextField
                            fullWidth
                            name="name"
                            placeholder="Ej: Pepito Pérez"
                            variant="outlined"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Correo
                        </Typography>
                        <TextField
                            fullWidth
                            name="email"
                            type="email"
                            placeholder="Ej: tuemail@gmail.com"
                            variant="outlined"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Mensaje
                        </Typography>
                        <TextField
                            fullWidth
                            name="message"
                            placeholder="Escribe aquí tu duda..."
                            variant="outlined"
                            multiline
                            rows={6}
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            size="large"
                            sx={{ px: 6, py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}
                        >
                            ENVIAR
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default ContactForm;
