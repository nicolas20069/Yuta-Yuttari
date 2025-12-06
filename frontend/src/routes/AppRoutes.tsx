/*  Este archivo define las rutas principales de la aplicación 
usando React Router.
 Se importan los componentes necesarios y 
 las páginas de Login y Registro. */

import { Routes, Route, Navigate } from 'react-router-dom'; // Importa componentes de React Router, para la navegación
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';


// Componente que define las rutas de la aplicación 
const AppRoutes = () => {
  return (
    <Routes> {/* Contenedor de las rutas */}
      <Route path='/' element={<Navigate to="/login" />}></Route>    {/* Redirige la ruta raíz a /login */}
      <Route path="/login" element={<Login />} />     {/* Ruta para la página de login */}
      <Route path="/register" element={<Register />} />    {/* Ruta para la página de registro */} 
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