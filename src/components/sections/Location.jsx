import { Expand } from 'lucide-react'
import assetUrl from '../../utils/assetUrl'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'

/**
 * Location section: area map on the left, heading + travel times on the right.
 * Content lives in the project config under `location`.
 */
export default function Location({ data }) {
  if (!data) return null
  const centered = data.layout === 'centered' // heading + text centred on top; map left, travel times right

  const header = (
    <Reveal className={centered ? 'mx-auto max-w-3xl text-center' : undefined}>
      {data.eyebrow && (
        <div className={`mb-4 flex items-center gap-4 ${centered ? 'justify-center' : ''}`}>
          <span className="gold-rule" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">{data.eyebrow}</span>
          {centered && <span className="gold-rule" />}
        </div>
      )}
      <h2 id="location-title" className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-[42px]">
        {data.title}
      </h2>
      {data.description && <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">{data.description}</p>}
    </Reveal>
  )
  return (
    <section id="location" className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-24 lg:py-28" aria-labelledby="location-title">
      {/* Soft gold glow for depth */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-gold-400/10 blur-3xl" />

      {centered && <div className="container-site relative mb-12 lg:mb-14">{header}</div>}
      <div className="container-site relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* Map */}
        {data.map && (
          <Reveal>
            <a
              href={assetUrl(data.map)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-card shadow-lift ring-1 ring-white/10"
              aria-label="Open the location map in full size"
            >
              <img
                src={assetUrl(data.map)}
                alt={data.mapAlt || ''}
                width="998"
                height="818"
                loading="lazy"
                decoding="async"
                className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="shine shine--strong absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-navy-900/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition-colors group-hover:bg-gold-500">
                <Expand className="h-3.5 w-3.5" aria-hidden="true" /> View map
              </span>
            </a>
          </Reveal>
        )}

        {/* Content */}
        <div>
          {!centered && header}

          <ul className={`grid gap-4 sm:grid-cols-2 ${centered ? '' : 'mt-9'}`}>
            {data.items.map((item, i) => (
              <Reveal
                as="li"
                key={item.name}
                delay={i * 80}
                style={{ '--shine-delay': `${i * 0.5}s` }}
                className="shine group relative flex items-start gap-4 rounded-card border border-white/15 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-gold-300/60 hover:bg-white/[0.07]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-400/15 text-gold-300 ring-1 ring-gold-300/30">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold leading-snug text-white">{item.name}</span>
                  <span className="mt-2 block text-sm text-white/60">
                    Approx. <span className="font-display text-xl font-bold text-gold-200">{item.time}</span>
                  </span>
                </span>
              </Reveal>
            ))}
          </ul>

          {data.note && <p className="mt-6 text-xs italic text-white/50">{data.note}</p>}
        </div>
      </div>
    </section>
  )
}
