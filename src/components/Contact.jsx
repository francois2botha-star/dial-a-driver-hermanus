import './Contact.css'
import { useState } from 'react'
import { siteConfig } from '../config'
import SEO from './seo/SEO'
import { validateContactForm } from '../utils/validation'

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

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
    const formErrors = validateContactForm(formData)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    if (isSubmitting) return
    setIsSubmitting(true)
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_key: '96e56ef1-d4d8-442f-867f-df90212949d0',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          subject: `Contact Form: ${formData.name}`,
          from_name: 'Dial a Driver Website',
          replyto: formData.email
        })
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
        setErrors({})
        setTimeout(() => setSubmitStatus(null), 3000)
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
        title="Contact Dial-a-Driver Hermanus | 24/7 Shuttle & Chauffeur Services"
        description="Get in touch with Dial-a-Driver Hermanus. Call +27 64 799 7924 or send a message. Available 24/7 for airport transfers, shuttles, and chauffeur services."
      />
      <section className="contact" id="contact">
        <div className="contact-container">
          <h1>Contact Dial a Driver Hermanus</h1>
        <p style={{textAlign: 'center', fontSize: '1.1rem', marginBottom: '2rem', color: '#666'}}>
          Professional chauffeur services available 24/7. Call, email, or use WhatsApp to book your shuttle or arrange airport transfers.
        </p>
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <h2>Contact Details</h2>
              <p className="business-name">{siteConfig.business.name}</p>
              <p className="address">
                {siteConfig.business.address.split('\n').map((line, i) => (
                  <span key={i}>{line}<br/></span>
                ))}
              </p>
            </div>
            <div className="info-item">
              <h2>Reach Out</h2>
              <p><strong>Mobile:</strong> <a href={`tel:${siteConfig.business.phonePrimary.replace(/\s/g, '')}`}>{siteConfig.business.phonePrimary}</a></p>
              <p><strong>WhatsApp:</strong> <a href={`https://wa.me/${siteConfig.business.phonePrimary.replace(/\D/g,'')}?text=Hi%20there%2C%20I%20would%20like%20to%20book%20a%20chauffeur`} target="_blank" rel="noreferrer">Chat Now</a></p>
              <p><strong>Email:</strong> <a href={`mailto:${siteConfig.business.email}`}>{siteConfig.business.email}</a></p>
              <p><strong>Website:</strong> {siteConfig.business.website}</p>
            </div>
            <div className="info-item">
              <h2>Availability</h2>
              <p>24/7 Professional Chauffeur Service • Every Day of the Year</p>
            </div>
          </div>

          <div className="map-wrapper">
            <iframe
              title="Hermanus map"
              src="https://www.google.com/maps?q=Hermanus%2C%20Western%20Cape%2C%20South%20Africa&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {submitStatus === 'success' && (
              <div className="success-message" role="alert">
                <span className="success-icon">✓</span>
                <p>Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="error-message" role="alert">
                <span className="error-icon">✕</span>
                <p>Failed to send message. Please call us at +27 64 799 7924 or email info@dialadriverhermanus.co.za</p>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                aria-required="true"
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                aria-required="true"
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone (optional)"
              />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message (at least 10 characters)"
                rows="5"
                aria-required="true"
              ></textarea>
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>
            <button type="submit" className="submit-btn" disabled={isSubmitting} aria-busy={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
      </section>
    </>
  )
}

export default Contact
