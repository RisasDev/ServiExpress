import React, { useContext, useState } from "react"; // Asegúrate de que useContext esté aquí
import { Link } from "react-router-dom";
import ProfileOptions from "./ProfileOptions";
import AuthContext from "./AuthContext"; // Importa el contexto

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext); // Usa el contexto aquí
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("access");
    window.location.href = "/";
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          SERVIEXPRESS
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          {!isAuthenticated ? (
            <Link to="/login" className="hover:text-gray-300">
              Iniciar Sesión
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowProfileOptions(!showProfileOptions)}
                className="hover:text-gray-300"
              >
                Mi Perfil
              </button>
              {showProfileOptions && <ProfileOptions onLogout={handleLogout} />}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
