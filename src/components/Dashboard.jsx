import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaTools, FaMoneyBillAlt, FaUserTie, FaFileAlt, FaBox, FaUsersCog } from 'react-icons/fa';

const Dashboard = () => {
  const options = [
    { name: 'Reservas', path: '/dashboard/reservas', icon: <FaCalendarAlt className="text-3xl text-blue-600 mb-2" /> },
    { name: 'Proveedores', path: '/dashboard/proveedores', icon: <FaUsers className="text-3xl text-blue-600 mb-2" /> },
    { name: 'Servicios', path: '/dashboard/servicios', icon: <FaTools className="text-3xl text-blue-600 mb-2" /> },
    { name: 'Facturas', path: '/dashboard/facturas', icon: <FaMoneyBillAlt className="text-3xl text-blue-600 mb-2" /> },
    { name: 'Empleados', path: '/dashboard/empleados', icon: <FaUserTie className="text-3xl text-blue-600 mb-2" /> },
    { name: 'Informe', path: '/dashboard/informe', icon: <FaFileAlt className="text-3xl text-blue-600 mb-2" /> },
    { name: 'Productos', path: '/dashboard/productos', icon: <FaBox className="text-3xl text-blue-600 mb-2" /> },
    { name: 'Usuarios', path: '/dashboard/usuarios', icon: <FaUsersCog className="text-3xl text-blue-600 mb-2" /> },
  ];

  return (
    <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {options.map((option) => (
          <Link
            key={option.name}
            to={option.path}
            className="block p-6 bg-white shadow-lg rounded-lg text-center hover:bg-blue-100 transition-transform transform hover:scale-105"
          >
            <div className="flex flex-col items-center">
              <div className="text-blue-600">{option.icon}</div>
              <h2 className="text-xl font-semibold text-blue-600 mt-2">{option.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
