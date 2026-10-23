import { useState } from 'react'
import About from './components/About'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Preloader from './components/Preloader'
import ServiceSection from './components/ServiceSection'
import Projects from './components/Projects'
import Skills from './components/Skills'
import TechStack from './components/TechStack'
import Education from './components/Education'
import Leadership from './components/Leadership'
import Certifications from './components/Certifications'
import Navigation from './components/Navigation'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      {!loading && <Navigation />}
      {!loading && <ScrollProgress />}

      <main className={`portfolio-shell ${loading ? 'overflow-hidden' : ''}`}>
        <Hero />
        <About />
        <TechStack />
        <ServiceSection />
        <Projects />
        <Skills />
        <Education />
        <Leadership />
        <Certifications />
        <Footer />
      </main>
    </>
  )
}
