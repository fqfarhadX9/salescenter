/**
 * Lead submission.
 *
 * Posts enquiries as JSON to the endpoint in VITE_LEAD_ENDPOINT
 * (e.g. your CRM webhook, Zapier/Make hook, or backend route).
 *
 * If no endpoint is configured the lead is NOT sent anywhere: in
 * development it is logged to the console so the form flow can be
 * tested; in production the form shows an error so leads are never
 * silently lost.
 */
const ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT

export async function submitLead(data, { source = 'landing-page', project = '' } = {}) {
  const payload = {
    ...data,
    project,
    source,
    page: typeof window !== 'undefined' ? window.location.href : '',
    submittedAt: new Date().toISOString(),
    ...getUtmParams(),
  }

  if (!ENDPOINT) {
    if (import.meta.env.DEV) {
      console.info('[leadService] VITE_LEAD_ENDPOINT not set — lead logged locally only:', payload)
      await new Promise((r) => setTimeout(r, 700))
      return { ok: true, local: true }
    }
    throw new Error('Lead endpoint is not configured.')
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    // text/plain avoids a CORS preflight, which Google Apps Script web apps
    // don't support. The body is still JSON (parse it with JSON.parse).
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Lead submission failed (${res.status})`)
  return { ok: true }
}

function getUtmParams() {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid']
  return Object.fromEntries(keys.filter((k) => params.has(k)).map((k) => [k, params.get(k)]))
}
