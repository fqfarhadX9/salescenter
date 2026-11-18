import { useState } from 'react'
import assetUrl from '../../utils/assetUrl'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import SmartImage from '../ui/SmartImage'
import EnquiryForm from '../forms/EnquiryForm'
import HeroDesigned from './HeroDesigned'

export default function Hero({ hero, form, project, hideNavSpace = false }) {
  if (hero.mode === 'designed') return <HeroDesigned hero={hero} />
  if (hero.mode === 'image') return <HeroImageOnly hero={hero} />
  const showForm = hero.showForm !== false
  const centered = hero.align === 'center'
  const overlay = hero.overlay !== false
  const statsAtBottom = hero.statsPosition === 'bottom'
  const atTop = hero.position === 'top' // content sits in the upper part, leaving the image's lower half clear
  // Without the dark overlay, a soft shadow keeps text readable on bright images
  const shadow = overlay ? '' : '[text-shadow:0_2px_18px_rgba(0,0,0,0.55)]'
  return (
    <section id="top" className="relative isolate overflow-hidden bg-navy-950" aria-labelledby="hero-title">
      <SmartImage
        src={hero.image}
        srcSet={hero.imageSrcSet}
        sizes="100vw"
        alt={hero.imageAlt || 'Luxury waterfront villas at DAMAC Islands 2, Dubai'}
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
          aria-hidden=""
          className={`${
            centered
              ? atTop
                ? 'bg-[radial-gradient(ellipse_60%_55%_at_50%_34%,rgba(7,15,31,0.6)_0%,rgba(7,15,31,0.36)_50%,rgba(7,15,31,0)_82%)] max-sm:bg-[radial-gradient(ellipse_100%_55%_at_50%_38%,rgba(7,15,31,0.66)_0%,rgba(7,15,31,0.4)_55%,rgba(7,15,31,0.06)_100%)]'
                : 'bg-[radial-gradient(ellipse_62%_68%_at_50%_52%,rgba(7,15,31,0.62)_0%,rgba(7,15,31,0.4)_50%,rgba(7,15,31,0)_80%)] max-sm:bg-[radial-gradient(ellipse_95%_60%_at_50%_50%,rgba(7,15,31,0.66)_0%,rgba(7,15,31,0.4)_55%,rgba(7,15,31,0.08)_100%)]'
              : 'bg-[radial-gradient(ellipse_60%_70%_at_25%_50%,rgba(7,15,31,0.62)_0%,rgba(7,15,31,0)_80%)]'
          }`}
        />
      )}

      <div
        className={`container-site grid min-h-[min(100svh,760px)] items-center gap-10 ${hideNavSpace ? (atTop ? '!min-h-[100svh] !items-start content-start pb-12 pt-[6svh] sm:pt-[5svh]' : '!min-h-[100svh] content-center py-12 sm:py-16') : 'pb-14 pt-28 sm:min-h-0 sm:pb-16 sm:pt-36 lg:min-h-[min(100svh,880px)] lg:pb-20 lg:pt-32'} lg:gap-16 ${centered && !showForm ? 'justify-items-center' : ''} ${showForm ? 'lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_420px]' : ''}`}
      >
        <div className={`animate-fade-in ${centered ? 'mx-auto max-w-6xl text-center' : 'max-w-2xl'} ${shadow}`}>
          {/* {hero.logo?.src && <HeroLogo logo={hero.logo} centered={centered} compact={atTop} />} */}
          {hero.eyebrow && (
            <>
              <span className={`mb-6 block h-px w-20 bg-gold-400 ${centered ? 'mx-auto' : ''}`} />
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">{hero.eyebrow}</p>
            </>
          )}
          {/* <h1
            id="hero-title"
            className={`font-semibold text-white [text-wrap:balance] ${centered ? 'text-[30px] leading-[1.15] sm:text-[42px] lg:text-[48px] xl:whitespace-nowrap xl:text-[50px] xl:leading-[0.4]' : 'text-[42px] leading-[1.05] sm:text-6xl lg:text-7xl'}`}
          >
            {hero.titleLine1}{' '}
            <span
              className={`text-gold-gradient ${centered ? 'block xl:inline' : 'block'} ${overlay ? '' : '[text-shadow:none] drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]'}`}
            >
              {hero.titleLine2}
            </span>
          </h1> */}
          {/* <HeroSubtitle text={hero.subtitle} centered={centered} overlay={overlay} compact={atTop} /> */}
          {/* <HeroBadges badges={hero.badges} centered={centered} /> */}

          {/* <div
            className={`grid grid-cols-2 gap-3 sm:flex sm:flex-wrap ${atTop ? 'mt-7' : 'mt-8 sm:mt-9'} ${centered ? 'sm:justify-center' : ''}`}
          >
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
          </div> */}

          {/* {!statsAtBottom && <HeroStats stats={hero.stats} centered={centered} overlay={overlay} atTop={atTop} />} */}
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
      {/* {statsAtBottom && hero.stats?.length > 0 && (
        <div className="absolute inset-x-0 bottom-[4svh] z-10 flex justify-center px-4 sm:bottom-[5svh]">
          <HeroStats stats={hero.stats} centered overlay={overlay} panel />
        </div>
      )} */}
    </section>
  )
}

