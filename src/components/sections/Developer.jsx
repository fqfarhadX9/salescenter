import Icon from '../ui/Icon'
import { LogoMark } from '../ui/Logo'
import Reveal from '../ui/Reveal'

export default function Developer({ data }) {
  return (
    <section id="developer" className="bg-cream-100 py-20 sm:py-24 lg:py-28" aria-labelledby="developer-title">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-16">
          <Reveal className="flex flex-col items-center justify-center rounded-card bg-white p-10 text-center shadow-soft lg:items-start lg:text-left">
            {data.logoSrc ? (
              <img src={data.logoSrc} alt={`${data.name} logo`} className="h-20 w-auto" />
            ) : (
              <>
                <LogoMark className="h-20 w-20 text-gold-500" />
                <p className="mt-4 font-display text-sm font-semibold uppercase tracking-[0.35em] text-navy-900">{data.name}</p>
              </>
            )}
            <dl className="mt-8 grid w-full grid-cols-3 gap-2 border-t border-cream-200 pt-6 lg:grid-cols-1 lg:gap-5">
              {data.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{s.value}</dd>
                  <dd className="text-xs text-ink/60 sm:text-sm">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="flex flex-col justify-center">
            <Reveal>
              <div className="mb-4 flex items-center gap-4">
                <span className="gold-rule" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-500">{data.eyebrow}</span>
              </div>
              <h2 id="developer-title" className="text-2xl font-semibold leading-snug text-navy-900 sm:text-3xl lg:text-4xl lg:leading-tight">
                {data.intro}
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink/70 sm:text-lg">{data.body}</p>
            </Reveal>

            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {data.pillars.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.title}
                  delay={i * 90}
                  className="group rounded-card border border-gold-100 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold-300 hover:shadow-soft"
                >
                  <Icon name={p.icon} className="h-9 w-9 text-gold-500 transition-transform duration-500 group-hover:scale-110" />
                  <h3 className="mt-4 text-base font-semibold text-navy-900">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{p.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
