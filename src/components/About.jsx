import './About.css'

function About() {
  return (
    <section className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>Why Choose Dial a Driver Hermanus</h2>
            <p>
              Founded in 2021, we specialize in exceptional transportation solutions customized to meet your specific needs. 
              As a client-centric company, we prioritize safety, reliability, and competitive rates — delivering professional service you can trust.
            </p>
            <ul className="features">
              <li>Professional, licensed drivers with local expertise</li>
              <li>Clean, modern, well-maintained vehicles</li>
              <li>Transparent pricing with no hidden fees</li>
              <li>GPS tracking and real-time updates</li>
              <li>24/7 availability for all your transport needs</li>
            </ul>
            
            <h3 style={{marginTop: '2rem', marginBottom: '1rem'}}>Service Area</h3>
            <p style={{marginBottom: '1rem'}}>
              We proudly serve Hermanus and the surrounding Western Cape region, including:
            </p>
            <ul className="features">
              <li>Hermanus, Gansbaai, De Kelders, and Arniston</li>
              <li>Cape Town and airport transfers (24/7)</li>
              <li>Wine country estates and wine routes</li>
              <li>Garden Route and scenic destinations</li>
              <li>Corporate and business travel throughout the region</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
