import Navbar from './components/layout/Navbar'
import Hero from './components/layout/Hero'
import AboutSection from './components/sections/AboutSection'
import ProjectsSection from './components/sections/ProjectsSection'
import SkillsSection from './components/sections/SkillsSection'
import ContactSection from './components/sections/ContactSection'
import Footer from './components/layout/Footer'
import SeoManager from './components/seo/SeoManager'
import { SelectionProvider } from './context/SelectionContext'

function App() {
  return (
    <SelectionProvider>
      <SeoManager />
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </SelectionProvider>
  )
}

export default App
