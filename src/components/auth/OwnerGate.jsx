import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getOwnerSession } from '../../services/authService'

export const PUBLIC_LANDING = '/damac-island'

/**
 * Client-side companion to the server gate (public/api/auth/home-gate.php).
 * The server already blocks unauthenticated requests to "/"; this covers in-app navigation
 * by asking the server whether the HttpOnly owner session is still valid.
 */
export default function OwnerGate({ children }) {
  const { search } = useLocation()
  const [state, setState] = useState('checking')

  useEffect(() => {
    let alive = true
    getOwnerSession().then((ok) => alive && setState(ok ? 'allowed' : 'denied'))
    return () => {
      alive = false
    }
  }, [])

  if (state === 'checking') return <div className="min-h-screen bg-navy-950" aria-busy="true" />
  if (state === 'denied') return <Navigate to={`${PUBLIC_LANDING}${search}`} replace />
  return children
}
