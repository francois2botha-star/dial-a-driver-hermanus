// Format price to ZAR currency
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(price)
}

// Format distance
export const formatDistance = (km) => {
  return `${km.toFixed(1)} km`
}

// Format time
export const formatTime = (minutes) => {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

// Format date to readable format
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-ZA', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Format time to HH:MM format
export const formatTimeHHMM = (timeString) => {
  if (!timeString) return ''
  const [hours, minutes] = timeString.split(':')
  return `${hours}:${minutes}`
}
