import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import SmartImage from '../ui/SmartImage'

export default function WhyDubai({ data }) {
  return (
    <section id="why-dubai" className="relative isolate overflow-hidden bg-navy-950 py-20 sm:py-24 lg:py-32" aria-labelledby="whydubai-title">
      <SmartImage src={data.image} alt="Dubai skyline at night" className="!absolute inset-0 -z-10 h-full w-full" sizes="100vw" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/45" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-navy-950/90 to-transparent" />

      <div className="container-site">
        <SectionHeading id="whydubai-title" tone="light" eyebrow={data.eyebrow} title={data.title} description={data.description} />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(i % 3) * 90}
              className="group rounded-card border border-white/15 bg-white/[0.06] p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/60 hover:bg-white/[0.1]"
            >
              <span className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-gold-400/15 text-gold-300 ring-1 ring-gold-400/30 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-white">
                <Icon name={item.icon} className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
