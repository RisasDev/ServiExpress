import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          SERVIEXPRESS
        </div>

        {/* Botón de Menú para Móvil */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Menú de Navegación */}
        <div className={`md:flex md:items-center ${isOpen ? "block" : "hidden"} w-full md:w-auto`}>
          <ul className="flex flex-col md:flex-row md:space-x-8">
            <li>
              <a href="#inicio" className="block py-2 px-4 hover:bg-blue-700 rounded">
                Inicio
              </a>
            </li>
            <li>
              <a href="#servicios" className="block py-2 px-4 hover:bg-blue-700 rounded">
                Servicios
              </a>
            </li>
            <li>
              <a href="#nosotros" className="block py-2 px-4 hover:bg-blue-700 rounded">
                Nosotros
              </a>
            </li>
            <li>
              <a href="#contacto" className="block py-2 px-4 hover:bg-blue-700 rounded">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        {/* Botón de Iniciar Sesión */}
        <div className="hidden md:block">
          <a 
            href="#login"
            className="ml-4 py-2 px-4 bg-white text-blue-600 font-semibold rounded hover:bg-gray-200 transition duration-300"
          >
            Iniciar Sesión
          </a>
        </div>
      </div>

      {/* Botón de Iniciar Sesión en el Menú Móvil */}
      {isOpen && (
        <div className="md:hidden text-center mt-2">
          <a 
            href="#login"
            className="block py-2 px-4 bg-white text-blue-600 font-semibold rounded hover:bg-gray-200 transition duration-300"
          >
            Iniciar Sesión
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
