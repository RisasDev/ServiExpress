import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "./AuthContext"; // Importa el contexto

const ReservaForm = () => {
  const { user } = useContext(AuthContext);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [notes, setNotes] = useState('');
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/servicios/");
        if (!response.ok) throw new Error("Error al obtener los servicios");
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateTime = `${selectedDate}T${selectedTime}`;

    const newReserva = {
      "cliente": user.id,
      "servicio": parseInt(selectedService), // Convertir el ID del servicio a número
      "fecha_reserva": dateTime, // Combinar fecha y hora
      "estado": 'pendiente',
      "notas": notes,
    };

    console.log(newReserva);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/reservas/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReserva),
      });

      if (response.ok) {
        setSuccess("Reserva creada exitosamente");
      } else {
        setError("Error al crear la reserva");
      }
    } catch (error) {
      console.error("Error al enviar la reserva:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Crear Reserva</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="service" className="block text-gray-700">
            Servicio
          </label>
          <select
            id="service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccione un servicio</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.descripcion} - ${service.precio}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700">
            Fecha de la reserva
          </label>
          <input
            id="date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700">
            Hora de la reserva
          </label>
          <input
            id="time"
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="notes" className="block text-gray-700">
            Notas
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition duration-300"
        >
          Crear Reserva
        </button>
      </form>
    </div>
  );
};

export default ReservaForm;