/** Project logo above the headline. Hides itself if the file is missing. */
function HeroLogo({ logo, centered, compact }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <img
      src={assetUrl(logo.src)}
      alt={logo.alt || ''}
      onError={() => setFailed(true)}
      className={`h-auto max-h-[var(--logo-h-sm)] w-auto max-w-[65%] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:max-h-[var(--logo-h)] ${compact ? 'mb-7 sm:mb-8' : 'mb-8 sm:mb-12'} ${centered ? 'mx-auto' : ''}`}
      style={{ '--logo-h': `${logo.height || 120}px`, '--logo-h-sm': `${Math.round((logo.height || 120) * 0.7)}px` }}
      fetchPriority="high"
    />
  )
}

/** Subtitle. Text containing " | " is shown as separate highlight items with gold dividers. */
function HeroSubtitle({ text, centered, overlay, compact }) {
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
      className={`mt-5 flex flex-col gap-2 text-base font-medium ${compact ? 'sm:mt-5' : 'sm:mt-7'} sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-0 sm:gap-y-2 sm:text-lg ${color} ${
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

/** Key facts row. `panel` = facts pinned over the image (no background box, strong text shadow). */
const COLS = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-2 sm:grid-cols-4', 5: 'grid-cols-3 sm:grid-cols-5' }

function HeroStats({ stats, centered, overlay, atTop, panel = false }) {
  if (!stats?.length) return null
  const line = overlay ? 'divide-white/15 border-white/15' : 'divide-white/40 border-white/40'
  const cols = COLS[stats.length] ?? 'grid-cols-2 sm:grid-cols-4'
  return (
    <dl
      className={
        panel
          ? `grid w-full max-w-4xl animate-fade-in gap-y-5 text-center [text-shadow:0_2px_10px_rgba(0,0,0,0.75),0_0_3px_rgba(0,0,0,0.6)] ${cols}`
          : `grid max-w-lg divide-x border-t ${cols} ${atTop ? 'mt-8 pt-5' : 'mt-10 pt-6 sm:mt-12'} ${line} ${centered ? 'mx-auto' : ''}`
      }
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={
            panel
              ? `px-3 sm:px-6 ${i > 0 ? 'sm:border-l sm:border-white/60' : ''} ${i % 2 === 1 ? 'max-sm:border-l max-sm:border-white/60' : ''}`
              : centered
                ? 'px-3 sm:px-5'
                : 'px-4 first:pl-0'
          }
        >
          <dt className="sr-only">{s.label}</dt>
          <dd className="font-display text-xl font-semibold leading-tight text-white sm:text-[26px]">{s.value}</dd>
          <dd className={`mt-1 text-sm font-medium sm:text-base ${overlay && !panel ? 'text-white/65' : 'text-white'}`}>{s.label}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Highlight boxes under the headline (e.g. offer + starting price). */
function HeroBadges({ badges, centered }) {
  if (!badges?.length) return null
  return (
    <ul className={`mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4 ${centered ? 'justify-center' : ''}`}>
      {badges.map((b) => (
        <li
          key={`${b.eyebrow}${b.value}${b.text}`}
          className="flex min-w-[150px] flex-1 flex-col items-center justify-center rounded-xl bg-navy-950/45 px-4 py-3 text-center ring-1 ring-gold-300/50 backdrop-blur-md sm:min-w-[230px] sm:flex-none sm:px-7 sm:py-4"
        >
          {b.eyebrow && (
            <span className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 sm:text-xs">{b.eyebrow}</span>
          )}
          <span className="font-display leading-tight">
            {b.value && (
              <span className="block text-2xl font-semibold text-gold-300 [text-shadow:none] drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] sm:inline sm:text-[26px]">
                {b.value}
              </span>
            )}
            {b.value && b.text && <span className="hidden sm:inline"> </span>}
            {b.text && <span className="block text-sm font-medium text-white sm:inline sm:text-lg">{b.text}</span>}
          </span>
        </li>
      ))}
    </ul>
  )
}

/**
 * Image-only hero for finished creatives that already contain the logo, headline and
 * offer text. The section takes the image's own shape, so nothing is ever cropped on
 * any screen. Optional `imageMobile` (portrait creative) is used on phones.
 */
function HeroImageOnly({ hero }) {
  const srcSet = hero.imageSrcSet?.map(([u, w]) => `${assetUrl(u)} ${w}w`).join(', ')
  const alt = hero.imageAlt || 'DAMAC Islands 2 waterfront villas in Dubai'
  const blurSrc = assetUrl(hero.imageSrcSet?.[0]?.[0] || hero.image)
  return (
    <section id="top" className="hero-creative" aria-labelledby="hero-title">
      {/* Headline for search engines and screen readers (the text is part of the image) */}
      <h1 id="hero-title" className="sr-only">
        {[hero.titleLine1, hero.titleLine2].filter(Boolean).join(' ')}
      </h1>
      {/* Soft blurred copy fills any space around the image on squarer screens */}
      <img src={blurSrc} alt="" aria-hidden="true" className="hero-creative__blur" decoding="async" />
      <picture>
        {hero.imageMobile && <source media="(max-width: 639px) and (orientation: portrait)" srcSet={assetUrl(hero.imageMobile)} />}
        <img
          src={assetUrl(hero.image)}
          srcSet={srcSet}
          sizes="100vw"
          alt={alt}
          width={hero.imageWidth || 2560}
          height={hero.imageHeight || 1136}
          fetchPriority="high"
          decoding="async"
          className="hero-creative__img animate-fade-in select-none"
          draggable="false"
        />
      </picture>
    </section>
  )
}
