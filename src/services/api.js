export const fetchCurrentUser = async () => {
    const token = localStorage.getItem("access");

    try {
        const response = await fetch("http://127.0.0.1:8000/api/user/current/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 401) {
            const refreshToken = localStorage.getItem("refresh");
            const newAccessToken = await refreshAccessToken(refreshToken);

            localStorage.setItem("access", newAccessToken);

            return await fetchCurrentUser();
        }

        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

export const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) {
            throw new Error("Failed to refresh token");
        }

        const data = await response.json();
        return data.access;
    } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
    }
};
