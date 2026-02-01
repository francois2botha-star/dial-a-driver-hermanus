import '../Booking.css'
import { useState } from 'react'
import { validateBookingForm } from '../../utils/validation'
import SEO from '../seo/SEO'

// Form input wrapper for cleaner JSX
const FormGroup = ({ label, error, children }) => (
  <div className="form-group">
    <label>{label}</label>
    {children}
    {error && <span className="form-error">{error}</span>}
  </div>
)

const FormRow = ({ children }) => (
  <div className="form-row">
    {children}
  </div>
)

function Booking() {
  const [activeTab, setActiveTab] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
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
    vehicleType: 'Standard Sedan'
  })

  const closeModal = () => {
    setActiveTab(null)
    setErrors({})
    setSubmitStatus(null)
  }

  const openModal = (type) => {
    setActiveTab(type)
    setErrors({})
    setSubmitStatus(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    const formErrors = validateBookingForm(formData)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    if (isSubmitting) return
    setIsSubmitting(true)
    
    const serviceName = activeTab === 'shuttle' ? 'Shuttle Service' : 'Chauffeur-Driven Service'
    
    const bookingDetails = `Service: ${serviceName}
Customer: ${formData.name} ${formData.surname}
Email: ${formData.email}
Phone: ${formData.phone}

Pickup: ${formData.pickupLocation}
Dropoff: ${formData.dropoffLocation}
Date: ${formData.date}
Time: ${formData.time}
Passengers: ${formData.passengers}
Trip Type: ${formData.tripType}${formData.flightNumber ? `
Flight: ${formData.flightNumber}` : ''}${activeTab === 'shuttle' ? `
Vehicle: ${formData.vehicleType}` : ''}${formData.comments ? `

Comments: ${formData.comments}` : ''}`

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_key: '96e56ef1-d4d8-442f-867f-df90212949d0',
          name: `${formData.name} ${formData.surname}`,
          email: formData.email,
          phone: formData.phone,
          message: bookingDetails,
          subject: `Booking: ${serviceName} - ${formData.name}`,
          from_name: 'Dial a Driver Website',
          replyto: formData.email
        })
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
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
        setErrors({})
        setTimeout(() => closeModal(), 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SEO 
        title="Book Shuttle & Chauffeur Services in Hermanus | Dial-a-Driver"
        description="Reserve professional shuttle service or chauffeur-driven transport in Hermanus. Airport transfers, wine estate tours, and Western Cape transportation. Book online now."
      />
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
            <button className="action-btn shuttle-btn" onClick={() => openModal('shuttle')} aria-label="Book shuttle service">
              <span className="btn-icon">🚐</span>
              <span className="btn-text">Book Shuttle Service</span>
              <span className="btn-sub">Professional chauffeur in our vehicle</span>
            </button>
            
            <button className="action-btn takemehome-btn" onClick={() => openModal('takemehome')} aria-label="Book chauffeur-driven service">
              <span className="btn-icon">🚗</span>
              <span className="btn-text">Book A Driver Only</span>
              <span className="btn-sub">Our chauffeur drives your vehicle</span>
            </button>
          </div>
        </div>

        {/* Services Overview */}
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

        {/* Booking Modal */}
        {activeTab && (
          <div className="modal-overlay" onClick={(e) => { if(e.target.className === 'modal-overlay') closeModal() }}>
            <div className="modal-content">
              <button className="close-modal" onClick={closeModal} aria-label="Close booking form">&times;</button>
              <h2>Reserve {activeTab === 'shuttle' ? 'Shuttle Service' : 'Chauffeur-Driven Service'}</h2>
              
              {submitStatus === 'success' && (
                <div className="success-message" role="alert">
                  <span className="success-icon">✓</span>
                  <p>Booking submitted successfully! We'll contact you shortly.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="error-message" role="alert">
                  <span className="error-icon">✕</span>
                  <p>Failed to submit booking. Please call us at +27 64 799 7924 or email info@dialadriverhermanus.co.za</p>
                </div>
              )}
              
              <form className="booking-form-modal" onSubmit={handleSubmit} noValidate>
                <FormRow>
                  <FormGroup label="Pickup Location" error={errors.pickupLocation}>
                    <input
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      placeholder="Where are you?"
                      aria-required="true"
                    />
                  </FormGroup>
                  <FormGroup label="Dropoff Location" error={errors.dropoffLocation}>
                    <input
                      type="text"
                      name="dropoffLocation"
                      value={formData.dropoffLocation}
                      onChange={handleChange}
                      placeholder="Where to?"
                      aria-required="true"
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup label="Date" error={errors.date}>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      aria-required="true"
                    />
                  </FormGroup>
                  <FormGroup label="Time" error={errors.time}>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      aria-required="true"
                    />
                  </FormGroup>
                  <FormGroup label="Passengers">
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
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup label="Full Name" error={errors.name}>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      aria-required="true"
                    />
                  </FormGroup>
                  <FormGroup label="Surname" error={errors.surname}>
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      placeholder="Your surname"
                      aria-required="true"
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup label="Phone Number" error={errors.phone}>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone"
                      aria-required="true"
                    />
                  </FormGroup>
                  <FormGroup label="Trip Type">
                    <select name="tripType" value={formData.tripType} onChange={handleChange}>
                      <option value="one-way">One Way</option>
                      <option value="return">Return</option>
                    </select>
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup label="Flight # (if applicable)">
                    <input
                      type="text"
                      name="flightNumber"
                      value={formData.flightNumber}
                      onChange={handleChange}
                      placeholder="Flight number"
                    />
                  </FormGroup>
                </FormRow>

                <FormGroup label="Email" error={errors.email}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    aria-required="true"
                  />
                </FormGroup>

                <FormGroup label="Comments">
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Any special requests or additional information"
                    rows="4"
                  />
                </FormGroup>

                <button type="submit" className="submit-btn" disabled={isSubmitting || submitStatus === 'success'} aria-busy={isSubmitting}>
                  {isSubmitting ? 'Sending...' : `Confirm ${activeTab === 'shuttle' ? 'Shuttle' : 'Chauffeur-Driven'} Reservation`}
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default Booking
