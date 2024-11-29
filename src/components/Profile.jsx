import React, { useContext } from 'react';
import AuthContext from "./AuthContext"; // Importa el contexto

const Profile = () => {
  // Usar el contexto para obtener los datos del usuario
  const { user } = useContext(AuthContext);

  // Verificar si el usuario está autenticado
  if (!user) {
    return (
      <div className="container mx-auto my-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Mi Perfil</h2>
        <p>Debes iniciar sesión para ver tu perfil.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Mi Perfil</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">Información del Usuario</h3>
        <div className="mt-4">
          <p><strong>Nombre de usuario:</strong> {user.username}</p>
          <p><strong>Correo electrónico:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.is_superuser ? 'Administrador' : 'Usuario'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
