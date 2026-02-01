import { useState, useEffect, useMemo } from 'react'
import '../PricingCalculator.css'
import { formatPrice } from '../../utils/formatting'

// Extract pricing data for better maintainability
const PRICING_DATA = {
  basePrices: {
    sedan: 150,
    suv: 200,
    minibus: 300,
    luxury: 400
  },
  distanceRate: 15, // per km
  timeMultipliers: {
    morning: 1.0,
    afternoon: 1.0,
    evening: 1.15,
    night: 1.3
  },
  passengerBonus: {
    1: 0,
    2: 50,
    3: 100,
    4: 150,
    5: 200,
    6: 300
  }
}

// Reusable calculation logic
export const calculateEstimatedPrice = (formData, pricingData = PRICING_DATA) => {
  const baseFare = pricingData.basePrices[formData.vehicleType]
  const distanceCost = formData.distance * pricingData.distanceRate
  const timeMultiplier = pricingData.timeMultipliers[formData.timeOfDay]
  const passengerCost = pricingData.passengerBonus[formData.passengers] || 300

  const subtotal = baseFare + distanceCost + passengerCost
  return Math.round(subtotal * timeMultiplier)
}

const PriceBreakdownItem = ({ label, value }) => (
  <div className="breakdown-item">
    <span>{label}</span>
    <span>{value}</span>
  </div>
)

const VehicleOption = ({ value, label, desc, isSelected, onChange }) => (
  <label className="vehicle-radio">
    <input
      type="radio"
      name="vehicleType"
      value={value}
      checked={isSelected}
      onChange={onChange}
    />
    <div className="radio-content">
      <span className="vehicle-label">{label}</span>
      <span className="vehicle-desc">{desc}</span>
    </div>
  </label>
)

const TimeButton = ({ value, label, emoji, isSelected, onClick }) => (
  <button
    className={`time-btn ${isSelected ? 'active' : ''}`}
    onClick={onClick}
  >
    {emoji} {label}
  </button>
)

export default function PricingCalculator() {
  const [formData, setFormData] = useState({
    distance: 20,
    vehicleType: 'sedan',
    timeOfDay: 'morning',
    passengers: 1
  })

  // Memoize price calculation for performance
  const estimatedPrice = useMemo(
    () => calculateEstimatedPrice(formData),
    [formData]
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: isNaN(value) ? value : parseInt(value)
    }))
  }

  const baseFare = PRICING_DATA.basePrices[formData.vehicleType]
  const distanceCost = formData.distance * PRICING_DATA.distanceRate
  const passengerCost = PRICING_DATA.passengerBonus[formData.passengers]
  const timeMultiplier = PRICING_DATA.timeMultipliers[formData.timeOfDay]

  const vehicles = [
    { value: 'sedan', label: '🚗 Sedan', desc: 'Comfortable 4-seater' },
    { value: 'suv', label: '🚙 SUV', desc: 'Premium & spacious' },
    { value: 'minibus', label: '🚐 Minibus', desc: '6-8 passengers' },
    { value: 'luxury', label: '✨ Luxury', desc: 'Premium experience' }
  ]

  const times = [
    { value: 'morning', label: 'Morning', emoji: '🌅', desc: '6am-12pm' },
    { value: 'afternoon', label: 'Afternoon', emoji: '☀️', desc: '12pm-6pm' },
    { value: 'evening', label: 'Evening', emoji: '🌆', desc: '6pm-10pm' },
    { value: 'night', label: 'Night', emoji: '🌙', desc: '10pm-6am' }
  ]

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
                  aria-label="Distance in kilometers"
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
                  {vehicles.map(vehicle => (
                    <VehicleOption
                      key={vehicle.value}
                      value={vehicle.value}
                      label={vehicle.label}
                      desc={vehicle.desc}
                      isSelected={formData.vehicleType === vehicle.value}
                      onChange={handleChange}
                    />
                  ))}
                </div>
              </div>

              {/* Time of Day */}
              <div className="input-group">
                <label>Time of Day</label>
                <div className="time-buttons">
                  {times.map(time => (
                    <TimeButton
                      key={time.value}
                      value={time.value}
                      label={time.label}
                      emoji={time.emoji}
                      isSelected={formData.timeOfDay === time.value}
                      onClick={() => setFormData(prev => ({ ...prev, timeOfDay: time.value }))}
                    />
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
                  aria-label="Number of passengers"
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
                <h1 className="price-amount">{formatPrice(estimatedPrice)}</h1>
                
                <div className="price-breakdown">
                  <h3>Price Breakdown</h3>
                  <PriceBreakdownItem label="Base Fare" value={formatPrice(baseFare)} />
                  <PriceBreakdownItem label={`Distance (${formData.distance}km @ R15/km)`} value={formatPrice(distanceCost)} />
                  <PriceBreakdownItem label="Passenger Fee" value={formatPrice(passengerCost)} />
                  {formData.timeOfDay !== 'morning' && formData.timeOfDay !== 'afternoon' && (
                    <PriceBreakdownItem 
                      label={`Time Surcharge (${timeMultiplier}x)`} 
                      value={`+${Math.round((timeMultiplier - 1) * 100)}%`} 
                    />
                  )}
                </div>

                <div className="price-note">
                  <span>💡</span>
                  <p>This is an estimate. Final price may vary based on actual route and traffic.</p>
                </div>

                <button className="book-now-btn" aria-label="Proceed to book this ride">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
