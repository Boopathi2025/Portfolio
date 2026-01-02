import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroEditor from './editors/HeroEditor';
import AboutEditor from './editors/AboutEditor';
import ProjectsEditor from './editors/ProjectsEditor';
import SkillsEditor from './editors/SkillsEditor';
import LogsEditor from './editors/LogsEditor';

export default function Dashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'hero': return <HeroEditor />;
            case 'about': return <AboutEditor />;
            case 'projects': return <ProjectsEditor />;
            case 'skills': return <SkillsEditor />;
            case 'logs': return <LogsEditor />;
            default: return <div>
                <h3>Welcome to your Portfolio Admin</h3>
                <p>Use the sidebar to manage your content.</p>
            </div>;
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside style={{
                width: '250px',
                backgroundColor: 'var(--bg-secondary)',
                padding: '1rem',
                borderRight: '1px solid var(--border-color)'
            }}>
                <h3 style={{ marginBottom: '2rem' }}>Dashboard</h3>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <button onClick={() => setActiveTab('overview')} style={navBtnStyle(activeTab === 'overview')}>Overview</button>
                    <button onClick={() => setActiveTab('hero')} style={navBtnStyle(activeTab === 'hero')}>Hero Section</button>
                    <button onClick={() => setActiveTab('about')} style={navBtnStyle(activeTab === 'about')}>About Me</button>
                    <button onClick={() => setActiveTab('projects')} style={navBtnStyle(activeTab === 'projects')}>Projects</button>
                    <button onClick={() => setActiveTab('skills')} style={navBtnStyle(activeTab === 'skills')}>Skills</button>
                    <button onClick={() => setActiveTab('logs')} style={navBtnStyle(activeTab === 'logs')}>Daily Logs</button>
                    <hr style={{ width: '100%', borderColor: 'var(--border-color)' }} />
                    <button onClick={handleLogout} style={{ ...navBtnStyle(false), color: 'red' }}>Logout</button>
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem' }}>
                <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Editor</h2>
                <div style={{
                    padding: '1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    minHeight: '400px'
                }}>
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}

const navBtnStyle = (active) => ({
    padding: '0.75rem',
    textAlign: 'left',
    backgroundColor: active ? 'var(--accent)' : 'transparent',
    color: active ? '#fff' : 'var(--text-secondary)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    transition: 'all 0.2s'
});
