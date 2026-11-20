import Icon from '../ui/Icon'
import assetUrl from '../../utils/assetUrl'
import { LogoMark } from '../ui/Logo'
import Reveal from '../ui/Reveal'

export default function Developer({ data }) {
  return (
    <section id="developer" className="bg-cream-100 py-20 sm:py-24 lg:py-28" aria-labelledby="developer-title">
      <div className="container-site">
        {/* Logo (top-left) + introduction */}
        <div className="grid items-center gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
          <Reveal className="flex flex-col items-center justify-center rounded-card bg-navy-900 px-8 py-10 text-center shadow-soft sm:py-12">
            {data.logoSrc ? (
              <img src={assetUrl(data.logoSrc)} alt={`${data.name} logo`} className="h-auto max-h-24 w-auto max-w-full" loading="lazy" />
            ) : (
              <LogoMark className="h-20 w-20 text-gold-400" />
            )}
            <span className="mt-6 block h-px w-12 bg-gold-400" />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-300">by {data.name}</p>
          </Reveal>

          <Reveal>
            <div className="mb-4 flex items-center gap-4">
              <span className="gold-rule" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-500">{data.eyebrow}</span>
            </div>
            <h2 id="developer-title" className="text-2xl font-semibold leading-snug text-navy-900 sm:text-3xl lg:text-4xl lg:leading-tight">
              {data.intro}
            </h2>
            {/* body: a string, or an array of paragraphs */}
            {[].concat(data.body || []).map((para) => (
              <p key={para} className="mt-5 max-w-3xl text-base leading-relaxed text-ink/70 sm:text-lg">
                {para}
              </p>
            ))}
          </Reveal>
        </div>

        {/* Key figures with icons */}
        {data.stats?.length > 0 && (
          <>
            <dl className={`mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-16 max-sm:[&>*:last-child:nth-child(odd)]:col-span-2 ${data.stats.length === 3 ? 'sm:grid-cols-3' : 'lg:grid-cols-4'}`}>
              {data.stats.map((s, i) => (
                <Reveal
                  key={s.label}
                  delay={i * 80}
                  className="flex flex-col items-center rounded-card bg-white px-4 py-8 text-center shadow-soft ring-1 ring-navy-900/5 sm:py-10"
                >
                  {s.icon && <Icon name={s.icon} strokeWidth={1.25} className="mb-5 h-12 w-12 text-navy-900 sm:h-14 sm:w-14" />}
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-2xl font-semibold tracking-wide text-navy-900 sm:text-3xl">{s.value}</dd>
                  <dd className="mt-1.5 text-sm text-ink/70 sm:text-base">{s.label}</dd>
                </Reveal>
              ))}
            </dl>
            {data.statsNote && <p className="mt-4 text-xs text-ink/50">{data.statsNote}</p>}
          </>
        )}

        {/* Trust pillars */}
        {data.pillars?.length > 0 && (
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {data.pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 90} className="flex items-start gap-4 rounded-card border border-gold-100 bg-white/60 p-6">
                <Icon name={p.icon} strokeWidth={1.4} className="h-7 w-7 flex-none text-gold-500" />
                <div>
                  <h3 className="text-base font-semibold text-navy-900">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/65">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
