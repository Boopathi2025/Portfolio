const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const api = {
    // Auth
    login: async (username, password) => {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Login failed');
        }
        return res.json();
    },

    // Generic Fetch Wrapper
    request: async (endpoint, options = {}) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers
        };

        const res = await fetch(`${API_BASE}/content${endpoint}`, {
            ...options,
            headers
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'API request failed');
        }
        return res.json();
    }
};
