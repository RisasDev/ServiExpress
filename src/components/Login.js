import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/user/login/', { // Usa tu endpoint personalizado
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();

                // Guarda los tokens en el almacenamiento local
                localStorage.setItem('access', data.access);
                localStorage.setItem('refresh', data.refresh);

                setError('');
                alert('Login exitoso');
                navigate('/dashboard');
            } else {
                setError('Credenciales inválidas. Por favor, intenta nuevamente.');
            }
        } catch (error) {
            setError('Ocurrió un error. Intenta más tarde.');
            console.error("Error durante el login:", error);
        }
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: 'auto',
            padding: '1rem',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginTop: '50px'
        }}>
            <h2 style={{ textAlign: 'center', color: '#007bff' }}>Iniciar Sesión</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={handleLoginSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="username" style={{ display: 'block', color: '#333' }}>Nombre de Usuario</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.5rem',
                            margin: '0.5rem 0',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            backgroundColor: '#f9f9f9',
                            color: '#333'
                        }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="password" style={{ display: 'block', color: '#333' }}>Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.5rem',
                            margin: '0.5rem 0',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            backgroundColor: '#f9f9f9',
                            color: '#333'
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#ffcc00',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        width: '100%',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f7b700'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#ffcc00'}
                >
                    Iniciar Sesión
                </button>
            </form>
            <p style={{ textAlign: 'center' }}>
                ¿No tienes cuenta?{' '}
                <span
                    onClick={() => navigate('/register')} // Redirige a la página de registro
                    style={{ cursor: 'pointer', color: 'blue' }}
                >
                    Regístrate aquí
                </span>
            </p>
        </div>
    );
};

export default Login;
