import './DriverProfiles.css'

export default function DriverProfiles() {
  const drivers = [
    {
      id: 1,
      name: 'John Smith',
      rating: 4.9,
      trips: 247,
      vehicle: 'White Toyota Corolla',
      specialties: ['Friendly', 'Professional', 'Reliable'],
      image: '👨‍✈️'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      rating: 5.0,
      trips: 189,
      vehicle: 'Silver Honda Civic',
      specialties: ['Courteous', 'Safe Driver', 'Knowledge'],
      image: '👩‍✈️'
    },
    {
      id: 3,
      name: 'Marcus Williams',
      rating: 4.8,
      trips: 342,
      vehicle: 'Black Audi A4',
      specialties: ['Luxury Service', 'Executive', 'Discreet'],
      image: '👨‍✈️'
    },
    {
      id: 4,
      name: 'Nomsa Dlamini',
      rating: 4.9,
      trips: 216,
      vehicle: 'Grey Toyota Innova',
      specialties: ['Group Tours', 'Fluent Xhosa', 'Patient'],
      image: '👩‍✈️'
    }
  ]

  return (
    <section className="driver-profiles-section">
      <div className="container">
        <h2>Meet Our Drivers</h2>
        <p className="section-subtitle">Professional, vetted, and highly-rated chauffeurs</p>

        <div className="drivers-grid">
          {drivers.map(driver => (
            <div key={driver.id} className="driver-card">
              <div className="driver-avatar-large">{driver.image}</div>
              
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

              <p className="driver-vehicle">
                <strong>Vehicle:</strong> {driver.vehicle}
              </p>

              <div className="specialties">
                {driver.specialties.map((specialty, idx) => (
                  <span key={idx} className="specialty-badge">{specialty}</span>
                ))}
              </div>

              <button className="request-driver-btn">Request {driver.name}</button>
            </div>
          ))}
        </div>

        {/* Driver Selection Section */}
        <div className="driver-selection-cta">
          <h3>Choose Your Driver or Let Us Assign One</h3>
          <p>Select a preferred driver for your next ride, or we'll assign the most suitable chauffeur based on your journey</p>
          <button className="book-with-driver-btn">Book a Ride</button>
        </div>
      </div>
    </section>
  )
}
