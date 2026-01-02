import { useState, useEffect } from 'react';
import { api } from '../../../api';

export default function SkillsEditor() {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState({ category: 'Frontend', name: '', level: 5 });

    useEffect(() => {
        loadSkills();
    }, []);

    const loadSkills = () => api.request('/skills').then(setSkills).catch(console.error);

    const handleAdd = async (e) => {
        e.preventDefault();
        await api.request('/skills', { method: 'POST', body: JSON.stringify(newSkill) });
        setNewSkill({ category: 'Frontend', name: '', level: 5 });
        loadSkills();
    };

    const handleDelete = async (id) => {
        await api.request(`/skills/${id}`, { method: 'DELETE' });
        loadSkills();
    };

    return (
        <div>
            <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <select
                    value={newSkill.category}
                    onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}
                    style={inputStyle}
                >
                    <option>Frontend</option>
                    <option>Backend</option>
                    <option>Tools</option>
                    <option>Other</option>
                </select>
                <input
                    placeholder="Skill Name"
                    value={newSkill.name}
                    onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                    style={inputStyle}
                    required
                />
                <input
                    type="number"
                    min="1" max="5"
                    value={newSkill.level}
                    onChange={e => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                    style={{ ...inputStyle, width: '60px' }}
                />
                <button type="submit" style={btnStyle}>Add</button>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {skills.map(s => (
                    <div key={s.id} style={{
                        padding: '1rem',
                        backgroundColor: 'var(--bg-primary)',
                        borderRadius: '4px',
                        border: '1px solid var(--border-color)',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => handleDelete(s.id)}
                            style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                        >x</button>
                        <strong>{s.name}</strong>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{s.category} • Lvl {s.level}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const inputStyle = {
    padding: '0.5rem',
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
    cursor: 'pointer'
};
