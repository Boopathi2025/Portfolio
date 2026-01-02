import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function Hero() {
    const [data, setData] = useState(null);

    useEffect(() => {
        api.request('/hero').then(setData).catch(console.error);
    }, []);

    if (!data) return null;

    return (
        <section style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '2rem',
            background: 'radial-gradient(circle at center, #1e293b 0%, var(--bg-primary) 70%)'
        }}>
            <h1 style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: '900',
                background: 'linear-gradient(to right, #fff, var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1rem',
                lineHeight: 1.1
            }}>
                {data.title || 'Welcome'}
            </h1>
            <p style={{
                fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                color: 'var(--text-secondary)',
                maxWidth: '800px'
            }}>
                {data.subtitle}
            </p>
            {data.image_url && (
                <img src={data.image_url} alt="Hero" style={{
                    marginTop: '2rem',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '4px solid var(--accent)',
                    boxShadow: '0 0 20px var(--accent-glow)'
                }} />
            )}
        </section>
    );
}
