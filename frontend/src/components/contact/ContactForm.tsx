import React, { useState } from 'react';
import { Container, TextField, Button, Box } from '@mui/material';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    // Aquí iría la lógica para enviar el correo
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <Container maxWidth="md" sx={{ paddingY: '80px' }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
          <Box>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="Teléfono"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="Asunto"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </Box>
          <Box sx={{ gridColumn: '1 / -1' }}>
            <TextField
              fullWidth
              label="Mensaje"
              name="message"
              multiline
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </Box>
          <Box sx={{ gridColumn: '1 / -1' }}>
            <Button type="submit" variant="contained" size="large">
              Enviar Mensaje
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
};

export default ContactForm;
