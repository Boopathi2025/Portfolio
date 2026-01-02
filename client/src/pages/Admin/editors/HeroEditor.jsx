import { useState, useEffect } from 'react';
import { api } from '../../../api';

export default function HeroEditor() {
    const [formData, setFormData] = useState({ title: '', subtitle: '', image_url: '' });
    const [status, setStatus] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await api.request('/hero');
            if (data && data.title) setFormData(data);
        } catch (err) {
            console.error('Failed to load hero data', err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Saving...');
        try {
            await api.request('/hero', {
                method: 'PUT',
                body: JSON.stringify(formData)
            });
            setStatus('Saved successfully!');
            setTimeout(() => setStatus(''), 2000);
        } catch (err) {
            setStatus('Error: ' + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
            <div>
                <label>Title</label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </div>
            <div>
                <label>Subtitle</label>
                <input
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </div>
            <div>
                <label>Image URL</label>
                <input
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </div>
            <button type="submit" style={btnStyle}>Save Changes</button>
            {status && <p>{status}</p>}
        </form>
    );
}

const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    marginTop: '0.5rem',
    borderRadius: '4px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)'
};

const btnStyle = {
    padding: '0.75rem',
    backgroundColor: 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: 'fit-content'
};
