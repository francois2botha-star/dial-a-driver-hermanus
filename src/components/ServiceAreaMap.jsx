import './ServiceAreaMap.css'

export default function ServiceAreaMap() {
  return (
    <section className="service-area-map">
      <div className="container">
        <h2>Our Service Area</h2>
        <p className="section-subtitle">Professional shuttle services throughout the Western Cape</p>

        <div className="map-container">
          {/* SVG Map of Western Cape */}
          <svg viewBox="0 0 600 500" className="service-map-svg">
            {/* Background */}
            <rect width="600" height="500" fill="#e8f4f8" />

            {/* Primary Service Area (Hermanus) */}
            <circle cx="150" cy="280" r="80" fill="#25d366" opacity="0.3" />
            <circle cx="150" cy="280" r="80" fill="none" stroke="#25d366" strokeWidth="2" strokeDasharray="5,5" />

            {/* Secondary Service Area (Cape Town) */}
            <circle cx="450" cy="200" r="100" fill="#0066cc" opacity="0.2" />
            <circle cx="450" cy="200" r="100" fill="none" stroke="#0066cc" strokeWidth="2" strokeDasharray="5,5" />

            {/* Extended Coverage Area */}
            <ellipse cx="300" cy="280" rx="200" ry="150" fill="none" stroke="#ffc107" strokeWidth="2" opacity="0.4" />

            {/* Location Markers */}
            <g className="location-marker">
              <circle cx="150" cy="280" r="8" fill="#25d366" />
              <text x="150" y="310" textAnchor="middle" className="location-label">Hermanus</text>
              <text x="150" y="325" textAnchor="middle" className="location-sublabel">Primary Hub</text>
            </g>

            <g className="location-marker">
              <circle cx="450" cy="200" r="8" fill="#0066cc" />
              <text x="450" y="230" textAnchor="middle" className="location-label">Cape Town</text>
              <text x="450" y="245" textAnchor="middle" className="location-sublabel">Airport & City</text>
            </g>

            <g className="location-marker">
              <circle cx="320" cy="150" r="6" fill="#ff9800" />
              <text x="320" y="175" textAnchor="middle" className="location-label" style={{fontSize: '12px'}}>Stellenbosch</text>
            </g>

            <g className="location-marker">
              <circle cx="200" cy="380" r="6" fill="#ff9800" />
              <text x="200" y="405" textAnchor="middle" className="location-label" style={{fontSize: '12px'}}>De Kelders</text>
            </g>

            {/* Legend */}
            <g className="map-legend">
              <rect x="20" y="20" width="160" height="120" fill="white" stroke="#ddd" rx="8" />
              
              <circle cx="35" cy="40" r="5" fill="#25d366" />
              <text x="50" y="45" className="legend-text">Primary Coverage</text>

              <circle cx="35" cy="65" r="5" fill="#0066cc" />
              <text x="50" y="70" className="legend-text">Airport Routes</text>

              <circle cx="35" cy="90" r="5" fill="#ff9800" />
              <text x="50" y="95" className="legend-text">Extended Areas</text>

              <rect x="35" y="110" width="15" height="2" stroke="#ffc107" strokeWidth="2" />
              <text x="55" y="114" className="legend-text">Service Boundary</text>
            </g>

            {/* Route Example */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#ff6b6b" />
              </marker>
            </defs>
            <path d="M 150 280 Q 300 240 450 200" stroke="#ff6b6b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" opacity="0.5" />
          </svg>
        </div>

        {/* Service Details Grid */}
        <div className="service-zones-grid">
          <div className="service-zone-card primary">
            <div className="zone-icon">🏝️</div>
            <h3>Hermanus Hub</h3>
            <p>Primary service area with 15-minute response times</p>
            <ul className="zone-features">
              <li>✓ Local city transfers</li>
              <li>✓ Wine estate tours</li>
              <li>✓ Beach excursions</li>
              <li>✓ Whale watching tours</li>
            </ul>
          </div>

          <div className="service-zone-card airport">
            <div className="zone-icon">✈️</div>
            <h3>Cape Town & Airport</h3>
            <p>Full airport transfer coverage 24/7</p>
            <ul className="zone-features">
              <li>✓ CTIA airport transfers</li>
              <li>✓ City center routes</li>
              <li>✓ Hotel transfers</li>
              <li>✓ Nighttime service</li>
            </ul>
          </div>

          <div className="service-zone-card extended">
            <div className="zone-icon">🛣️</div>
            <h3>Extended Coverage</h3>
            <p>Customized routes beyond main areas</p>
            <ul className="zone-features">
              <li>✓ Stellenbosch & wine region</li>
              <li>✓ De Kelders & south coast</li>
              <li>✓ Gansbaai (shark diving)</li>
              <li>✓ Custom long-distance</li>
            </ul>
          </div>

          <div className="service-zone-card coverage">
            <div className="zone-icon">📍</div>
            <h3>24/7 Availability</h3>
            <p>Always ready to serve across all areas</p>
            <ul className="zone-features">
              <li>✓ Early morning pickups</li>
              <li>✓ Late night returns</li>
              <li>✓ Emergency services</li>
              <li>✓ Group coordination</li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="map-cta">
          <h3>Need a ride outside our primary area?</h3>
          <p>Contact us for custom quotes and special arrangements</p>
          <button className="cta-button">Get Custom Quote</button>
        </div>
      </div>
    </section>
  )
}
