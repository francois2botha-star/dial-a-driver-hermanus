/**
 * Pricing Routes
 * 
 * POST /api/pricing/calculate - Calculate trip pricing
 * GET /api/pricing/rates - Get current rates
 */

const express = require('express')
const router = express.Router()

/**
 * POST /api/pricing/calculate
 * Calculate pricing for a trip
 * 
 * Request: { pickup, dropoff, passengerType, promoCode }
 * Response: { baseFare, distance, time, discount, total }
 */
router.post('/calculate', (req, res) => {
  try {
    const { pickup, dropoff, passengerType = 'standard', promoCode } = req.body

    // Pricing rates
    const RATES = {
      base: 150, // ZAR
      per_km: 30, // ZAR/km
      per_minute: 2, // ZAR/minute
      premium_multiplier: 1.5,
      late_night_multiplier: 1.3 // After 22:00 or before 06:00
    }

    // TODO: Use Google Maps Distance Matrix API for real distances
    // Mock calculation for demo
    const distance = 8.5 // km
    const estimatedTime = Math.ceil((distance / 60) * 15) // minutes, assuming 60km/h

    const baseFare = RATES.base
    const distanceFare = distance * RATES.per_km
    const timeFare = estimatedTime * RATES.per_minute
    
    let subtotal = baseFare + distanceFare + timeFare
    
    // Apply multipliers
    if (passengerType === 'premium') {
      subtotal *= RATES.premium_multiplier
    }

    // Apply promo code
    let discount = 0
    const validPromos = {
      'SAVE10': 0.10,
      'SAVE20': 0.20,
      'FIRSTRIDE': 0.15,
      'LOYALTY': 0.05
    }

    if (promoCode && validPromos[promoCode]) {
      discount = subtotal * validPromos[promoCode]
    }

    const total = subtotal - discount

    res.json({
      success: true,
      pricing: {
        distance,
        estimatedTime,
        baseFare,
        distanceFare,
        timeFare,
        subtotal,
        discountPercent: promoCode ? (validPromos[promoCode] * 100) : 0,
        discount,
        total,
        currency: 'ZAR',
        validPromos: Object.keys(validPromos)
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
 * GET /api/pricing/rates
 * Get current pricing rates
 */
router.get('/rates', (req, res) => {
  res.json({
    success: true,
    rates: {
      currency: 'ZAR',
      baseFare: 150,
      perKm: 30,
      perMinute: 2,
      premiumMultiplier: 1.5,
      lateNightMultiplier: 1.3,
      validPromos: ['SAVE10', 'SAVE20', 'FIRSTRIDE', 'LOYALTY']
    }
  })
})

module.exports = router
