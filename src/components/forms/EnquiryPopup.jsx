import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import EnquiryForm from './EnquiryForm'

/**
 * Pop-up enquiry form (same form as the "Request a Call Back" section at the bottom).
 * Esc, the X button or a click outside closes it. Focus moves into the form and back afterwards.
 */
export default function EnquiryPopup({ open, onClose, form, project, source, title, subtitle }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = scrollbar ? `${scrollbar}px` : ''
    // Focus the first field once the panel is on screen
    const t = setTimeout(() => (panelRef.current?.querySelector('input') || panelRef.current?.querySelector('button'))?.focus(), 60)

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      // Keep keyboard focus inside the pop-up
      if (e.key === 'Tab' && panelRef.current) {
        const items = panelRef.current.querySelectorAll('button, input, select, textarea, a[href]')
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      previouslyFocused?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex animate-fade-in items-end justify-center overflow-y-auto bg-navy-950/75 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-popup-title"
        className="relative w-full max-w-[520px] animate-zoom-in rounded-t-2xl bg-white p-6 shadow-lift sm:rounded-card sm:p-9"
      >
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 sm:rounded-t-card" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-navy-900/60 transition-colors hover:bg-cream-100 hover:text-navy-900"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <h3 id="enquiry-popup-title" className="pr-10 text-2xl font-semibold text-navy-900">
          {title || 'Request a Call Back'}
        </h3>
        <p className="mb-6 mt-1.5 text-sm text-ink/65">{subtitle || 'Get the latest prices and availability within minutes.'}</p>
        <EnquiryForm config={form} source={source} project={project} layout="grid" />
      </div>
    </div>,
    document.body,
  )
}
