import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

function ServiceList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hook para la navegación
  const navigate = useNavigate();

  // Obtenemos el estado de autenticación desde AuthContext
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/servicios/");
        if (!response.ok) throw new Error("Error al obtener los servicios");
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleRequestService = (service) => {
    if (isAuthenticated) {
      // Si está autenticado, redirigir a la página de reserva con los detalles del servicio
      navigate(`/reservas/nueva?serviceId=${service.id}`);
    } else {
      // Si no está autenticado, redirigir al login
      navigate('/login');
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Cargando servicios...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <section className="p-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Nuestros Servicios</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
            <img src={service.url} alt={service.nombre} className="w-full h-40 object-cover"/>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.nombre}</h3>
              <p className="text-gray-600 mb-2">{service.descripcion}</p>
              <p className="text-indigo-600 font-bold text-lg">Precio: ${service.precio}</p>
              <button 
                onClick={() => handleRequestService(service)} 
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
              >
                Solicitar Servicio
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServiceList;
