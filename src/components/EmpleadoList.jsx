import React, { useEffect, useState } from 'react';

const EmpleadoList = () => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const fetchEmpleados = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/empleados/');
      const data = await response.json();
      setEmpleados(data);
    };

    fetchEmpleados();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Lista de Empleados</h2>
      <ul>
        {empleados.map((empleado) => (
          <li
            key={empleado.id}
            className="p-4 mb-2 border border-gray-200 rounded-lg hover:bg-gray-100"
          >
            <h3 className="font-semibold">{empleado.nombre}</h3>
            <p className="text-sm text-gray-600">{empleado.rubro}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmpleadoList;
