import { useRef, useState } from 'react'
import { ArrowRight, Home } from 'lucide-react'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import SmartImage from '../ui/SmartImage'
import FloorPlanDiagram from './FloorPlanDiagram'

/**
 * Floor plans with unit tabs. Plans can be "locked": the image is blurred behind
 * an unlock card that sends visitors to the enquiry form (lead capture).
 */
export default function FloorPlans({ data }) {
  const [active, setActive] = useState(0)
  const tabsRef = useRef([])
  const plan = data.plans[active]
  const locked = plan.locked !== false && data.lockPlans !== false

  // WAI-ARIA tabs keyboard support
  const onKeyDown = (e) => {
    const last = data.plans.length - 1
    let next = null
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1
    if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = last
    if (next !== null) {
      e.preventDefault()
      setActive(next)
      tabsRef.current[next]?.focus()
    }
  }

  return (
    <section id="floor-plans" className="bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="floorplans-title">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="floorplans-title" eyebrow={data.eyebrow} title={data.title} description={data.description} />

          <Reveal>
            <div
              role="tablist"
              aria-label="Unit types"
              className="flex w-full rounded-full bg-cream-100 p-1.5 ring-1 ring-gold-100 sm:inline-flex sm:w-auto"
              onKeyDown={onKeyDown}
            >
              {data.plans.map((p, i) => {
                const selected = i === active
                return (
                  <button
                    key={p.id}
                    ref={(el) => (tabsRef.current[i] = el)}
                    role="tab"
                    id={`tab-${p.id}`}
                    aria-selected={selected}
                    aria-controls={`panel-${p.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={`flex min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-3 text-[13px] font-semibold sm:gap-2 sm:px-6 sm:text-sm transition-all duration-300 ${
                      selected ? 'bg-navy-900 text-white shadow-soft' : 'text-navy-800/70 hover:text-navy-900'
                    }`}
                  >
                    <Home className={`h-4 w-4 flex-none max-[374px]:hidden ${selected ? 'text-gold-300' : 'text-gold-500'}`} aria-hidden="true" />
                    {p.label}
                  </button>
                )
              })}
            </div>
          </Reveal>
        </div>

        <div
          key={plan.id}
          role="tabpanel"
          id={`panel-${plan.id}`}
          aria-labelledby={`tab-${plan.id}`}
          tabIndex={0}
          className="mt-12 grid animate-zoom-in grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8"
        >
          {/* Plan preview */}
          <div className="relative min-w-0 overflow-hidden rounded-card bg-white ring-1 ring-cream-200">
            <div className="relative aspect-[4/3] sm:aspect-[16/11]">
              {plan.image ? (
                <SmartImage
                  src={plan.image}
                  alt={locked ? `${plan.title} floor plan preview` : `${plan.title} floor plan`}
                  className="!absolute inset-0 h-full w-full !bg-white"
                  imgClassName={`!object-contain p-3 sm:p-6 transition-[filter] duration-500 ${locked ? 'blur-[2.5px] sm:blur-[3px]' : ''}`}
                />
              ) : (
                <div className={`absolute inset-0 p-6 ${locked ? 'blur-[3px]' : ''}`}>
                  <FloorPlanDiagram variant={plan.variant} title={plan.title} />
                </div>
              )}

              {locked && (
                <>
                  {/* Soft veil keeps the layout visible but details unreadable */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.08)_60%,rgba(255,255,255,0)_100%)]"
                  />
                </>
              )}
            </div>
          </div>

          {/* Unit info: size only */}
          <aside className="relative flex min-w-0 flex-col overflow-hidden rounded-card bg-navy-900 p-7 text-white sm:p-8">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-400/10 blur-2xl"
            />
            {plan.watermark && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 -right-3 select-none font-display text-[120px] font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgba(220,190,122,0.18)] lg:text-[140px]"
              >
                {plan.watermark}
              </span>
            )}
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">Unit Type</p>
            <h3 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">{plan.title}</h3>
            {plan.subtitle && <p className="mt-1 text-sm text-white/60">{plan.subtitle}</p>}

            <div className="mt-8 border-t border-white/10 pt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">{data.sizeLabel || 'Size'}</p>
              {plan.size?.sqft ? (
                <>
                  <p className="mt-3 flex flex-wrap items-baseline gap-x-2 font-display">
                    <span className="text-[44px] font-semibold leading-none text-gold-300 sm:text-5xl">{plan.size.sqft}</span>
                    <span className="text-lg font-medium text-white/80">sq ft</span>
                  </p>
                  {plan.size.sqm && <p className="mt-2 text-base text-white/60">{plan.size.sqm} sq m</p>}
                </>
              ) : (
                <p className="mt-3 font-display text-3xl font-semibold text-gold-300">On Request</p>
              )}
            </div>

            <Button href="#enquire" variant="gold" className="cta-anim group relative mt-8 w-full lg:mt-auto">
              Get Floor Plan &amp; Price
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </aside>
        </div>
        {data.disclaimer && <p className="mt-4 text-xs text-ink/50">{data.disclaimer}</p>}
      </div>
    </section>
  )
}
