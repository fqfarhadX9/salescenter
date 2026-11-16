import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

/** Accessible image lightbox: Esc to close, arrows to navigate, swipe on touch. */
export default function Lightbox({ images, index, onClose, onNavigate }) {
  const closeRef = useRef(null)
  const touchX = useRef(null)
  const image = images[index]

  useEffect(() => {
    const previouslyFocused = document.activeElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(1)
      if (e.key === 'ArrowLeft') onNavigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onNavigate])

  // Preload neighbours for instant navigation
  useEffect(() => {
    ;[1, -1].forEach((d) => {
      const n = images[(index + d + images.length) % images.length]
      if (n) new Image().src = n.src
    })
  }, [index, images])

  if (!image) return null

  const navBtn =
    'absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-gold-500 sm:h-14 sm:w-14'

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${images.length}: ${image.alt}`}
      className="fixed inset-0 z-[100] flex animate-fade-in items-center justify-center bg-navy-950/95 p-4 backdrop-blur-sm sm:p-10"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) onNavigate(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <button ref={closeRef} type="button" onClick={onClose} aria-label="Close gallery" className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-gold-500">
        <X className="h-6 w-6" />
      </button>

      <button type="button" onClick={() => onNavigate(-1)} aria-label="Previous image" className={`${navBtn} left-3 sm:left-6`}>
        <ChevronLeft className="h-6 w-6" />
      </button>

      <figure key={image.src} className="flex max-h-full max-w-6xl animate-zoom-in flex-col items-center">
        <img src={image.src} alt={image.alt} className="max-h-[78vh] w-auto rounded-lg object-contain shadow-lift" />
        <figcaption className="mt-4 flex items-center gap-3 text-sm text-white/80">
          <span className="rounded-full bg-gold-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-200">{image.category}</span>
          {image.alt}
          <span className="text-white/45">
            {index + 1} / {images.length}
          </span>
        </figcaption>
      </figure>

      <button type="button" onClick={() => onNavigate(1)} aria-label="Next image" className={`${navBtn} right-3 sm:right-6`}>
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>,
    document.body,
  )
}
