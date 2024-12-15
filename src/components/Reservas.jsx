import React, { useState, useEffect } from "react";

const Reservas = () => {
  const [clientes, setClientes] = useState({});
  const [servicios, setServicios] = useState({});
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCliente = async (clienteId) => {
      if (clientes[clienteId]) return; // Si ya existe, no hacer otra llamada
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/clientes/${clienteId}/`
        );
        if (!response.ok) throw new Error("Error al cargar el cliente");
        const data = await response.json();
        const nombreCompleto = `${data.nombre} ${data.apellido}`; // Combinar nombre y apellido
        setClientes((prev) => ({ ...prev, [clienteId]: nombreCompleto }));
      } catch (err) {
        console.error(`Error al obtener cliente ${clienteId}:`, err);
      }
    };

    const fetchServicio = async (servicioId) => {
      if (servicios[servicioId]) return; // Si ya existe, no hacer otra llamada
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/servicios/${servicioId}/`
        );
        if (!response.ok) throw new Error("Error al cargar el servicio");
        const data = await response.json();
        setServicios((prev) => ({ ...prev, [servicioId]: data.descripcion }));
      } catch (err) {
        console.error(`Error al obtener servicio ${servicioId}:`, err);
      }
    };

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

    reservas.forEach((reserva) => {
      fetchCliente(reserva.cliente);
      fetchServicio(reserva.servicio);
    });

  }, [clientes, reservas, servicios]);

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

  if (loading)
    return <p className="text-center text-gray-500">Cargando reservas...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Reservas
      </h1>
      {reservas.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay reservas disponibles.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs uppercase bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-6">Número</th>
                <th className="py-3 px-6">Cliente</th>
                <th className="py-3 px-6">Fecha</th>
                <th className="py-3 px-6">Servicio</th>
                <th className="py-3 px-6">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr
                  key={reserva.id}
                  className="bg-white border-b hover:bg-gray-100"
                >
                  <td className="py-4 px-6">{reserva.id}</td>
                  <td className="py-4 px-6">
                    {clientes[reserva.cliente] || "Cargando..."}
                  </td>
                  <td className="py-4 px-6">
                    {reserva.fecha_reserva
                      ? new Date(reserva.fecha_reserva).toLocaleString(
                          "es-ES",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "Fecha no disponible"}
                  </td>
                  <td className="py-4 px-6">
                    {servicios[reserva.servicio] || "Cargando..."}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          alert(`Ver detalles de la reserva ${reserva.id}`)
                        }
                        className="py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
                      >
                        Ver
                      </button>
                      <button
                        onClick={() => alert(`Editar reserva ${reserva.id}`)}
                        className="py-2 px-4 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(reserva.id)}
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
    </div>
  );
};

export default Reservas;
