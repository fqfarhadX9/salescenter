import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import SmartImage from '../ui/SmartImage'

export default function Amenities({ data }) {
  return (
    <section id="amenities" className="bg-cream-100 py-20 sm:py-24 lg:py-28" aria-labelledby="amenities-title">
      <div className="container-site">
        <SectionHeading id="amenities-title" align="center" eyebrow={data.eyebrow} title={data.title} description={data.description} />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {data.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 3) * 90}>
              <article className="group relative aspect-[4/3] overflow-hidden rounded-card shadow-soft transition-shadow duration-500 hover:shadow-lift">
                <SmartImage
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full"
                  imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-white/10 text-gold-300 ring-1 ring-white/20 backdrop-blur-sm transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-white">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="mt-0 max-h-0 overflow-hidden text-sm leading-relaxed text-white/80 opacity-0 transition-all duration-500 group-hover:mt-3 group-hover:max-h-16 group-hover:opacity-100 group-focus-within:mt-3 group-focus-within:max-h-16 group-focus-within:opacity-100 max-lg:mt-3 max-lg:max-h-16 max-lg:opacity-100">
                    {item.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
