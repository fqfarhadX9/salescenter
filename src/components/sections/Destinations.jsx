import assetUrl from '../../utils/assetUrl'
import Reveal from '../ui/Reveal'

/**
 * "Eight destinations" section: island-map background with a blue tint,
 * headline, a 4×2 grid of destination icons, story text and a CTA.
 */
export default function Destinations({ data }) {
  if (!data) return null
  return (
    <section id="destinations" className="relative isolate overflow-hidden bg-[#0b7fbf]" aria-labelledby="destinations-title">
      {/* Background image (island map on the left) */}
      <img
        src={assetUrl(data.background)}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[20%_center] xl:object-left"
      />
      {/* Blue tint like the brochure + deeper colour behind the text and at the bottom */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,116,181,0.22)_0%,rgba(10,116,181,0.28)_40%,rgba(10,116,181,0.5)_65%,rgba(10,116,181,0.55)_100%)] mix-blend-multiply max-xl:bg-[#0a74b5]/50" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(9,100,160,0.15)_0%,rgba(4,140,205,0.35)_55%,rgba(0,170,232,0.92)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,60,100,0)_35%,rgba(6,70,115,0.35)_60%,rgba(6,70,115,0.45)_100%)] max-xl:bg-[rgba(6,70,115,0.45)]"
      />

      <div className="container-site grid min-h-[640px] items-center py-20 sm:py-24 xl:grid-cols-[1fr_1fr] lg:py-28">
        <div className="hidden xl:block" aria-hidden="true" />

        <div className="max-w-3xl text-white [text-shadow:0_1px_10px_rgba(0,40,80,0.25)] max-xl:mx-auto">
          <Reveal>
            <h2 id="destinations-title" className="font-display uppercase leading-[1.05]">
              <span className="block text-3xl font-bold tracking-wide sm:text-4xl xl:text-[42px]">{data.titleBold}</span>
              <span className="mt-1 block text-[26px] font-light tracking-wide sm:text-4xl xl:whitespace-nowrap xl:text-[42px]">{data.titleLight}</span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <ul className="mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-10">
              {data.items.map((d, i) => (
                <li
                  key={d.name}
                  className={`flex flex-col items-center justify-end px-2 text-center ${
                    i % 4 !== 0 ? 'sm:border-l sm:border-white/45' : ''
                  } ${i % 2 !== 0 ? 'max-sm:border-l max-sm:border-white/45' : ''}`}
                >
                  <img
                    src={assetUrl(d.icon)}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-12 w-auto max-w-[96px] object-contain drop-shadow-[0_1px_4px_rgba(0,40,80,0.25)] sm:h-14"
                  />
                  <span className="mt-3 text-sm font-medium uppercase tracking-[0.08em] sm:text-base lg:text-lg">{d.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={180}>
            {data.paragraphs?.map((p) => (
              <p key={p} className="mt-8 max-w-2xl text-base leading-relaxed text-white/95 first:mt-10 sm:text-lg [&+p]:mt-5">
                {p}
              </p>
            ))}
            {data.cta && (
              <a
                href={data.cta.href}
                className="mt-9 inline-flex h-14 min-w-[260px] items-center justify-center rounded-full border border-white px-10 text-base font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-white hover:text-[#0a74b5]"
              >
                {data.cta.label}
              </a>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
