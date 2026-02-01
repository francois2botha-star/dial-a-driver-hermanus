// Email validation
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// Phone validation for South African numbers
export const validatePhone = (phone) => {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  return regex.test(phone.replace(/\s/g, ''))
}

// Generic text validation
export const validateRequired = (value) => {
  return value && value.trim().length > 0
}

// Validate booking form
export const validateBookingForm = (formData) => {
  const errors = {}
  
  if (!validateRequired(formData.name)) errors.name = 'Name is required'
  if (!validateRequired(formData.pickupLocation)) errors.pickupLocation = 'Pickup location is required'
  if (!validateRequired(formData.dropoffLocation)) errors.dropoffLocation = 'Dropoff location is required'
  if (!validateRequired(formData.date)) errors.date = 'Date is required'
  if (!validateRequired(formData.time)) errors.time = 'Time is required'
  if (!validatePhone(formData.phone)) errors.phone = 'Valid phone number is required'
  if (!validateEmail(formData.email)) errors.email = 'Valid email is required'
  
  return errors
}

// Validate contact form
export const validateContactForm = (formData) => {
  const errors = {}
  
  if (!validateRequired(formData.name)) errors.name = 'Name is required'
  if (!validateEmail(formData.email)) errors.email = 'Valid email is required'
  if (!validateRequired(formData.subject)) errors.subject = 'Subject is required'
  if (!validateRequired(formData.message) || formData.message.length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }
  
  return errors
}
