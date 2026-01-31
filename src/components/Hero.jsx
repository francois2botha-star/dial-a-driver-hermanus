import './Hero.css'
import Carousel from './Carousel'

function Hero({ onNavigate }) {
  return (
    <section className="hero" role="banner">
      <div className="hero-content">
        <h1>Premium Chauffeur & Shuttle Services in Hermanus</h1>
        <p className="hero-tagline">Professional 24/7 Transportation Excellence - Airport Transfers, Tours & Local Travel</p>
        <div className="hero-buttons">
          <button className="cta-btn primary" onClick={() => onNavigate?.('booking')}>Reserve Your Chauffeur</button>
        </div>
      </div>
      <Carousel />
      <div className="hero-background"></div>
    </section>
  )
}

export default Hero
