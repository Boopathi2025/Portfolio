import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Journey from './components/Journey/Journey'
import GitHubSection from './components/GitHubSection/GitHubSection'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <GitHubSection />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App