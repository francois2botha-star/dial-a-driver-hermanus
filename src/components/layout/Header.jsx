import '../Header.css'
import logo from '../../assets/logo-bird.png'

function Header({ onNavigate, activeSection }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => onNavigate('home')} style={{cursor: 'pointer'}}>
          <img src={logo} alt="Dial a Driver logo" className="logo-img" loading="lazy" />
          <div className="logo-text">
            <h1>Dial a Driver</h1>
            <p className="location">Hermanus Tourism & Transportation</p>
          </div>
        </div>
        <nav className="nav" aria-label="Primary">
          <button aria-label="Go to Home" aria-current={activeSection === 'home' ? 'page' : undefined} className={"nav-btn " + (activeSection === 'home' ? 'active' : '')} onClick={() => onNavigate('home')}>Home</button>
          <button aria-label="View Attractions" aria-current={activeSection === 'activities' ? 'page' : undefined} className={"nav-btn " + (activeSection === 'activities' ? 'active' : '')} onClick={() => onNavigate('activities')}>Attractions</button>
          <button aria-label="View Fleet" aria-current={activeSection === 'vehicles' ? 'page' : undefined} className={"nav-btn " + (activeSection === 'vehicles' ? 'active' : '')} onClick={() => onNavigate('vehicles')}>Fleet</button>
          <button aria-label="Book a ride" aria-current={activeSection === 'booking' ? 'page' : undefined} className={"nav-btn " + (activeSection === 'booking' ? 'active' : '')} onClick={() => onNavigate('booking')}>Book Now</button>
          <button aria-label="Contact us" aria-current={activeSection === 'contact' ? 'page' : undefined} className={"nav-btn " + (activeSection === 'contact' ? 'active' : '')} onClick={() => onNavigate('contact')}>Contact</button>
        </nav>
        <div className="contact-info">
          <a href="tel:+27647997924" className="contact-btn phone">Call Now</a>
          <a
            href="https://wa.me/27647997924?text=Hello%20Dial%20a%20Driver%20Hermanus%2C%20I%27d%20like%20to%20book%20a%20ride"
            className="contact-btn whatsapp"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
