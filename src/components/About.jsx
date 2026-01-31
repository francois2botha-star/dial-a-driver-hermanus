import './About.css'

function About() {
  return (
    <section className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About Dial a Driver Hermanus</h2>
            <p>
              With over 10 years of experience serving the Hermanus and Western Cape region, 
              Dial a Driver has become the trusted choice for professional chauffeur and shuttle services.
              Our commitment to excellence has made us the preferred transportation provider for locals and visitors alike.
            </p>
            <p>
              Our team of experienced, professional drivers is dedicated to providing exceptional service with clean, 
              well-maintained vehicles and personalized attention to every client's needs.
            </p>
            <ul className="features">
              <li>✓ Professional, courteous, and background-checked drivers</li>
              <li>✓ Clean, modern, and well-maintained vehicles</li>
              <li>✓ Competitive and transparent pricing with no hidden fees</li>
              <li>✓ GPS tracking and real-time monitoring for safety</li>
              <li>✓ 24/7 availability for airport transfers and tours</li>
            </ul>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60" alt="Hermanus coastal town view" style={{width: '100%', borderRadius: 10}} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
