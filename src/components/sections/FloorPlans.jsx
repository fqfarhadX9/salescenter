import { useRef, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import SmartImage from '../ui/SmartImage'
import FloorPlanDiagram from './FloorPlanDiagram'

export default function FloorPlans({ data }) {
  const [active, setActive] = useState(0)
  const tabsRef = useRef([])
  const plan = data.plans[active]

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
            <div role="tablist" aria-label="Villa types" className="flex w-full rounded-full bg-cream-100 p-1.5 ring-1 ring-gold-100 sm:inline-flex sm:w-auto" onKeyDown={onKeyDown}>
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
                    className={`flex-1 whitespace-nowrap rounded-full px-3 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-6 ${
                      selected ? 'bg-navy-900 text-white shadow-soft' : 'text-navy-800/70 hover:text-navy-900'
                    }`}
                  >
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
          className="mt-12 grid animate-zoom-in grid-cols-1 gap-6 rounded-card sm:gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10"
        >
          <div className="min-w-0 rounded-card bg-cream-50 p-4 ring-1 ring-cream-200 sm:p-8">
            {plan.image ? (
              <SmartImage src={plan.image} alt={`${plan.label} villa floor plan`} className="aspect-[16/10] rounded-lg bg-white" imgClassName="!object-contain" />
            ) : (
              <div className="-mx-1 overflow-x-auto px-1 pb-1">
                <div className="min-w-[540px] sm:min-w-0">
                  <FloorPlanDiagram variant={plan.variant} title={`${plan.label} villa`} />
                </div>
              </div>
            )}
          </div>

          <aside className="flex min-w-0 flex-col rounded-card bg-navy-900 p-7 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">Villa Type</p>
            <h3 className="mt-2 text-3xl font-semibold">{plan.label} Villa</h3>

            <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {plan.details.map((d) => (
                <div key={d.label} className="flex items-center justify-between py-3 text-sm">
                  <dt className="text-white/65">{d.label}</dt>
                  <dd className="font-semibold">{d.value}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 space-y-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-white/85">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-gold-500/20 text-gold-300">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <Button href="#enquire" variant="gold" className="group mt-8 w-full lg:mt-auto">
              Get Floor Plan & Price
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </aside>
        </div>
        <p className="mt-4 text-xs text-ink/50">
          <span className="sm:hidden">Swipe the plan to see more. </span>
          {data.disclaimer}
        </p>
      </div>
    </section>
  )
}
