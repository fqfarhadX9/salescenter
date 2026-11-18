import { useState } from 'react'
import { LogOut, ShieldCheck } from 'lucide-react'
import { ownerLogout } from '../../services/authService'
import { PUBLIC_LANDING } from './OwnerGate'

/** Small floating pill shown only to the signed-in owner on the homepage, with a Log out button. */
export default function OwnerBar() {
  const [busy, setBusy] = useState(false)
  const logout = async () => {
    setBusy(true)
    await ownerLogout()
    window.location.replace(PUBLIC_LANDING)
  }
  return (
    <div className="fixed bottom-4 right-4 z-[60] flex items-center gap-2 rounded-full bg-navy-900/95 py-1.5 pl-4 pr-1.5 text-xs font-semibold text-white shadow-lift ring-1 ring-gold-400/40 backdrop-blur">
      <span className="flex items-center gap-1.5">
        <ShieldCheck className="h-4 w-4 text-gold-300" aria-hidden="true" /> Owner view
      </span>
      <button
        type="button"
        onClick={logout}
        disabled={busy}
        className="flex items-center gap-1.5 rounded-full bg-gold-500 px-3 py-1.5 text-navy-950 transition-colors hover:bg-gold-400 disabled:opacity-60"
      >
        <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
        {busy ? 'Logging out…' : 'Log out'}
      </button>
    </div>
  )
}
