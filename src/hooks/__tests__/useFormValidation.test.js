import { renderHook, act } from '@testing-library/react'
import { useFormValidation } from '../useFormValidation'

describe('useFormValidation Hook', () => {
  it('should initialize with empty values and no errors', () => {
    const { result } = renderHook(() =>
      useFormValidation(
        { name: '', email: '', phone: '' },
        (data) => ({})
      )
    )

    expect(result.current.values).toEqual({ name: '', email: '', phone: '' })
    expect(result.current.errors).toEqual({})
  })

  it('should handle input changes', () => {
    const { result } = renderHook(() =>
      useFormValidation({ name: '' }, (data) => ({}))
    )

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John Doe' },
      })
    })

    expect(result.current.values.name).toBe('John Doe')
  })

  it('should set errors from validation function', () => {
    const mockValidate = (data) => {
      const errors = {}
      if (!data.name) errors.name = 'Name is required'
      return errors
    }

    const { result } = renderHook(() =>
      useFormValidation({ name: '' }, mockValidate)
    )

    act(() => {
      result.current.setErrors({ name: 'Name is required' })
    })

    expect(result.current.errors).toEqual({ name: 'Name is required' })
  })

  it('should reset form values and errors', () => {
    const { result } = renderHook(() =>
      useFormValidation({ name: 'John', email: 'test@example.com' }, () => ({}))
    )

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Jane' },
      })
    })

    expect(result.current.values.name).toBe('Jane')

    act(() => {
      result.current.reset()
    })

    expect(result.current.values).toEqual({ name: 'John', email: 'test@example.com' })
  })

  it('should set loading state during submission', () => {
    const mockValidate = () => ({})
    const mockOnSubmit = async () => {}

    const { result } = renderHook(() =>
      useFormValidation({ name: '' }, mockValidate, mockOnSubmit)
    )

    expect(result.current.loading).toBe(false)
  })
})
