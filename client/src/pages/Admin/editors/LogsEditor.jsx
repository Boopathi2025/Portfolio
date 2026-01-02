import { useState, useEffect } from 'react';
import { api } from '../../../api';

export default function LogsEditor() {
    const [logs, setLogs] = useState([]);
    const [editing, setEditing] = useState(null);

    useEffect(() => { loadLogs(); }, []);

    const loadLogs = () => api.request('/logs').then(setLogs).catch(console.error);

    const handleDelete = async (id) => {
        if (!confirm('Delete log?')) return;
        await api.request(`/logs/${id}`, { method: 'DELETE' });
        loadLogs();
    };

    return (
        <div>
            {!editing ? (
                <div>
                    <button onClick={() => setEditing({ title: '', content: '' })} style={btnStyle}>+ New Log Entry</button>
                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {logs.map(log => (
                            <div key={log.id} style={itemStyle}>
                                <div>
                                    <strong>{log.title}</strong>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                        {new Date(log.date).toLocaleString()}
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => setEditing(log)} style={actionBtnStyle}>Edit</button>
                                    <button onClick={() => handleDelete(log.id)} style={{ ...actionBtnStyle, color: '#ef4444' }}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <LogForm initialData={editing} onCancel={() => setEditing(null)} onSave={() => { setEditing(null); loadLogs(); }} />
            )}
        </div>
    );
}

function LogForm({ initialData, onCancel, onSave }) {
    const [formData, setFormData] = useState(initialData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isNew = !formData.id;
        const endpoint = isNew ? '/logs' : `/logs/${formData.id}`;
        const method = isNew ? 'POST' : 'PUT';
        await api.request(endpoint, { method, body: JSON.stringify(formData) });
        onSave();
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
            <input
                placeholder="Log Title"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                style={inputStyle}
                required
            />
            <textarea
                placeholder="content..."
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                style={{ ...inputStyle, minHeight: '200px' }}
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" style={btnStyle}>Publish</button>
                <button type="button" onClick={onCancel} style={{ ...btnStyle, backgroundColor: 'transparent', border: '1px solid var(--border-color)' }}>Cancel</button>
            </div>
        </form>
    );
}

const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)'
};

const btnStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

const actionBtnStyle = {
    padding: '0.25rem 0.5rem',
    marginLeft: '0.5rem',
    backgroundColor: 'transparent',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    borderRadius: '4px',
    cursor: 'pointer'
};

const itemStyle = {
    padding: '1rem',
    backgroundColor: 'var(--bg-primary)',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};
