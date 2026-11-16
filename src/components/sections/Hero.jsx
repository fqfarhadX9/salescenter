import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import SmartImage from '../ui/SmartImage'
import EnquiryForm from '../forms/EnquiryForm'

export default function Hero({ hero, form }) {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-navy-950" aria-labelledby="hero-title">
      <SmartImage
        src={hero.image}
        alt="Luxury Dubai villa with private pool at dusk"
        priority
        className="!absolute inset-0 -z-10 h-full w-full"
        imgClassName="animate-slow-zoom"
      />
      {/* Overlays for legibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-navy-950/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-950/70 to-transparent" />

      <div className="container-site grid items-center gap-10 pb-16 pt-32 sm:pt-36 lg:min-h-[min(100svh,880px)] lg:grid-cols-[1fr_400px] lg:gap-16 lg:pb-20 lg:pt-32 xl:grid-cols-[1fr_420px]">
        <div className="max-w-2xl animate-fade-in">
          {/* <span className="mb-6 block h-px w-20 bg-gold-400" /> */}
          {/* <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">{hero.eyebrow}</p> */}
          <h1 id="hero-title" className="text-[42px] font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            {/* {hero.titleLine1} */}
            {/* <span className="text-gold-gradient block">{hero.titleLine2}</span> */}
            <span>PAY LIKE FOUR</span>
            <br/>
            <span className="text-gold-gradient">LIVE IN FIVE</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{hero.subtitle}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={hero.primaryCta.href} variant="light" size="lg" className="group">
              {hero.primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
            <Button href="#enquire" variant="outline" size="lg">
              Enquire Now
            </Button>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-white/15 border-t border-white/15 pt-6">
            {hero.stats.map((s) => (
              <div key={s.label} className="px-4 first:pl-0">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-xl font-semibold text-white sm:text-2xl">{s.value}</dd>
                <dd className="mt-1 text-xs text-white/65 sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* <div className="relative w-full rounded-card bg-white p-6 shadow-lift sm:p-8 lg:ml-auto">
          <span className="absolute inset-x-8 -top-px h-[3px] rounded-b bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300" />
          <h2 className="text-2xl font-semibold text-navy-900">{form.title}</h2>
          <p className="mb-6 mt-1.5 text-sm leading-relaxed text-ink/65">{form.subtitle}</p>
          <EnquiryForm config={form} source="hero-form" />
        </div> */}
      </div>
    </section>
  )
}
