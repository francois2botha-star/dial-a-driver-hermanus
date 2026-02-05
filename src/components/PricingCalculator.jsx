import { useState, useEffect } from 'react'
import './PricingCalculator.css'

export default function PricingCalculator() {
  const [formData, setFormData] = useState({
    distance: 20,
    vehicleType: 'sedan',
    timeOfDay: 'morning',
    passengers: 1
  })
  const [estimatedPrice, setEstimatedPrice] = useState(0)

  const basePrices = {
    sedan: 150,
    suv: 200,
    minibus: 300,
    luxury: 400
  }

  const distanceRate = 15 // per km
  const timeMultipliers = {
    morning: 1.0,
    afternoon: 1.0,
    evening: 1.15,
    night: 1.3
  }
  const passengerBonus = {
    1: 0,
    2: 50,
    3: 100,
    4: 150,
    5: 200,
    6: 300
  }

  useEffect(() => {
    calculatePrice()
  }, [formData])

  const calculatePrice = () => {
    const baseFare = basePrices[formData.vehicleType]
    const distanceCost = formData.distance * distanceRate
    const timeMultiplier = timeMultipliers[formData.timeOfDay]
    const passengerCost = passengerBonus[formData.passengers] || 300

    const subtotal = baseFare + distanceCost + passengerCost
    const total = Math.round(subtotal * timeMultiplier)

    setEstimatedPrice(total)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: isNaN(value) ? value : parseInt(value)
    }))
  }

  return (
    <section className="pricing-calculator-section">
      <div className="container">
        <div className="calculator-wrapper">
          <div className="calculator-header">
            <h2>Price Estimator</h2>
            <p>Get an instant quote for your journey</p>
          </div>

          <div className="calculator-content">
            {/* Input Controls */}
            <div className="calculator-inputs">
              {/* Distance Slider */}
              <div className="input-group">
                <label htmlFor="distance">
                  Distance: <span className="value">{formData.distance} km</span>
                </label>
                <input
                  type="range"
                  id="distance"
                  name="distance"
                  min="1"
                  max="100"
                  value={formData.distance}
                  onChange={handleChange}
                  className="slider"
                />
                <div className="slider-labels">
                  <span>1 km</span>
                  <span>100 km</span>
                </div>
              </div>

              {/* Vehicle Type */}
              <div className="input-group">
                <label>Vehicle Type</label>
                <div className="vehicle-options">
                  {[
                    { value: 'sedan', label: '🚗 Sedan', desc: 'Comfortable 4-seater' },
                    { value: 'suv', label: '🚙 SUV', desc: 'Premium & spacious' },
                    { value: 'minibus', label: '🚐 Minibus', desc: '6-8 passengers' },
                    { value: 'luxury', label: '✨ Luxury', desc: 'Premium experience' }
                  ].map(vehicle => (
                    <label key={vehicle.value} className="vehicle-radio">
                      <input
                        type="radio"
                        name="vehicleType"
                        value={vehicle.value}
                        checked={formData.vehicleType === vehicle.value}
                        onChange={handleChange}
                      />
                      <div className="radio-content">
                        <span className="vehicle-label">{vehicle.label}</span>
                        <span className="vehicle-desc">{vehicle.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Time of Day */}
              <div className="input-group">
                <label>Time of Day</label>
                <div className="time-buttons">
                  {[
                    { value: 'morning', label: '🌅 Morning (6am-12pm)', emoji: '🌅' },
                    { value: 'afternoon', label: '☀️ Afternoon (12pm-6pm)', emoji: '☀️' },
                    { value: 'evening', label: '🌆 Evening (6pm-10pm)', emoji: '🌆' },
                    { value: 'night', label: '🌙 Night (10pm-6am)', emoji: '🌙' }
                  ].map(time => (
                    <button
                      key={time.value}
                      className={`time-btn ${formData.timeOfDay === time.value ? 'active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, timeOfDay: time.value }))}
                    >
                      {time.emoji} {time.value.charAt(0).toUpperCase() + time.value.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Passengers */}
              <div className="input-group">
                <label htmlFor="passengers">
                  Passengers: <span className="value">{formData.passengers}</span>
                </label>
                <input
                  type="range"
                  id="passengers"
                  name="passengers"
                  min="1"
                  max="6"
                  value={formData.passengers}
                  onChange={handleChange}
                  className="slider"
                />
                <div className="passenger-info">
                  <p>Group discount applied for 3+ passengers</p>
                </div>
              </div>
            </div>

            {/* Price Display */}
            <div className="price-display">
              <div className="price-card">
                <p className="price-label">Estimated Price</p>
                <h1 className="price-amount">R{estimatedPrice.toLocaleString()}</h1>
                
                <div className="price-breakdown">
                  <h3>Price Breakdown</h3>
                  <div className="breakdown-item">
                    <span>Base Fare ({formData.vehicleType})</span>
                    <span>R{basePrices[formData.vehicleType]}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Distance ({formData.distance}km @ R15/km)</span>
                    <span>R{formData.distance * 15}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Passenger Fee</span>
                    <span>R{passengerBonus[formData.passengers]}</span>
                  </div>
                  {formData.timeOfDay !== 'morning' && formData.timeOfDay !== 'afternoon' && (
                    <div className="breakdown-item">
                      <span>Time Surcharge ({timeMultipliers[formData.timeOfDay]}x)</span>
                      <span>+{Math.round((timeMultipliers[formData.timeOfDay] - 1) * 100)}%</span>
                    </div>
                  )}
                </div>

                <div className="price-note">
                  <span>💡</span>
                  <p>This is an estimate. Final price may vary based on actual route and traffic.</p>
                </div>

                <button className="book-now-btn">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
