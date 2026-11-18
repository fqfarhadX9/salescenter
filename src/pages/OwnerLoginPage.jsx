import { useEffect, useState } from 'react'
import { CircleAlert, LoaderCircle, Lock } from 'lucide-react'
import { getOwnerSession, ownerLogin } from '../services/authService'
import usePageMeta from '../hooks/usePageMeta'

/** Owner sign-in. Not linked anywhere on the public site and marked noindex. */
export default function OwnerLoginPage() {
  usePageMeta({ title: 'Owner sign in' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    // Keep search engines away from this page
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    // Already signed in? Go straight to the homepage.
    getOwnerSession().then((ok) => ok && window.location.replace('/'))
    return () => meta.remove()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (!username.trim() || !password) {
      setError('Please enter your username and password.')
      return
    }
    setStatus('loading')
    setError('')
    const res = await ownerLogin(username.trim(), password)
    if (res.ok) {
      // Full page load so the server-side gate serves the homepage
      window.location.replace('/')
      return
    }
    setPassword('')
    setError(res.error)
    setStatus('idle')
  }

  const input =
    'h-12 w-full rounded-lg border border-navy-900/15 bg-white px-4 text-[15px] text-ink focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200'

  return (
    <main className="grid min-h-screen place-items-center bg-navy-950 px-5">
      <form onSubmit={submit} noValidate className="w-full max-w-sm rounded-card bg-white p-8 shadow-lift" aria-labelledby="owner-login-title">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-navy-900 text-gold-300">
          <Lock className="h-5 w-5" aria-hidden="true" />
        </span>
        <h1 id="owner-login-title" className="mt-4 text-center text-2xl font-semibold text-navy-900">
          Owner sign in
        </h1>
        <div className="mt-6 space-y-3">
          <label className="block">
            <span className="sr-only">Username</span>
            <input className={input} placeholder="Username" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label className="block">
            <span className="sr-only">Password</span>
            <input
              className={input}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        {error && (
          <p role="alert" className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">
            <CircleAlert className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-gold-500 font-semibold text-white transition-colors hover:bg-gold-600 disabled:opacity-70"
        >
          {status === 'loading' ? (
            <>
              <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> Signing in…
            </>
          ) : (
            'Sign in'
          )}
        </button>
      </form>
    </main>
  )
}
