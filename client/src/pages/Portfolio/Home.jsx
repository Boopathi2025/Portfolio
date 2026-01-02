import Hero from '../../components/Portfolio/Hero';
import About from '../../components/Portfolio/About';
import Projects from '../../components/Portfolio/Projects';
import Skills from '../../components/Portfolio/Skills';
import Logs from '../../components/Portfolio/Logs';

export default function Home() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Logs />

            <footer style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)' }}>
                <p>&copy; {new Date().getFullYear()} Portfolio. Built with React & Express.</p>
                <a href="/admin/login" style={{ fontSize: '0.8rem', opacity: 0.5 }}>Admin Login</a>
            </footer>
        </div>
    );
}
