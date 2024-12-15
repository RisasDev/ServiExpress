import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ServicioForm = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [urlImagen, setUrlImagen] = useState(""); // Campo para la URL de la imagen
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoServicio = {
      nombre,
      descripcion,
      precio,
      url: urlImagen, // Incluye la URL de la imagen en el objeto del servicio
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/servicios/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoServicio),
      });

      if (!response.ok) throw new Error("Error al crear el servicio");
      setMensaje("Servicio creado exitosamente");

      setTimeout(() => {
        navigate("/dashboard/servicios");
      }, 1000);
    } catch (err) {
      setMensaje("Hubo un error al crear el servicio");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Servicio</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Descripción:
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Precio:</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">URL de Imagen:</label>
          <input
            type="url"
            value={urlImagen}
            onChange={(e) => setUrlImagen(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="URL de la imagen"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition-colors duration-200"
          >
            Crear Servicio
          </button>
        </div>
        {mensaje && (
          <p
            className={`text-center mt-4 ${
              mensaje.includes("exitosamente")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {mensaje}
          </p>
        )}
      </form>
    </div>
  );
};

export default ServicioForm;
