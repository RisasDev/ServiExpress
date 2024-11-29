import React, { useEffect, useState } from 'react';

const ProveedorList = () => {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    const fetchProveedores = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/proveedores/');
      const data = await response.json();
      setProveedores(data);
    };

    fetchProveedores();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Lista de Proveedores</h2>
      <ul>
        {proveedores.map((proveedor) => (
          <li
            key={proveedor.id}
            className="p-4 mb-2 border border-gray-200 rounded-lg hover:bg-gray-100"
          >
            <h3 className="font-semibold">{proveedor.nombre}</h3>
            <p className="text-sm text-gray-600">{proveedor.rubro}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProveedorList;
