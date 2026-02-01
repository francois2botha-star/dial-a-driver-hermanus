import { useState, useCallback } from 'react'

// Custom hook for form validation and state management
export const useFormValidation = (initialValues, onSubmit, validate) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }, [errors])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    
    // Validate
    const newErrors = validate(values)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setSuccess(false)
    setMessage('')

    try {
      await onSubmit(values)
      setSuccess(true)
      setMessage('Form submitted successfully!')
      setValues(initialValues)
      setErrors({})
    } catch (err) {
      setSuccess(false)
      setMessage(err.message || 'Error submitting form. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [values, validate, onSubmit, initialValues])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setLoading(false)
    setSuccess(false)
    setMessage('')
  }, [initialValues])

  return {
    values,
    errors,
    loading,
    success,
    message,
    handleChange,
    handleSubmit,
    reset,
    setValues,
    setErrors
  }
}
