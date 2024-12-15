import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Usuarios = () => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/clientes/");
        if (!response.ok) throw new Error("Error al obtener los usuarios");
        const data = await response.json();
        setUsers(data);
        setUserCount(data.length); // Setea el conteo de usuarios
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEliminar = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Error al eliminar el usuario");

      setUsers(users.filter((user) => user.id !== id));
      setUserCount(userCount - 1); // Actualiza el conteo de usuarios
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500">Cargando usuarios...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Usuarios
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Total de usuarios: {userCount}
      </p>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs uppercase bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-6">Usuario</th>
              <th className="py-3 px-6">Nombre</th>
              <th className="py-3 px-6">RUT</th>
              <th className="py-3 px-6">Teléfono</th>
              <th className="py-3 px-6">Correo</th>
              <th className="py-3 px-6">Dirección</th>
              <th className="py-3 px-6">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-white border-b hover:bg-gray-100">
                <td className="py-4 px-6">{user.username}</td>
                <td className="py-4 px-6">{user.nombre} {user.apellido}</td>
                <td className="py-4 px-6">{user.rut}</td>
                <td className="py-4 px-6">{user.telefono}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">{user.direccion}</td>
                <td className="py-4 px-6">
                  <div className="flex space-x-2">
                    <Link
                      to={`/dashboard/usuarios/modificar/${user.id}`}
                      className="py-2 px-4 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300"
                    >
                      Modificar
                    </Link>
                    <button
                      onClick={() => handleEliminar(user.id)}
                      className="py-2 px-4 text-white bg-red-500 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-300"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuarios;
