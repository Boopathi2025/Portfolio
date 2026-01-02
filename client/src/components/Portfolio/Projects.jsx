import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.request('/projects').then(setProjects).catch(console.error);
    }, []);

    return (
        <section style={{ padding: '4rem 2rem', backgroundColor: 'var(--bg-secondary)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{ color: 'var(--accent)', marginBottom: '3rem' }}>Featured Projects</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {projects.map(p => (
                        <a href={p.link} key={p.id} target="_blank" rel="noopener noreferrer" style={cardStyle}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>{p.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', flex: 1 }}>{p.description}</p>
                            <div style={{ fontSize: '0.9rem', color: 'var(--accent)' }}>{p.tech_stack}</div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

const cardStyle = {
    backgroundColor: 'var(--bg-primary)',
    padding: '2rem',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden'
};
