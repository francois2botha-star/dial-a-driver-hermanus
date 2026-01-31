import { useState, useEffect } from 'react'
import { logPageView } from './analytics'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import WhaleWatchingVideo from './components/WhaleWatchingVideo'
import CompanyOverview from './components/CompanyOverview'
import Booking from './components/Booking'
import About from './components/About'
import Reviews from './components/Reviews'
import Activities from './components/Activities'
import VehiclesGallery from './components/VehiclesGallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SocialFloatingButtons from './components/SocialFloatingButtons'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    // Initialize from hash if present
    const hash = window.location.hash.replace('#', '')
    if (hash) setActiveSection(hash)
    // respond to back/forward
    const onHash = () => {
      const h = window.location.hash.replace('#', '')
      if (h) setActiveSection(h)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    // Log a page view for analytics on section change (SPA)
    try {
      const path = '/' + (activeSection || 'home')
      logPageView(path)
    } catch (e) { }
  }, [activeSection])

  return (
    <div className="app">
      <SocialFloatingButtons />
      <main id="main-content">
      <Header onNavigate={(s) => { setActiveSection(s); window.location.hash = s }} activeSection={activeSection} />
      {activeSection === 'home' && (
        <>
          <Hero onNavigate={(s) => { setActiveSection(s); window.location.hash = s }} />
          <Services />
          <WhaleWatchingVideo />
          <CompanyOverview />
          <About />
          <Reviews />
        </>
      )}
      {activeSection === 'activities' && <Activities onNavigate={(s) => { setActiveSection(s); window.location.hash = s }} />}
      {activeSection === 'vehicles' && <VehiclesGallery />}
      {activeSection === 'booking' && <Booking onNavigate={(s) => { setActiveSection(s); window.location.hash = s }} />}
      {activeSection === 'contact' && <Contact onNavigate={(s) => { setActiveSection(s); window.location.hash = s }} />}
      <Footer onNavigate={(s) => { setActiveSection(s); window.location.hash = s }} />
      </main>
    </div>
  )
}

export default App
