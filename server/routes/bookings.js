/**
 * Booking Routes
 * 
 * POST /api/bookings - Create new booking
 * GET /api/bookings/:id - Get booking details
 * GET /api/bookings - List user's bookings (requires auth)
 * PUT /api/bookings/:id - Update booking status
 */

const express = require('express')
const router = express.Router()

// Validation utility (import from frontend validation)
const validateBookingData = (data) => {
  const errors = {}
  
  if (!data.pickupLocation) errors.pickup = 'Pickup location required'
  if (!data.dropoffLocation) errors.dropoff = 'Dropoff location required'
  if (!data.date) errors.date = 'Date required'
  if (!data.time) errors.time = 'Time required'
  if (!data.name) errors.name = 'Name required'
  if (!data.phone) errors.phone = 'Phone required'
  if (!data.email) errors.email = 'Email required'
  
  return errors
}

/**
 * POST /api/bookings
 * Create a new booking
 * 
 * Request body:
 * {
 *   pickup: { location, coordinates },
 *   dropoff: { location, coordinates },
 *   date: "2026-02-15",
 *   time: "14:00",
 *   passengers: 2,
 *   contact: { name, phone, email },
 *   promoCode?: "SAVE10"
 * }
 */
router.post('/', (req, res) => {
  try {
    const { pickup, dropoff, date, time, passengers, contact, promoCode } = req.body

    // Validate input
    const bookingData = {
      pickupLocation: pickup?.location,
      dropoffLocation: dropoff?.location,
      date,
      time,
      name: contact?.name,
      phone: contact?.phone,
      email: contact?.email
    }
    
    const errors = validateBookingData(bookingData)
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        errors
      })
    }

    // Calculate pricing (TODO: integrate with Google Maps Distance API)
    const estimatedDistance = 8.5 // km (mock value)
    const baseFare = 150 // ZAR
    const ratePerKm = 30 // ZAR
    const ratePerMinute = 2 // ZAR
    
    const distanceFare = estimatedDistance * ratePerKm
    const timeEstimate = Math.ceil(estimatedDistance / 60) * 15 // estimate 60km/h
    const timeFare = timeEstimate * ratePerMinute
    let total = baseFare + distanceFare + timeFare
    
    // Apply promo code discount
    let discount = 0
    if (promoCode === 'SAVE10') {
      discount = total * 0.1
      total -= discount
    }

    // Generate booking ID
    const bookingId = `BK_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const confirmationCode = `DAD_${date.split('-').join('')}_${Math.random().toString(36).substr(2, 4).toUpperCase()}`

    res.status(201).json({
      success: true,
      booking: {
        id: bookingId,
        confirmationCode,
        status: 'pending',
        pickup,
        dropoff,
        date,
        time,
        passengers,
        contact,
        pricing: {
          baseFare,
          distance: estimatedDistance,
          distanceFare,
          timeFare,
          discount,
          total,
          currency: 'ZAR'
        },
        createdAt: new Date().toISOString()
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error.message }
    })
  }
})

/**
 * GET /api/bookings/:id
 * Get specific booking details
 */
router.get('/:id', (req, res) => {
  const { id } = req.params
  
  // TODO: Fetch from MongoDB
  res.json({
    success: true,
    booking: {
      id,
      status: 'confirmed',
      message: 'This endpoint requires database implementation'
    }
  })
})

/**
 * GET /api/bookings
 * List all bookings for authenticated user
 * Requires: Authorization header with JWT token
 */
router.get('/', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: { message: 'Authentication required' }
    })
  }
  
  // TODO: Verify JWT and fetch user's bookings
  res.json({
    success: true,
    bookings: [],
    message: 'This endpoint requires authentication implementation'
  })
})

module.exports = router
