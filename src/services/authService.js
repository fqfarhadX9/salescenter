/**
 * Owner authentication client.
 * The real checks happen on the server (public/api/auth/*.php) with an HttpOnly session cookie;
 * this file only calls those endpoints. No credentials or secrets live in the browser bundle.
 */
const API = '/api/auth'

async function call(path, options = {}) {
  const res = await fetch(`${API}/${path}`, {
    credentials: 'same-origin',
    cache: 'no-store',
    headers: { Accept: 'application/json', ...(options.body ? { 'Content-Type': 'application/json' } : {}) },
    ...options,
  })
  let data = null
  try {
    data = await res.json()
  } catch {
    /* non-JSON (e.g. PHP not available) */
  }
  return { ok: res.ok, status: res.status, data }
}

/** Returns true only if the server confirms a valid, unexpired owner session. */
export async function getOwnerSession() {
  try {
    const { ok, data } = await call('session.php')
    return ok && data?.authenticated === true
  } catch {
    return false
  }
}

export async function ownerLogin(username, password) {
  try {
    const { ok, status, data } = await call('login.php', { method: 'POST', body: JSON.stringify({ username, password }) })
    if (ok && data?.ok) return { ok: true }
    if (status === 401) return { ok: false, error: 'Invalid username or password.' }
    return { ok: false, error: data?.error || 'Login is unavailable right now. Please try again.' }
  } catch {
    return { ok: false, error: 'Network error. Please check your connection and try again.' }
  }
}

export async function ownerLogout() {
  try {
    await call('logout.php', { method: 'POST' })
  } catch {
    /* ignore — we navigate away regardless */
  }
}
