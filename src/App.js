import React from 'react';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import ServiceList from './components/ServiceList';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Carousel />
      
      {/* Descripción del Taller */}
      <section className="py-8 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Bienvenidos a SERVIEXPRESS</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            En <span className="font-semibold text-blue-600">SERVIEXPRESS</span>, nos dedicamos a brindar el mejor 
            servicio de mantenimiento y reparación de vehículos. Con un equipo de expertos en mecánica, 
            ofrecemos soluciones rápidas, confiables y de alta calidad para que tu auto siempre esté en 
            óptimas condiciones. ¡Confía en nosotros para el cuidado y rendimiento de tu vehículo!
          </p>
        </div>
      </section>
      
      <ServiceList />
      <Contact />
    </div>
  );
}

export default App;
