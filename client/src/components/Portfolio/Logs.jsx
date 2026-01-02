import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function Logs() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        api.request('/logs').then(setLogs).catch(console.error);
    }, []);

    if (logs.length === 0) return null;

    return (
        <section style={{ padding: '4rem 2rem', backgroundColor: 'var(--bg-secondary)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ color: 'var(--accent)', marginBottom: '3rem' }}>Daily Updates</h2>
                <div style={{ borderLeft: '2px solid var(--border-color)', paddingLeft: '2rem' }}>
                    {logs.map(log => (
                        <div key={log.id} style={{ marginBottom: '3rem', position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                left: '-2.4rem',
                                top: '0.3rem',
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--accent)',
                                boxShadow: '0 0 10px var(--accent-glow)'
                            }} />
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                {new Date(log.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                            </div>
                            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-primary)' }}>{log.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{log.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
