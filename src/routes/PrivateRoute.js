import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  // Lógica para verificar si el usuario está autenticado (ejemplo con localStorage)
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
