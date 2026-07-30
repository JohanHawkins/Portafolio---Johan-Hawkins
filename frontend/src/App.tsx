import Navbar from './components/layout/Navbar'
import Hero from './components/layout/Hero'
import AboutSection from './components/sections/AboutSection'
import ProjectsSection from './components/sections/ProjectsSection'
import SkillsSection from './components/sections/SkillsSection'
import ContactSection from './components/sections/ContactSection'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default App
