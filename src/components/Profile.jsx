import React, { useContext } from 'react';
import AuthContext from "./AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faIdCard, faEnvelope, faPhoneAlt, faMapMarkerAlt, faUserShield } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  // Usar el contexto para obtener los datos del usuario
  const { user } = useContext(AuthContext);

  // Verificar si el usuario está autenticado
  if (!user) {
    return (
      <div className="container mx-auto my-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Mi Perfil</h2>
        <p>Cargando información del usuario...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Mi Perfil</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-6">
        <div className="w-24 h-24 overflow-hidden rounded-full border-2 border-gray-300 flex-shrink-0">
          <img src="https://img.freepik.com/vector-premium/mecanico-esta-leyendo-cuidadosamente-manual-usuario-taller-rodeado-herramientas-maquinaria-mecanico-trabaja-utilizando-concepto-manual-usuario_538213-150514.jpg" alt="Imagen de usuario" className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Información del Usuario</h3>
          <div className="mt-4 space-y-2">
            <p><FontAwesomeIcon icon={faUser} className="text-gray-700" /> Usuario: {user.username}</p>
            <p><FontAwesomeIcon icon={faIdCard} className="text-gray-700" /> Nombre: {user.nombre} {user.apellido}</p>
            <p><FontAwesomeIcon icon={faIdCard} className="text-gray-700" /> RUT: {user.rut}</p>
            <p><FontAwesomeIcon icon={faPhoneAlt} className="text-gray-700" /> Teléfono: {user.telefono}</p>
            <p><FontAwesomeIcon icon={faEnvelope} className="text-gray-700" /> Correo: {user.email}</p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-700" /> Dirección: {user.direccion}</p>
            <p><FontAwesomeIcon icon={faUserShield} className="text-gray-700" /> Rol: {user.is_superuser ? 'Administrador' : 'Usuario'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
