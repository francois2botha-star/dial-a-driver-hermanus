import './Contact.css'
import { useState } from 'react'
import { siteConfig } from '../config'
import SEO from './SEO'

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
        alert('✓ Message sent successfully! We will get back to you soon.')
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
      } else {
        alert('Failed to send message. Please call us at +27 64 799 7924 or email info@dialadriverhermanus.co.za')
        console.error('Error:', result)
      }
    } catch (error) {
      alert('Failed to send message. Please call us at +27 64 799 7924 or email info@dialadriverhermanus.co.za')
      console.error('Contact form error:', error)
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

          <form className="contact-form" onSubmit={handleSubmit} aria-busy={isSubmitting}>
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
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone"
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
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
