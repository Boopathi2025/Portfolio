import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function Skills() {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        api.request('/skills').then(setSkills).catch(console.error);
    }, []);

    return (
        <section style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ color: 'var(--accent)', marginBottom: '2rem' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {skills.map(s => (
                    <div key={s.id} style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        {s.name}
                        <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: s.level >= 4 ? '#4ade80' : '#facc15'
                        }} />
                    </div>
                ))}
            </div>
        </section>
    );
}
