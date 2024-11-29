import React, { useState } from 'react';

const FacturaForm = () => {
  const [formData, setFormData] = useState({
    cliente: '',
    servicio: '',
    monto: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/facturas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Factura creada exitosamente');
      } else {
        alert('Error al crear la factura');
      }
    } catch (error) {
      console.error(error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Registrar Factura</h2>
      <div className="mb-4">
        <label className="block text-sm font-semibold">Cliente</label>
        <input
          type="text"
          name="cliente"
          value={formData.cliente}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          placeholder="Nombre del Cliente"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">Servicio</label>
        <input
          type="text"
          name="servicio"
          value={formData.servicio}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          placeholder="Servicio Realizado"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">Monto</label>
        <input
          type="number"
          name="monto"
          value={formData.monto}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          placeholder="Monto de la Factura"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
      >
        Registrar Factura
      </button>
    </form>
  );
};

export default FacturaForm;
