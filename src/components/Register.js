import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rut, setRut] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el refresco de la página

        const payload = {
            username,
            email,
            password,
            rut,
            nombre,
            apellido,
            telefono,
            direccion,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/user/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setError('');
                setSuccess('Registro exitoso');
                alert('Registro exitoso');
                navigate('/login'); // Redirige a la página de login después de registrarse
            } 
            else {
                const data = await response.json();
                setError(data.error || 'Hubo un problema al registrar el usuario.');
            }
        } catch (error) {
            setError('Ocurrió un error. Intenta más tarde.');
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
            marginTop: '50px',
        }}>
            <h2 style={{ textAlign: 'center', color: '#007bff' }}>Registrarse</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
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
                            color: '#333',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="email" style={{ display: 'block', color: '#333' }}>Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.5rem',
                            margin: '0.5rem 0',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            backgroundColor: '#f9f9f9',
                            color: '#333',
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
                            color: '#333',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="rut" style={{ display: 'block', color: '#333' }}>RUT</label>
                    <input
                        id="rut"
                        type="text"
                        value={rut}
                        onChange={(e) => setRut(e.target.value)}
                        required
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.5rem',
                            margin: '0.5rem 0',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            backgroundColor: '#f9f9f9',
                            color: '#333',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="nombre" style={{ display: 'block', color: '#333' }}>Nombre</label>
                    <input
                        id="nombre"
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.5rem',
                            margin: '0.5rem 0',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            backgroundColor: '#f9f9f9',
                            color: '#333',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="apellido" style={{ display: 'block', color: '#333' }}>Apellido</label>
                    <input
                        id="apellido"
                        type="text"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.5rem',
                            margin: '0.5rem 0',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            backgroundColor: '#f9f9f9',
                            color: '#333',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="telefono" style={{ display: 'block', color: '#333' }}>Teléfono</label>
                    <input
                        id="telefono"
                        type="text"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.5rem',
                            margin: '0.5rem 0',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            backgroundColor: '#f9f9f9',
                            color: '#333',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="direccion" style={{ display: 'block', color: '#333' }}>Dirección</label>
                    <input
                        id="direccion"
                        type="text"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        required
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.5rem',
                            margin: '0.5rem 0',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            backgroundColor: '#f9f9f9',
                            color: '#333',
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#ffcc00', // Amarillo
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        width: '100%',
                        transition: 'background-color 0.3s',
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f7b700'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#ffcc00'}
                >
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default Register;
