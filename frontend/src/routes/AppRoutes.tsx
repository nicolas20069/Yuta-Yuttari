/*  Este archivo define las rutas principales de la aplicación 
using React Router.
 Se importan los componentes necesarios y 
 las páginas de Login y Registro. */

import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Rooms from '../pages/Rooms';


// Componente que define las rutas de la aplicación 
const AppRoutes = () => {
  return (
    <Routes> {/* Contenedor de las rutas */}
      <Route path='/' element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />

      {/* Ruta protegida */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
      />

    </Routes>
  );
};

export default AppRoutes;