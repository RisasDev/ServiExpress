import React, { useState, useEffect } from "react";

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simular una llamada a un API para obtener reservas
    const fetchReservas = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/reservas/");
        if (!response.ok) throw new Error("Error al cargar las reservas");
        const data = await response.json();
        setReservas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta reserva?")) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/reservas/${id}/`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Error al eliminar la reserva");
        setReservas(reservas.filter((reserva) => reserva.id !== id));
      } catch (err) {
        alert("Hubo un error al eliminar la reserva");
      }
    }
  };

  if (loading) return <p>Cargando reservas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Reservas
      </h1>
      {reservas.length === 0 ? (
        <p className="text-center">No hay reservas disponibles.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-blue-500 text-white">ID</th>
              <th className="py-2 px-4 bg-blue-500 text-white">Cliente</th>
              <th className="py-2 px-4 bg-blue-500 text-white">Fecha</th>
              <th className="py-2 px-4 bg-blue-500 text-white">Servicio</th>
              <th className="py-2 px-4 bg-blue-500 text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id} className="border-b">
                <td className="py-2 px-4">{reserva.id}</td>
                <td className="py-2 px-4">{reserva.cliente}</td>
                <td className="py-2 px-4">{reserva.fecha}</td>
                <td className="py-2 px-4">{reserva.servicio}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() =>
                      alert(`Ver detalles de la reserva ${reserva.id}`)
                    }
                    className="py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => alert(`Editar reserva ${reserva.id}`)}
                    className="py-1 px-3 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(reserva.id)}
                    className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reservas;
