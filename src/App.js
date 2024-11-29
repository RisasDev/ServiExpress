import React from "react";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import ServicioList from "./components/ServicioList";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import Profile from "./components/Profile";
import Reservas from "./components/Reservas";
import ReservaForm from "./components/ReservaForm";
import { AuthProvider } from "./components/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
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
                        En{" "}
                        <span className="font-semibold text-blue-600">
                          SERVIEXPRESS
                        </span>
                        , nos dedicamos a brindar el mejor servicio de
                        mantenimiento y reparación de vehículos.
                      </p>
                    </div>
                  </section>
                  <ServicioList />
                </>
              }
            />

            {/* Ruta pública de login */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Ruta privadas */}
            <Route
              path="/dashboard"
              element={<PrivateRoute element={Dashboard} />}
            />
            <Route
              path="/dashboard/reservas"
              element={<PrivateRoute element={Reservas} />}
            />
            <Route
              path="/profile"
              element={<PrivateRoute element={Profile} />}
            />
            <Route
              path="/reservas/nueva"
              element={<PrivateRoute element={ReservaForm} />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
