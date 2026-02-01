import {
  formatPrice,
  formatDistance,
  formatTime,
  formatDate,
  formatTimeHHMM,
} from '../formatting'

describe('Formatting Utilities', () => {
  describe('formatPrice', () => {
    it('should format prices with ZAR currency', () => {
      expect(formatPrice(100)).toBe('R100.00')
      expect(formatPrice(1500)).toBe('R1,500.00')
      expect(formatPrice(150.5)).toBe('R150.50')
    })

    it('should handle zero and negative amounts', () => {
      expect(formatPrice(0)).toBe('R0.00')
      expect(formatPrice(-50)).toContain('-')
    })

    it('should format large amounts with commas', () => {
      expect(formatPrice(10000)).toBe('R10,000.00')
      expect(formatPrice(1000000)).toBe('R1,000,000.00')
    })
  })

  describe('formatDistance', () => {
    it('should format distances in kilometers', () => {
      expect(formatDistance(5)).toBe('5 km')
      expect(formatDistance(12.5)).toBe('12.5 km')
      expect(formatDistance(0.5)).toBe('0.5 km')
    })

    it('should round to appropriate precision', () => {
      expect(formatDistance(5.678)).toMatch(/5\.(6|7)/)
    })
  })

  describe('formatTime', () => {
    it('should format time strings correctly', () => {
      const timeString = formatTime('10:30')
      expect(timeString).toContain('10')
      expect(timeString).toContain('30')
    })
  })

  describe('formatDate', () => {
    it('should format date strings', () => {
      const date = new Date('2026-02-15')
      const formatted = formatDate(date.toISOString())
      expect(formatted).toBeTruthy()
    })

    it('should handle date in YYYY-MM-DD format', () => {
      const formatted = formatDate('2026-02-15')
      expect(formatted).toBeTruthy()
    })
  })

  describe('formatTimeHHMM', () => {
    it('should format time in HH:MM format', () => {
      expect(formatTimeHHMM('10:30')).toBe('10:30')
      expect(formatTimeHHMM('9:45')).toMatch(/0?9:45/)
    })
  })
})
