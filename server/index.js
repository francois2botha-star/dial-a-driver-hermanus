/**
 * Dial a Driver Hermanus - Backend API Server
 * 
 * This is a Node.js/Express backend skeleton demonstrating:
 * - RESTful API structure for booking management
 * - Form validation and error handling
 * - Pricing calculation logic
 * - Authentication (JWT) setup
 * 
 * Status: MVP Skeleton (not yet fully implemented)
 */

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const app = express()

// Middleware
app.use(helmet()) // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
app.use(limiter)

app.use(express.json())

// Routes
app.use('/api/bookings', require('./routes/bookings'))
app.use('/api/drivers', require('./routes/drivers'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/pricing', require('./routes/pricing'))
app.use('/api/health', require('./routes/health'))

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message || 'Internal server error',
      status: err.status || 500
    }
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: { message: 'Route not found', status: 404 }
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})

module.exports = app
