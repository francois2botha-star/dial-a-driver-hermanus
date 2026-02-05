import './Hero.css'
import Carousel from './Carousel'

function Hero({ onNavigate }) {
  return (
    <>
      <section className="hero" role="banner">
        <div className="hero-content">
          <h1>Premium Chauffeur & Shuttle Services in Hermanus</h1>
          <p className="hero-tagline">Professional 24/7 Transportation - Airport Transfers, Tours & Local Travel</p>
          <div className="hero-cta">
            <button className="hero-btn primary" onClick={() => onNavigate('booking')}>Book a Ride</button>
            <a href="tel:+27647997924" className="hero-btn secondary">Call +27 64 799 7924</a>
          </div>
        </div>
        <div className="hero-background"></div>
      </section>
      <Carousel />
    </>
  )
}

export default Hero
