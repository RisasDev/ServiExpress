import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const options = [
    { name: 'Reservas', path: '/dashboard/reservas' },
    { name: 'Proveedores', path: '/dashboard/proveedores' },
    { name: 'Servicios', path: '/dashboard/servicios' },
    { name: 'Facturas', path: '/dashboard/facturas' },
    { name: 'Empleados', path: '/dashboard/empleados' },
    { name: 'Informe', path: '/dashboard/informe' },
    { name: 'Productos', path: '/dashboard/productos' },
  ];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {options.map((option) => (
          <Link
            key={option.name}
            to={option.path}
            className="block p-6 bg-white shadow-lg rounded-lg text-center hover:bg-blue-100"
          >
            <h2 className="text-xl font-semibold text-blue-600">{option.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
