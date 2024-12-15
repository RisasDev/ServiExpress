import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Asegúrate de tener react-router-dom instalado

const Servicios = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/servicios/");
        if (!response.ok) throw new Error("Error al obtener los servicios");
        const data = await response.json();
        setServicios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  const handleEliminar = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/servicios/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Error al eliminar el servicio");

      setServicios(servicios.filter((servicio) => servicio.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500">Cargando servicios...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Servicios
      </h1>
      {servicios.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay servicios disponibles.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs uppercase bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-6">Nombre</th>
                <th className="py-3 px-6">Descripción</th>
                <th className="py-3 px-6">Precio</th>
                <th className="py-3 px-6">Imagen</th> {/* Nueva columna para la imagen */}
                <th className="py-3 px-6">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((servicio) => (
                <tr
                  key={servicio.id}
                  className="bg-white border-b hover:bg-gray-100"
                >
                  <td className="py-4 px-6">{servicio.nombre}</td>
                  <td className="py-4 px-6">{servicio.descripcion}</td>
                  <td className="py-4 px-6">${servicio.precio}</td>
                  <td className="py-4 px-6">
                    {servicio.url ? (
                      <img
                        src={servicio.url}
                        alt={servicio.nombre}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      "No hay imagen"
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <Link
                        to={`/servicios/modificar/${servicio.id}`}
                        className="py-2 px-4 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300"
                      >
                        Modificar
                      </Link>
                      <button
                        onClick={() => handleEliminar(servicio.id)}
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
      )}
      <Link
        to="/servicios/nueva"
        className="block mt-6 text-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-md shadow-lg transition-shadow duration-300"
      >
        Agregar Nuevo Servicio
      </Link>
    </div>
  );
};

export default Servicios;
