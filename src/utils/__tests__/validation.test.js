import {
  validateEmail,
  validatePhone,
  validateRequired,
  validateBookingForm,
  validateContactForm,
} from '../validation'

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe('')
      expect(validateEmail('user.name@company.co.za')).toBe('')
      expect(validateEmail('contact@dialadriverhermanus.co.za')).toBe('')
    })

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid')).toBeTruthy()
      expect(validateEmail('test@')).toBeTruthy()
      expect(validateEmail('@example.com')).toBeTruthy()
      expect(validateEmail('test @example.com')).toBeTruthy()
    })

    it('should handle empty email', () => {
      expect(validateEmail('')).toBeTruthy()
    })
  })

  describe('validatePhone', () => {
    it('should validate South African phone numbers', () => {
      expect(validatePhone('+27 64 799 7924')).toBe('')
      expect(validatePhone('0647997924')).toBe('')
      expect(validatePhone('+27647997924')).toBe('')
    })

    it('should reject invalid phone numbers', () => {
      expect(validatePhone('123')).toBeTruthy()
      expect(validatePhone('abc')).toBeTruthy()
      expect(validatePhone('')).toBeTruthy()
    })

    it('should handle formatting variations', () => {
      const validPhones = ['+27 64 799 7924', '+27-64-799-7924', '0647997924']
      validPhones.forEach((phone) => {
        expect(validatePhone(phone)).toBe('')
      })
    })
  })

  describe('validateRequired', () => {
    it('should accept non-empty strings', () => {
      expect(validateRequired('John Doe')).toBe('')
      expect(validateRequired('Message text')).toBe('')
    })

    it('should reject empty strings', () => {
      expect(validateRequired('')).toBeTruthy()
      expect(validateRequired('   ')).toBeTruthy()
    })
  })

  describe('validateBookingForm', () => {
    const validBooking = {
      pickupLocation: 'Hotel A',
      dropoffLocation: 'Airport',
      date: '2026-02-15',
      time: '10:00',
      passengers: '2',
      name: 'John Doe',
      phone: '+27 64 799 7924',
      email: 'john@example.com',
    }

    it('should validate correct booking data', () => {
      const errors = validateBookingForm(validBooking)
      expect(Object.keys(errors).length).toBe(0)
    })

    it('should detect missing required fields', () => {
      const incomplete = { ...validBooking, name: '' }
      const errors = validateBookingForm(incomplete)
      expect(errors.name).toBeTruthy()
    })

    it('should validate email in booking form', () => {
      const invalidEmail = { ...validBooking, email: 'invalid' }
      const errors = validateBookingForm(invalidEmail)
      expect(errors.email).toBeTruthy()
    })

    it('should validate phone in booking form', () => {
      const invalidPhone = { ...validBooking, phone: '123' }
      const errors = validateBookingForm(invalidPhone)
      expect(errors.phone).toBeTruthy()
    })
  })

  describe('validateContactForm', () => {
    const validContact = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+27 64 799 7924',
      message: 'I would like to book a chauffeur service.',
    }

    it('should validate correct contact data', () => {
      const errors = validateContactForm(validContact)
      expect(Object.keys(errors).length).toBe(0)
    })

    it('should detect missing required fields', () => {
      const incomplete = { ...validContact, message: '' }
      const errors = validateContactForm(incomplete)
      expect(errors.message).toBeTruthy()
    })

    it('should validate email in contact form', () => {
      const invalidEmail = { ...validContact, email: 'not-an-email' }
      const errors = validateContactForm(invalidEmail)
      expect(errors.email).toBeTruthy()
    })

    it('should require phone number', () => {
      const noPhone = { ...validContact, phone: '' }
      const errors = validateContactForm(noPhone)
      expect(errors.phone).toBeTruthy()
    })

    it('should return empty object for all valid fields', () => {
      const errors = validateContactForm(validContact)
      expect(errors).toEqual({})
    })
  })
})
