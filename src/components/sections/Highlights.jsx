import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import SmartImage from '../ui/SmartImage'

export default function Highlights({ data }) {
  return (
    <section id="highlights" className="bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="highlights-title">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative">
          <SmartImage
            src={data.image}
            alt="Contemporary villa exterior with landscaped driveway"
            className="aspect-[4/3] rounded-card shadow-lift lg:aspect-[5/4]"
            sizes="(min-width: 1024px) 600px, 100vw"
          />
          <div className="absolute -bottom-6 right-6 rounded-card bg-navy-900 px-6 py-4 text-white shadow-lift sm:right-8">
            <p className="font-display text-2xl font-semibold text-gold-300">{data.imageBadge.value}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">{data.imageBadge.label}</p>
          </div>
          <span aria-hidden="true" className="absolute -left-4 -top-4 -z-10 hidden h-32 w-32 rounded-card border border-gold-300 lg:block" />
        </Reveal>

        <div>
          <SectionHeading id="highlights-title" eyebrow={data.eyebrow} title={data.title} description={data.description} />
          <ul className="mt-8 space-y-[18px] sm:mt-6 sm:space-y-2">
            {data.items.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 70} className="flex items-center gap-4 sm:gap-5">
                <Icon name={item.icon} strokeWidth={1.4} className="h-6 w-6 flex-none text-gold-500 sm:h-7 sm:w-7" />
                <div>
                  <h3 className="text-base font-semibold text-navy-900 sm:text-lg">{item.title}</h3>
                  {item.text && <p className="mt-1 text-sm leading-relaxed text-ink/65">{item.text}</p>}
                </div>
              </Reveal>
            ))}
          </ul>

          {data.ctas?.length > 0 && (
            <Reveal delay={data.items.length * 70} className="mt-10 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              {data.ctas.map((cta, i) => (
                <Button
                  key={cta.label}
                  href={cta.href}
                  variant={i === 0 ? 'gold' : 'outlineDark'}
                  size="md"
                  className={`group w-full sm:w-auto sm:min-w-[200px] ${i === 0 ? '' : 'bg-white'}`}
                >
                  {cta.label}
                  {i === 0 && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />}
                </Button>
              ))}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
