import React, { useState, useContext } from "react"; // Asegúrate de que useContext esté aquí
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext"; // Importa el contexto

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useContext(AuthContext); // Incluye setUser

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);

        // Obtén la información del usuario
        const userResponse = await fetch(
          "http://127.0.0.1:8000/api/user/me/",
          {
            headers: {
              Authorization: `Bearer ${data.access}`,
            },
          }
        );

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData); // Guarda la información del usuario
        }

        setError("");
        setSuccess("Inicio de sesión exitoso");
        setIsAuthenticated(true); // Actualiza el estado global

        setTimeout(() => navigate("/"), 1000);
      } else {
        setError("Credenciales inválidas.");
      }
    } catch (error) {
      setError("Ocurrió un error. Intenta más tarde.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Iniciar Sesión
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      <form onSubmit={handleLoginSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Nombre de Usuario
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600"
        >
          Iniciar Sesión
        </button>
      </form>
      <p className="text-center mt-4">
        ¿No tienes cuenta?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Regístrate aquí
        </span>
      </p>
    </div>
  );
};

export default Login;
