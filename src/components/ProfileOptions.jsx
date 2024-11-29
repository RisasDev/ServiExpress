import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";

const ProfileOptions = ({ onLogout }) => {
  const { user } = useContext(AuthContext); // Obtén la información del usuario

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
      <ul className="py-1">
        {user?.is_superuser && ( // Mostrar Dashboard si es administrador
          <li>
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </Link>
          </li>
        )}
        <li>
          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Ver Perfil
          </Link>
        </li>
        {/* Mostrar la opción Nueva Reserva solo si no es un superusuario */}
        {!user?.is_superuser && (
          <li>
            <Link to="/reservas/nueva" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Nueva Reserva
            </Link>
          </li>
        )}
        <li>
          <button
            onClick={onLogout}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Cerrar Sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileOptions;
