import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ProtectedRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Optional: Verify token with backend if needed, for now just check existence
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    if (loading) return <div>Loading...</div>;

    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
