/**
 * Driver Routes (Admin only)
 * 
 * GET /api/drivers - List all drivers
 * GET /api/drivers/:id - Get driver details
 * POST /api/drivers - Add new driver
 * PUT /api/drivers/:id - Update driver info
 * PUT /api/drivers/:id/status - Update driver availability
 */

const express = require('express')
const router = express.Router()

// Mock data for demo
const mockDrivers = [
  {
    id: 'DR_001',
    name: 'James Mthembu',
    rating: 4.9,
    trips: 342,
    experience: '12 years',
    vehicle: 'Toyota Quantum (8 seater)',
    specialties: ['Airport Transfers', 'Group Tours'],
    status: 'available',
    location: { lat: -34.4231, lng: 19.2345 }
  },
  {
    id: 'DR_002',
    name: 'Sarah Johnson',
    rating: 4.8,
    trips: 287,
    experience: '8 years',
    vehicle: 'Toyota Hiace (7 seater)',
    specialties: ['Business Transfers', 'VIP Service'],
    status: 'available',
    location: { lat: -34.4200, lng: 19.2350 }
  },
  {
    id: 'DR_003',
    name: 'Michael De Vries',
    rating: 4.7,
    trips: 156,
    experience: '5 years',
    vehicle: 'Ford Transit (12 seater)',
    specialties: ['Group Tours', 'Airport Shuttles'],
    status: 'on_trip',
    location: { lat: -34.4189, lng: 19.2312 }
  },
  {
    id: 'DR_004',
    name: 'Fatima Hassan',
    rating: 4.6,
    trips: 198,
    experience: '6 years',
    vehicle: 'Mercedes Sprinter (14 seater)',
    specialties: ['Corporate Events', 'Long Distance'],
    status: 'available',
    location: { lat: -34.4250, lng: 19.2360 }
  }
]

/**
 * GET /api/drivers
 * List all drivers (public endpoint)
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    drivers: mockDrivers,
    total: mockDrivers.length
  })
})

/**
 * GET /api/drivers/:id
 * Get specific driver details
 */
router.get('/:id', (req, res) => {
  const driver = mockDrivers.find(d => d.id === req.params.id)
  
  if (!driver) {
    return res.status(404).json({
      success: false,
      error: { message: 'Driver not found' }
    })
  }
  
  res.json({
    success: true,
    driver
  })
})

/**
 * PUT /api/drivers/:id/status
 * Update driver availability status (Admin only)
 * 
 * Request: { status: 'available' | 'on_trip' | 'offline' }
 * Requires: Admin JWT token
 */
router.put('/:id/status', (req, res) => {
  const { status } = req.body
  const validStatuses = ['available', 'on_trip', 'offline']
  
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      error: { message: 'Invalid status' }
    })
  }
  
  const driver = mockDrivers.find(d => d.id === req.params.id)
  if (!driver) {
    return res.status(404).json({
      success: false,
      error: { message: 'Driver not found' }
    })
  }
  
  driver.status = status
  
  res.json({
    success: true,
    driver,
    message: 'Driver status updated'
  })
})

module.exports = router
