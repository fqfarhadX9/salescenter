import { useCallback, useMemo, useState } from 'react'
import { Expand } from 'lucide-react'
import Lightbox from '../ui/Lightbox'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import SmartImage from '../ui/SmartImage'

// Bento-style spans for a premium editorial rhythm (desktop only)
const SPANS = ['col-span-2 lg:row-span-2', '', '', '', '', 'lg:col-span-2', '', 'col-span-2 lg:col-span-1']

export default function Gallery({ data }) {
  const categories = useMemo(() => ['All', ...new Set(data.images.map((i) => i.category))], [data.images])
  const [filter, setFilter] = useState('All')
  const [openIndex, setOpenIndex] = useState(null)

  const images = useMemo(() => (filter === 'All' ? data.images : data.images.filter((i) => i.category === filter)), [filter, data.images])

  const navigate = useCallback((dir) => setOpenIndex((i) => (i + dir + images.length) % images.length), [images.length])
  const close = useCallback(() => setOpenIndex(null), [])

  return (
    <section id="gallery" className="bg-cream-50 py-20 sm:py-24 lg:py-28" aria-labelledby="gallery-title">
      <div className="container-site">
        <SectionHeading id="gallery-title" align="center" eyebrow={data.eyebrow} title={data.title} description={data.description} />

        <Reveal className="mt-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter gallery">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                filter === c ? 'bg-navy-900 text-white' : 'bg-white text-navy-800/75 ring-1 ring-navy-900/10 hover:text-navy-900 hover:ring-gold-300'
              }`}
            >
              {c}
            </button>
          ))}
        </Reveal>

        <ul className="mt-10 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[240px] sm:gap-4 lg:auto-rows-[230px] lg:grid-cols-4">
          {images.map((img, i) => (
            <li key={img.src} className={`${filter === 'All' ? SPANS[i % SPANS.length] : ''} animate-fade-in`}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative block h-full w-full overflow-hidden rounded-card text-left shadow-soft"
                aria-label={`Open image: ${img.alt}`}
              >
                <SmartImage
                  src={img.src}
                  alt={img.alt}
                  className="!absolute inset-0 h-full w-full"
                  imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-3 left-3 rounded-full sm:bottom-4 sm:left-4 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy-900">{img.category}</span>
                <span className="absolute right-4 top-4 grid h-10 w-10 scale-75 place-items-center rounded-full bg-gold-500 text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                  <Expand className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {openIndex !== null && <Lightbox images={images} index={openIndex} onClose={close} onNavigate={navigate} />}
    </section>
  )
}
