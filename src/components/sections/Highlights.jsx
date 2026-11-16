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
          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {data.items.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 70} className="group flex gap-4">
                <span className="grid h-14 w-14 flex-none place-items-center rounded-full bg-cream-100 text-gold-500 ring-1 ring-gold-200 transition-all duration-300 group-hover:bg-navy-900 group-hover:text-gold-300 group-hover:ring-navy-900">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-navy-900">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/65">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
