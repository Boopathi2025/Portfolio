import { useState, useEffect } from 'react';
import { api } from '../../../api';

export default function ProjectsEditor() {
    const [projects, setProjects] = useState([]);
    const [editing, setEditing] = useState(null); // null = list, {} = new, object = edit

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await api.request('/projects');
            setProjects(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return;
        await api.request(`/projects/${id}`, { method: 'DELETE' });
        loadProjects();
    };

    return (
        <div>
            {!editing ? (
                <div>
                    <button onClick={() => setEditing({ title: '', description: '', tech_stack: '', link: '', image_url: '' })} style={btnStyle}>
                        + Add Project
                    </button>
                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {projects.map(p => (
                            <div key={p.id} style={itemStyle}>
                                <div>
                                    <strong>{p.title}</strong>
                                    <p style={{ margin: '0.25rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{p.tech_stack}</p>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => setEditing(p)} style={actionBtnStyle}>Edit</button>
                                    <button onClick={() => handleDelete(p.id)} style={{ ...actionBtnStyle, backgroundColor: '#ef4444' }}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <ProjectForm
                    initialData={editing}
                    onCancel={() => setEditing(null)}
                    onSave={() => { setEditing(null); loadProjects(); }}
                />
            )}
        </div>
    );
}

function ProjectForm({ initialData, onCancel, onSave }) {
    const [formData, setFormData] = useState(initialData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isNew = !formData.id;
        const endpoint = isNew ? '/projects' : `/projects/${formData.id}`;
        const method = isNew ? 'POST' : 'PUT';

        await api.request(endpoint, {
            method,
            body: JSON.stringify(formData)
        });
        onSave();
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
            <input placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} style={inputStyle} required />
            <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} style={{ ...inputStyle, minHeight: '100px' }} />
            <input placeholder="Tech Stack (comma separated)" value={formData.tech_stack} onChange={e => setFormData({ ...formData, tech_stack: e.target.value })} style={inputStyle} />
            <input placeholder="Project Link" value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} style={inputStyle} />
            <input placeholder="Image URL" value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} style={inputStyle} />

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" style={btnStyle}>Save</button>
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
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
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
