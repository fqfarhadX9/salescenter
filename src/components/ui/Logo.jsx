/** Brand mark: renders a supplied logo image, or the built-in skyline mark. */
export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
        <path d="M8 42V22l6-4.5V42" />
        <path d="M14 42V10l8-5v37" />
        <path d="M22 42V18l8 5v19" />
        <path d="M30 42V29l7 3.5V42" />
        <path d="M4 42h40" />
      </g>
    </svg>
  )
}

export default function Logo({ name, subtitle, logoSrc, tone = 'light', className = '' }) {
  const textColor = tone === 'light' ? 'text-white' : 'text-navy-900'
  if (logoSrc) {
    return <img src={logoSrc} alt={name} className={`h-10 w-auto ${className}`} />
  }
  return (
    <span className={`flex items-center gap-2.5 whitespace-nowrap sm:gap-3 ${className}`}>
      <LogoMark className="h-8 w-8 flex-none text-gold-400 sm:h-9 sm:w-9" />
      <span className="leading-none">
        <span className={`block font-display text-base font-semibold uppercase tracking-[0.12em] sm:text-lg sm:tracking-[0.18em] ${textColor}`}>{name}</span>
        {subtitle && <span className="mt-1 block text-[9px] font-medium uppercase tracking-[0.28em] sm:text-[10px] sm:tracking-[0.32em] text-gold-400">{subtitle}</span>}
      </span>
    </span>
  )
}
