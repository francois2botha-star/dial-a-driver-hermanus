import { memo } from 'react'
import './DriverProfiles.css'
import { drivers } from '../data/drivers'

const DriverCard = memo(({ driver }) => (
  <div className="driver-card">
    <div className="driver-avatar-large">{driver.image || '👨‍✈️'}</div>
    
    <h3 className="driver-name">{driver.name}</h3>

    <div className="driver-rating">
      <span className="stars">{'⭐'.repeat(Math.floor(driver.rating))}{driver.rating % 1 > 0 ? '✨' : ''}</span>
      <span className="rating-number">{driver.rating}</span>
    </div>

    <div className="driver-stats">
      <div className="stat">
        <span className="stat-number">{driver.trips}</span>
        <span className="stat-label">Trips</span>
      </div>
      <div className="stat">
        <span className="stat-number">100%</span>
        <span className="stat-label">Safe</span>
      </div>
    </div>

    {driver.experience && (
      <p className="driver-experience">
        <strong>{driver.experience}</strong> experience
      </p>
    )}

    <p className="driver-vehicle">
      <strong>Vehicle:</strong> {driver.vehicle}
    </p>

    {driver.badge && (
      <div className="driver-badge">{driver.badge}</div>
    )}

    <div className="specialties">
      {driver.specialties.map((specialty, idx) => (
        <span key={idx} className="specialty-badge">{specialty}</span>
      ))}
    </div>

    <button className="request-driver-btn">Request {driver.name}</button>
  </div>
))

DriverCard.displayName = 'DriverCard'

function DriverProfiles() {
  return (
    <section className="driver-profiles-section">
      <div className="container">
        <h2>Meet Our Drivers</h2>
        <p className="section-subtitle">Professional, vetted, and highly-rated chauffeurs</p>

        <div className="drivers-grid">
          {drivers.map(driver => (
            <DriverCard key={driver.id} driver={driver} />
          ))}
        </div>

        {/* Driver Selection Section */}
        <div className="driver-selection-cta">
          <h3>Choose Your Driver or Let Us Assign One</h3>
          <p>Select a preferred driver for your next ride, or we'll assign the most suitable chauffeur based on your journey</p>
          <button className="book-with-driver-btn" onClick={() => window.location.hash = 'booking'}>Book a Ride</button>
        </div>
      </div>
    </section>
  )
}

export default memo(DriverProfiles)
