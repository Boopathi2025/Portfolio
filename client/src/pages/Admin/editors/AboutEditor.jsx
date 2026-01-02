import { useState, useEffect } from 'react';
import { api } from '../../../api';

export default function AboutEditor() {
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        api.request('/about').then(data => {
            if (data && data.content) setContent(data.content);
        }).catch(console.error);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Saving...');
        try {
            await api.request('/about', {
                method: 'PUT',
                body: JSON.stringify({ content })
            });
            setStatus('Saved!');
            setTimeout(() => setStatus(''), 2000);
        } catch (err) {
            setStatus('Error: ' + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
            <label>About Content (Markdown/HTML supported)</label>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                    width: '100%',
                    minHeight: '200px',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'monospace'
                }}
            />
            <button type="submit" style={{
                padding: '0.75rem',
                backgroundColor: 'var(--accent)',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                width: 'fit-content'
            }}>Save Changes</button>
            {status && <p>{status}</p>}
        </form>
    );
}
