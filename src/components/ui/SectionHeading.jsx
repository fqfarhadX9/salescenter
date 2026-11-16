import Reveal from './Reveal'

/** Eyebrow + title + optional description with the gold rule accent. */
export default function SectionHeading({ eyebrow, title, description, align = 'left', tone = 'dark', className = '', id }) {
  const centered = align === 'center'
  const titleColor = tone === 'light' ? 'text-white' : 'text-navy-900'
  const textColor = tone === 'light' ? 'text-white/75' : 'text-ink/70'

  return (
    <Reveal className={`${centered ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      {eyebrow && (
        <div className={`mb-4 flex items-center gap-4 ${centered ? 'justify-center' : ''}`}>
          <span className="gold-rule" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-500">{eyebrow}</span>
          {centered && <span className="gold-rule" />}
        </div>
      )}
      <h2 id={id} className={`text-3xl font-semibold leading-tight sm:text-4xl lg:text-[44px] ${titleColor}`}>
        {title}
      </h2>
      {description && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${textColor}`}>{description}</p>}
    </Reveal>
  )
}
