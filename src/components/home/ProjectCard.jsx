import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import SmartImage from '../ui/SmartImage'

/** Home page card linking to a project's landing page at /<slug>. */
export default function ProjectCard({ project }) {
  const { card, slug } = project
  return (
    <Link
      to={`/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card bg-white shadow-soft ring-1 ring-navy-900/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift focus-visible:-translate-y-1.5"
      aria-label={`View ${card.title}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={card.image}
          alt={card.title}
          className="absolute inset-0 h-full w-full"
          imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          sizes="(min-width: 640px) 380px, 100vw"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />
        {card.tag && (
          <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
            {card.tag}
          </span>
        )}
        {card.developer && (
          <span className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-200">{card.developer}</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-semibold text-navy-900">{card.title}</h3>
        {card.location && (
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink/60">
            <MapPin className="h-4 w-4 text-gold-500" aria-hidden="true" />
            {card.location}
          </p>
        )}
        {card.summary && <p className="mt-3 text-sm leading-relaxed text-ink/70">{card.summary}</p>}

        {card.facts?.length > 0 && (
          <dl className="mt-5 grid grid-cols-3 gap-2 border-y border-cream-200 py-4">
            {card.facts.map((f) => (
              <div key={f.label} className="min-w-0">
                <dt className="text-[11px] uppercase tracking-wider text-ink/50">{f.label}</dt>
                <dd className="mt-0.5 text-sm font-semibold leading-snug text-navy-900">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <span className="mt-auto flex items-center justify-between pt-5 text-sm font-semibold text-navy-900">
          View Project
          <span className="grid h-10 w-10 place-items-center rounded-full bg-cream-100 text-gold-600 transition-all duration-300 group-hover:bg-navy-900 group-hover:text-gold-300">
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </span>
      </div>
    </Link>
  )
}
