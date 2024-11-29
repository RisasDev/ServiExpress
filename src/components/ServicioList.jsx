import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

function ServiceList() {
  // Lista de servicios con imágenes
  const services = [
    { 
      id: 1, 
      name: 'Cambio de Aceite', 
      description: 'Cambio de aceite para el motor, manteniendo el rendimiento óptimo de tu vehículo.', 
      price: 30, 
      imageUrl: 'https://ruizhealytimes.com/wp-content/uploads/2015/04/cambio-aceite-scaled.jpg' 
    },
    { 
      id: 2, 
      name: 'Alineación y Balanceo', 
      description: 'Servicio completo de alineación y balanceo de llantas para un viaje seguro.', 
      price: 50, 
      imageUrl: 'https://neumax.cl/wp-content/uploads/2020/11/alineacion.jpg' 
    },
    { 
      id: 3, 
      name: 'Revisión de Frenos', 
      description: 'Inspección y ajuste de frenos para mayor seguridad en el camino.', 
      price: 40, 
      imageUrl: 'https://dercocenter-api.s3.us-east-1.amazonaws.com/images/contents/2022-04-05-frenos.jpg' 
    },
    { 
      id: 4, 
      name: 'Diagnóstico Electrónico', 
      description: 'Diagnóstico completo del sistema electrónico del vehículo para detectar problemas.', 
      price: 60, 
      imageUrl: 'https://autosoporte.com/wp-content/uploads/2021/03/car-electrical-system-repair-1.jpg' 
    },
    { 
      id: 5, 
      name: 'Mantenimiento Preventivo', 
      description: 'Servicio de mantenimiento general para prolongar la vida útil de tu vehículo.', 
      price: 100, 
      imageUrl: 'https://sergioescobar.cl/wp-content/uploads/2022/10/Shutterstock_517994266-min.jpg' 
    },
  ];

  // Hook para la navegación
  const navigate = useNavigate();

  // Obtenemos el estado de autenticación desde AuthContext
  const { isAuthenticated } = useContext(AuthContext);

  const handleRequestService = (service) => {
    if (isAuthenticated) {
      // Si está autenticado, redirigir a la página de reserva con los detalles del servicio
      navigate(`/reservas/nueva?serviceId=${service.id}`);
    } else {
      // Si no está autenticado, redirigir al login
      navigate('/login');
    }
  };

  return (
    <section className="p-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Nuestros Servicios</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
            <img src={service.imageUrl} alt={service.name} className="w-full h-40 object-cover"/>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-2">{service.description}</p>
              <p className="text-indigo-600 font-bold text-lg">Precio: ${service.price}</p>
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
