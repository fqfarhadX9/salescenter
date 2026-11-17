import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to top on page change (keeps in-page #anchor jumps working). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}
