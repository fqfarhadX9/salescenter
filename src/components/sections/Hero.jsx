import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import SmartImage from '../ui/SmartImage'
import EnquiryForm from '../forms/EnquiryForm'

export default function Hero({ hero, form, project, hideNavSpace = false }) {
  const showForm = hero.showForm !== false
  const centered = hero.align === 'center'
  const overlay = hero.overlay !== false
  // Without the dark overlay, a soft shadow keeps text readable on bright images
  const shadow = overlay ? '' : '[text-shadow:0_2px_18px_rgba(0,0,0,0.55)]'
  return (
    <section id="top" className="relative isolate overflow-hidden bg-navy-950" aria-labelledby="hero-title">
      <SmartImage
        src={hero.image}
        alt="Luxury Dubai villa with private pool at dusk"
        priority
        className="!absolute inset-0 -z-10 h-full w-full"
        imgClassName="animate-slow-zoom"
      />
      {/* Overlays for legibility (set hero.overlay: false to remove) */}
      {overlay && (
        <>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-navy-950/20" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-950/70 to-transparent" />
        </>
      )}
      {/* Soft spotlight only behind the text: image stays bright, text stays readable (hero.textBackdrop: false to remove) */}
      {!overlay && hero.textBackdrop !== false && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -z-10 ${
            centered
              ? 'bg-[radial-gradient(ellipse_62%_68%_at_50%_52%,rgba(7,15,31,0.62)_0%,rgba(7,15,31,0.4)_50%,rgba(7,15,31,0)_80%)] max-sm:bg-[radial-gradient(ellipse_95%_60%_at_50%_50%,rgba(7,15,31,0.66)_0%,rgba(7,15,31,0.4)_55%,rgba(7,15,31,0.08)_100%)]'
              : 'bg-[radial-gradient(ellipse_60%_70%_at_25%_50%,rgba(7,15,31,0.62)_0%,rgba(7,15,31,0)_80%)]'
          }`}
        />
      )}

      <div
        className={`container-site grid min-h-[min(100svh,760px)] items-center gap-10 ${hideNavSpace ? '!min-h-[100svh] content-center py-12 sm:py-16' : 'pb-14 pt-28 sm:min-h-0 sm:pb-16 sm:pt-36 lg:min-h-[min(100svh,880px)] lg:pb-20 lg:pt-32'} lg:gap-16 ${centered && !showForm ? 'justify-items-center' : ''} ${showForm ? 'lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_420px]' : ''}`}
      >
        <div className={`animate-fade-in ${centered ? 'mx-auto max-w-4xl text-center' : 'max-w-2xl'} ${shadow}`}>
          {hero.logo?.src && <HeroLogo logo={hero.logo} centered={centered} />}
          {hero.eyebrow && (
            <>
              <span className={`mb-6 block h-px w-20 bg-gold-400 ${centered ? 'mx-auto' : ''}`} />
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">{hero.eyebrow}</p>
            </>
          )}
          <h1
            id="hero-title"
            className={`font-semibold leading-[1.05] text-white [text-wrap:balance] ${centered ? 'text-[36px] sm:text-[52px] lg:text-[68px]' : 'text-[42px] sm:text-6xl lg:text-7xl'}`}
          >
            {hero.titleLine1}
            <span className={`text-gold-gradient block ${overlay ? '' : '[text-shadow:none] drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]'}`}>
              {hero.titleLine2}
            </span>
          </h1>
          <HeroSubtitle text={hero.subtitle} centered={centered} overlay={overlay} />

          <div className={`mt-8 grid grid-cols-2 gap-3 sm:mt-9 sm:flex sm:flex-wrap ${centered ? 'sm:justify-center' : ''}`}>
            <Button
              href={hero.primaryCta.href}
              variant="light"
              size="lg"
              className="group !h-12 !px-4 text-[15px] sm:!h-14 sm:!px-8 sm:text-base"
            >
              {hero.primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 max-[379px]:hidden" aria-hidden="true" />
            </Button>
            <Button href="#enquire" variant="outline" size="lg" className="!h-12 !px-4 text-[15px] sm:!h-14 sm:!px-8 sm:text-base">
              Get the Borchure
            </Button>
          </div>

          <dl
            className={`mt-10 grid max-w-lg grid-cols-3 divide-x border-t pt-6 sm:mt-12 ${overlay ? 'divide-white/15 border-white/15' : 'divide-white/40 border-white/40'} ${centered ? 'mx-auto' : ''}`}
          >
            {hero.stats.map((s) => (
              <div key={s.label} className={centered ? 'px-4' : 'px-4 first:pl-0'}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-xl font-semibold text-white sm:text-2xl">{s.value}</dd>
                <dd className={`mt-1 text-xs sm:text-sm ${overlay ? 'text-white/65' : 'text-white/90'}`}>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {showForm && (
          <div className="relative w-full rounded-card bg-white p-6 shadow-lift sm:p-8 lg:ml-auto">
            <span className="absolute inset-x-8 -top-px h-[3px] rounded-b bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300" />
            <h2 className="text-2xl font-semibold text-navy-900">{form.title}</h2>
            <p className="mb-6 mt-1.5 text-sm leading-relaxed text-ink/65">{form.subtitle}</p>
            <EnquiryForm config={form} source={`${project}-hero-form`} project={project} />
          </div>
        )}
      </div>
    </section>
  )
}

/** Project logo above the headline. Hides itself if the file is missing. */
function HeroLogo({ logo, centered }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <img
      src={logo.src}
      alt={logo.alt || ''}
      onError={() => setFailed(true)}
      className={`mb-6 h-auto max-h-[var(--logo-h-sm)] w-auto max-w-[75%] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:mb-8 sm:max-h-[var(--logo-h)] ${centered ? 'mx-auto' : ''}`}
      style={{ '--logo-h': `${logo.height || 120}px`, '--logo-h-sm': `${Math.round((logo.height || 120) * 0.7)}px` }}
      fetchPriority="high"
    />
  )
}

/** Subtitle. Text containing " | " is shown as separate highlight items with gold dividers. */
function HeroSubtitle({ text, centered, overlay }) {
  if (!text) return null
  const color = overlay ? 'text-white/85' : 'text-white'
  const items = text
    .split('|')
    .map((t) => t.trim())
    .filter(Boolean)

  if (items.length < 2) {
    return <p className={`mt-5 max-w-xl text-base leading-relaxed sm:mt-6 sm:text-lg ${color} ${centered ? 'mx-auto' : ''}`}>{text}</p>
  }

  return (
    <ul
      className={`mt-5 flex flex-col gap-2 text-base font-medium sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-0 sm:gap-y-2 sm:text-lg ${color} ${
        centered ? 'items-center sm:justify-center' : ''
      }`}
    >
      {items.map((item, i) => (
        <li key={item} className="flex items-center">
          {i > 0 && <span aria-hidden="true" className="mx-4 hidden h-1.5 w-1.5 rotate-45 bg-gold-400 sm:inline-block" />}
          <span className="sm:whitespace-nowrap">{item}</span>
        </li>
      ))}
    </ul>
  )
}
