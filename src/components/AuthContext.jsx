import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access');
    
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/user/me/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData); // Actualiza el estado del usuario
          } else {
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('access');
          }
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem('access');
        }
      };

      fetchUser();
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]); // Dependencia para ejecutarse cuando el estado de autenticación cambie

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
