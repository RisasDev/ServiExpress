import React from 'react';

function Contact() {
  return (
    <section className="bg-gray-100 p-4 mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">Contáctanos</h2>
      <form className="space-y-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Nombre"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Mensaje"
          className="w-full p-2 border rounded"
          rows="4"
        ></textarea>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Enviar Mensaje
        </button>
      </form>
    </section>
  );
}

export default Contact;