import React from "react";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import ServiceList from "./components/ServiceList";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard"; // Asegúrate de tener este componente
import PrivateRoute from "./routes/PrivateRoute"; // Importamos el PrivateRoute
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Carousel />
                <section className="py-8 bg-white text-center">
                  <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-blue-600 mb-4">
                      Bienvenidos a SERVIEXPRESS
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      En <span className="font-semibold text-blue-600">SERVIEXPRESS</span>
                      , nos dedicamos a brindar el mejor servicio de mantenimiento y
                      reparación de vehículos.
                    </p>
                  </div>
                </section>
                <ServiceList />
                <Contact />
              </>
            }
          />

          {/* Ruta pública de login */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Ruta privada para el Dashboard */}
          <Route
            path="/dashboard"
            element={<PrivateRoute element={Dashboard} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
