import React from 'react';

function ServiceList() {
  // Lista de servicios con imágenes
  const services = [
    { 
      id: 1, 
      name: 'Cambio de Aceite', 
      description: 'Cambio de aceite para el motor, manteniendo el rendimiento óptimo de tu vehículo.', 
      price: 30, 
      imageUrl: 'https://via.placeholder.com/150/FFBF00/000000?text=Cambio+de+Aceite' 
    },
    { 
      id: 2, 
      name: 'Alineación y Balanceo', 
      description: 'Servicio completo de alineación y balanceo de llantas para un viaje seguro.', 
      price: 50, 
      imageUrl: 'https://via.placeholder.com/150/00BFFF/000000?text=Alineación+y+Balanceo' 
    },
    { 
      id: 3, 
      name: 'Revisión de Frenos', 
      description: 'Inspección y ajuste de frenos para mayor seguridad en el camino.', 
      price: 40, 
      imageUrl: 'https://via.placeholder.com/150/DC143C/FFFFFF?text=Revisión+de+Frenos' 
    },
    { 
      id: 4, 
      name: 'Diagnóstico Electrónico', 
      description: 'Diagnóstico completo del sistema electrónico del vehículo para detectar problemas.', 
      price: 60, 
      imageUrl: 'https://via.placeholder.com/150/8A2BE2/FFFFFF?text=Diagnóstico+Electrónico' 
    },
    { 
      id: 5, 
      name: 'Mantenimiento Preventivo', 
      description: 'Servicio de mantenimiento general para prolongar la vida útil de tu vehículo.', 
      price: 100, 
      imageUrl: 'https://via.placeholder.com/150/3CB371/FFFFFF?text=Mantenimiento+Preventivo' 
    },
  ];

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
              <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">
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
