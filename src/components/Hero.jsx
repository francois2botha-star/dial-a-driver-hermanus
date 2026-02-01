import './Hero.css'
import Carousel from './Carousel'
import heroImage from '../assets/hermanus/walker-bay-sunset.jpg'

function Hero({ onNavigate }) {
  return (
    <>
      <section 
        className="hero" 
        role="banner"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 20, 25, 0.7), rgba(26, 31, 46, 0.7)), url(${heroImage})`
        }}
      >
        <div className="hero-content">
          <h1>Premium Chauffeur & Shuttle Services in Hermanus</h1>
          <p className="hero-tagline">Professional 24/7 Transportation Excellence - Airport Transfers, Tours & Local Travel</p>
          <div className="hero-buttons">
            <button className="cta-btn primary" onClick={() => onNavigate?.('booking')}>Reserve Your Chauffeur</button>
            <a className="cta-btn secondary" href="tel:+27647997924">Call Now</a>
            <a
              className="cta-btn whatsapp"
              href="https://wa.me/27647997924?text=Hello%20Dial%20a%20Driver%20Hermanus%2C%20I%27d%20like%20to%20book%20a%20ride"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
        <div className="hero-background"></div>
      </section>
      <Carousel />
    </>
  )
}

export default Hero
