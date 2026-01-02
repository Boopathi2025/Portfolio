import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import '../../styles/variables.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { token } = await api.login(username, password);
            localStorage.setItem('token', token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'var(--bg-primary)'
        }}>
            <form onSubmit={handleSubmit} style={{
                padding: '2rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '8px',
                width: '100%',
                maxWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <h2 style={{ margin: 0, textAlign: 'center' }}>Admin Login</h2>
                {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #333' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #333' }}
                />

                <button type="submit" style={{
                    padding: '0.5rem',
                    backgroundColor: 'var(--accent)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}>Login</button>
            </form>
        </div>
    );
}
