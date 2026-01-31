import './Services.css'

function Services() {
  const services = [
    {
      icon: '🚕',
      title: 'City Transfers',
      description: 'Reliable in-city transportation throughout Hermanus and surrounding areas with professional drivers'
    },
    {
      icon: '✈️',
      title: 'Airport Shuttle Service',
      description: 'Cape Town and other airport transfers with punctual, courteous service and competitive rates'
    },
    {
      icon: '💼',
      title: 'Business Travel',
      description: 'Professional chauffeur service for corporate clients, executives, and business meetings'
    },
    {
      icon: '👥',
      title: 'Group Transport & Tours',
      description: 'Whale watching tours, group outings, and sightseeing throughout the Western Cape region'
    },
    {
      icon: '🛡️',
      title: 'Safety & Insurance',
      description: 'Fully insured vehicles, background-checked drivers, and GPS tracking for your peace of mind'
    },
    {
      icon: '24/7',
      title: 'Available 24/7',
      description: 'Round-the-clock transportation service, 365 days a year for your convenience'
    }
  ]

  return (
    <section className="services">
      <div className="container">
        <h2>Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
