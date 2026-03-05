import React from 'react';
import { Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Habitaciones', path: '/rooms' },
    { label: 'Explorar', path: '/explore' },
    { label: 'Sobre Nosotros', path: '/about' },
    { label: 'Contacto', path: '/contact' },
  ];

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 250, paddingTop: '20px' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.path}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
              sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
