/*  Este archivo define las rutas principales de la aplicación 
using React Router.
 Se importan los componentes necesarios y 
 las páginas de Login y Registro. */

import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Verify from '../pages/Verify';
import VerificationPending from '../pages/VerificationPending';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResentPassword';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import About from '../pages/About';
import Explore from '../pages/Explore';
import Contact from '../pages/Contact';
import Rooms from '../pages/Rooms';
import ReservaPage from '../pages/Reserva';


// Componente que define las rutas de la aplicación 
const AppRoutes = () => {
  return (
    <Routes> {/* Contenedor de las rutas */}
      <Route path='/' element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/about" element={<About />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/verification-pending" element={<VerificationPending />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path= "/reset-password/:token" element={<ResetPassword />} />
      <Route path="/profile" element={<Profile />} />
   

      {/* Ruta protegida */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
      />
      <Route path="/reservas" element={
        <ProtectedRoute>
          <ReservaPage />
        </ProtectedRoute>
      }
      />

    </Routes>
  );
};

export default AppRoutes;