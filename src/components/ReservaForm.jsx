import React, { useState } from 'react';

const ReservaForm = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateTime = `${selectedDate}T${selectedTime}`;

    const newReserva = {
      cliente: 9, // ID del usuario (obtenido de la sesión o contexto)
      servicio: 1, // ID del servicio seleccionado
      fecha_reserva: dateTime, // Combinar fecha y hora
      estado: 'pendiente',
      notas: notes,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/reservas/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReserva),
      });

      if (response.ok) {
        const data = await response.json();
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
            <option value="1">Cambio de Aceite</option>
            <option value="2">Alineación y Balanceo</option>
            <option value="3">Revisión de Frenos</option>
            <option value="4">Diagnóstico Electrónico</option>
            <option value="5">Mantenimiento Preventivo</option>
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
