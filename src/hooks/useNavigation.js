import { useCallback } from 'react'

// Custom hook to handle navigation within the SPA
export const useNavigation = (onNavigate) => {
  const navigate = useCallback((section) => {
    onNavigate(section)
    window.location.hash = section
  }, [onNavigate])

  return navigate
}
