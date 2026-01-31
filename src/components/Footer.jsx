import './Footer.css'
import { siteConfig } from '../config'

function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear()
  const GA_ID = import.meta.env.VITE_GA_ID || ''

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>{siteConfig.business.name}</h3>
          <p>Your trusted taxi service in Hermanus</p>
          <p style={{marginTop:8}}>{siteConfig.business.address}</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home" onClick={(e) => { e.preventDefault(); onNavigate?.('home') }} aria-label="Footer link: Home">Home</a></li>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); onNavigate?.('home') }} aria-label="Footer link: Services">Services</a></li>
            <li><a href="#activities" onClick={(e) => { e.preventDefault(); onNavigate?.('activities') }} aria-label="Footer link: Activities">Activities</a></li>
            <li><a href="#booking" onClick={(e) => { e.preventDefault(); onNavigate?.('booking') }} aria-label="Footer link: Booking">Booking</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate?.('contact') }} aria-label="Footer link: Contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>📞 <a href="tel:+27647997924">+27 64 799 7924</a></p>
          <p>✉️ <a href="mailto:info@dialadriverhermanus.co.za">info@dialadriverhermanus.co.za</a></p>
          <p>💬 <a href="https://wa.me/27647997924?text=Hello%20Dial%20a%20Driver%20Hermanus%2C%20I%27d%20like%20to%20book%20a%20ride" target="_blank" rel="noreferrer">Message on WhatsApp</a></p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a href={siteConfig.social.twitter} target="_blank" rel="noreferrer">Twitter</a>
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} Dial a Driver Hermanus. All rights reserved.</p>
        <p className="analytics-status">Analytics: {GA_ID ? 'Enabled' : 'Disabled'}</p>
      </div>
    </footer>
  )
}

export default Footer
