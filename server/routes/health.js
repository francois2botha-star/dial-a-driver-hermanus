/**
 * Health Check Route
 * Simple endpoint to verify server is running
 */

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

module.exports = router
