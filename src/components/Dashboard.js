import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "../services/api";

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await fetchCurrentUser();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <h2>Bienvenido al Dashboard, {user.nombre} {user.apellido}!</h2>
            <p>Usuario: {user.username}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default Dashboard;