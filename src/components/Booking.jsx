import './Booking.css'
import { useState } from 'react'

function Booking() {
  const [activeTab, setActiveTab] = useState(null) // 'shuttle' | 'takemehome' | null for none
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    date: '',
    time: '',
    passengers: '1',
    name: '',
    surname: '',
    phone: '',
    email: '',
    flightNumber: '',
    tripType: 'one-way',
    comments: '',
    vehicleType: 'Standard Sedan' // Default for shuttle
  })

  // Close modal helper
  const closeModal = () => {
    setActiveTab(null)
  }

  const openModal = (type) => {
    setActiveTab(type)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Booking submitted:', formData)
    
    const serviceName = activeTab === 'shuttle' ? 'Shuttle Service' : 'Take Me Home Service'
    
    // Compose mailto to open user's email client with booking details
    const to = 'francois2botha@gmail.com'
    const subject = encodeURIComponent(`Booking: ${serviceName} - Reply to: ${formData.email}`)
    
    let bodyText = `CUSTOMER EMAIL: ${formData.email}\n`
    bodyText += `CUSTOMER PHONE: ${formData.phone}\n`
    bodyText += `(Reply to this email will go to: ${formData.email})\n\n`
    bodyText += `--- BOOKING DETAILS ---\n\n`
    bodyText += `Service Type: ${serviceName}\n`
    bodyText += `Name: ${formData.name} ${formData.surname}\n`
    bodyText += `Email: ${formData.email}\n`
    bodyText += `Phone: ${formData.phone}\n`
    bodyText += `Pickup: ${formData.pickupLocation}\n`
    bodyText += `Dropoff: ${formData.dropoffLocation}\n`
    bodyText += `Date: ${formData.date}\n`
    bodyText += `Time: ${formData.time}\n`
    bodyText += `Passengers: ${formData.passengers}\n`
    bodyText += `Trip Type: ${formData.tripType}`
    
    if (formData.flightNumber) {
        bodyText += `\nFlight #: ${formData.flightNumber}`
    }
    
    if (activeTab === 'shuttle') {
        bodyText += `\nPreferred Vehicle: ${formData.vehicleType}`
    }
    
    if (formData.comments) {
        bodyText += `\n\nComments: ${formData.comments}`
    }

    const body = encodeURIComponent(bodyText)
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`
    
    window.location.href = mailto
    
    alert('Your email client will open to send the booking. If it does not, please email francois2botha@gmail.com')
    
    setFormData({
      pickupLocation: '',
      dropoffLocation: '',
      date: '',
      time: '',
      passengers: '1',
      name: '',
      surname: '',
      phone: '',
      email: '',
      flightNumber: '',
      tripType: 'one-way',
      comments: '',
      vehicleType: 'Standard Sedan'
    })
    closeModal()
  }

  return (
    <section className="booking">
      <div className="booking-intro">
        <h1>Premium Chauffeur Services Hermanus</h1>
        <h2 className="subtitle">Sophisticated shuttle and chauffeur services, based in Hermanus.</h2>
        
        <p className="description">
          Experience refined transport across the Western Cape, or enjoy seamless transfers to exquisite dining, prestigious wine estates, and unforgettable experiences throughout the Overberg.
        </p>
        
        <p className="description">
          Select a professional chauffeur with an elegant vehicle, or allow our chauffeur to navigate your own vehicle. Our distinguished Chauffeur-Driven Service ensures you and your vehicle arrive home safely — perfect after sophisticated evenings or wine estate visits.
        </p>

        <h3 className="tagline">Refined. Sophisticated. Seamless.</h3>
        
        <p className="cta-text">Select your preferred service below to begin your reservation.</p>
        
        <div className="booking-actions">
          <button className="action-btn shuttle-btn" onClick={() => openModal('shuttle')}>
            <span className="btn-icon">🚐</span>
            <span className="btn-text">Reserve Shuttle Service</span>
            <span className="btn-sub">Professional chauffeur in our vehicle</span>
          </button>
          
          <button className="action-btn takemehome-btn" onClick={() => openModal('takemehome')}>
            <span className="btn-icon">🚗</span>
            <span className="btn-text">Chauffeur-Driven Service</span>
            <span className="btn-sub">Our chauffeur drives your vehicle</span>
          </button>
        </div>
      </div>

      {/* What We Do Section */}
      <div className="services-overview">
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🚐</div>
            <h4>Shuttle Services</h4>
            <p>Seamless transport throughout the Western Cape including airport transfers, wine estate routes, scenic drives, and inter-city travel in comfort and style.</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">🎯</div>
            <h4>Local Excursion Transfers</h4>
            <p>Elegant transfers to and from Hermanus's finest attractions — pristine beaches, nature reserves, adventure experiences, and acclaimed restaurants.</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">🚗</div>
            <h4>Chauffeur with Vehicle</h4>
            <p>Engage a distinguished professional chauffeur with an elegant vehicle for tours, special events, group travel, or leisurely excursions. You relax while we attend to the details.</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">👨‍💼</div>
            <h4>Chauffeur-Driven Service</h4>
            <p>Prefer your own vehicle? We provide an experienced, professional chauffeur to drive your car, allowing you to unwind and savour the experience.</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">🏠</div>
            <h4>Chauffeur-Driven Evening Service</h4>
            <p>Our signature service ensures secure return journeys where we collect you and safely drive both you and your vehicle home — ideal after sophisticated evenings or wine estate tastings.</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">⭐</div>
            <h4>Why Choose Us</h4>
            <p>Established locally with extensive regional knowledge. Professionally trained, discreet chauffeurs. Bespoke arrangements tailored to your preferences. Ideal for discerning travellers, corporate clients, and prestigious occasions.</p>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {activeTab && (
        <div className="modal-overlay" onClick={(e) => { if(e.target.className === 'modal-overlay') closeModal() }}>
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>&times;</button>
            <h2>Reserve {activeTab === 'shuttle' ? 'Shuttle Service' : 'Chauffeur-Driven Service'}</h2>
            
            <form className="booking-form-modal" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Pickup Location</label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    placeholder="Where are you?"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Dropoff Location</label>
                  <input
                    type="text"
                    name="dropoffLocation"
                    value={formData.dropoffLocation}
                    onChange={handleChange}
                    placeholder="Where to?"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Passengers</label>
                  <select
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4+</option>
                  </select>
                </div>
              </div>

              {activeTab === 'shuttle' && (
                 <div className="form-row">
                   <div className="form-group full-width">
                     <label>Vehicle Preference</label>
                     <select name="vehicleType" value={formData.vehicleType} onChange={handleChange}>
                       <option>Standard Sedan</option>
                       <option>Luxury SUV</option>
                       <option>Minibus (Groups)</option>
                     </select>
                   </div>
                 </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Surname</label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    placeholder="Your surname"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Trip Type</label>
                  <select name="tripType" value={formData.tripType} onChange={handleChange}>
                    <option value="one-way">One Way</option>
                    <option value="return">Return</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Flight # (if applicable)</label>
                  <input
                    type="text"
                    name="flightNumber"
                    value={formData.flightNumber}
                    onChange={handleChange}
                    placeholder="Flight number"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Comments</label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Any special requests or additional information"
                  rows="4"
                />
              </div>

              <button type="submit" className="submit-btn">
                  Confirm {activeTab === 'shuttle' ? 'Shuttle' : 'Chauffeur-Driven'} Reservation
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default Booking
