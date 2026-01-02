import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function About() {
    const [data, setData] = useState(null);

    useEffect(() => {
        api.request('/about').then(setData).catch(console.error);
    }, []);

    if (!data) return null;

    return (
        <section style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: 'var(--accent)', marginBottom: '2rem' }}>About Me</h2>
            <div style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                {data.content}
            </div>
        </section>
    );
}
