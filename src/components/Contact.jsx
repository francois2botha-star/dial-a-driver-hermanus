import './Contact.css'
import { useState } from 'react'
import { siteConfig } from '../config'

function Contact() {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Compose mailto with user's email in subject for easy reply
    const to = 'francois2botha@gmail.com'
    const subject = encodeURIComponent(`Contact Form - Reply to: ${formData.email}`)
    
    let bodyText = `CUSTOMER EMAIL: ${formData.email}\n`
    bodyText += `CUSTOMER PHONE: ${formData.phone}\n`
    bodyText += `(Reply to this email will go to: ${formData.email})\n\n`
    bodyText += `--- MESSAGE ---\n\n`
    bodyText += `Name: ${formData.name}\n`
    bodyText += `Email: ${formData.email}\n`
    bodyText += `Phone: ${formData.phone}\n\n`
    bodyText += `Message:\n${formData.message}`
    
    const body = encodeURIComponent(bodyText)
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`
    
    window.location.href = mailto
    
    alert('Your email client will open to send the message. If it does not, please email francois2botha@gmail.com')
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    })
  }

  return (
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

          <form className="contact-form" onSubmit={handleSubmit}>
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
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
