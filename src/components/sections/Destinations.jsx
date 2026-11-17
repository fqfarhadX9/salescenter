import assetUrl from '../../utils/assetUrl'
import Reveal from '../ui/Reveal'

/**
 * "Eight destinations" section: beach background with a blue tint, the island
 * map graphic on the left (separate transparent PNG so it stays crisp and is
 * never cropped), headline, 4×2 destination grid, story text and a CTA.
 * Sizes scale with the viewport so the whole section fits one desktop screen.
 */
export default function Destinations({ data }) {
  if (!data) return null
  return (
    <section id="destinations" className="relative isolate overflow-hidden bg-[#0a86c9]" aria-labelledby="destinations-title">
      {/* Background + brochure-style blue tint */}
      <img
        src={assetUrl(data.background)}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-top"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0b78bd]/60 mix-blend-multiply" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,110,175,0)_0%,rgba(4,150,215,0.25)_55%,rgba(0,172,236,0.9)_100%)]"
      />

      <div className="container-site grid items-center gap-10 py-16 sm:py-20 lg:min-h-[min(100svh,860px)] lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:py-[clamp(40px,6vh,80px)]">
        {/* Island map */}
        {data.map && (
          <Reveal className="hidden justify-center lg:flex">
            <img
              src={assetUrl(data.map)}
              alt="DAMAC Islands 2 masterplan with eight island destinations"
              loading="lazy"
              className="h-[min(80svh,700px)] w-auto max-w-full object-contain drop-shadow-[0_18px_30px_rgba(0,40,80,0.18)]"
            />
          </Reveal>
        )}

        <div className="text-white">
          <Reveal>
            <h2 id="destinations-title" className="font-display uppercase leading-[1.08] tracking-[0.02em]">
              <span className="block text-[28px] font-bold sm:text-[38px] lg:text-[clamp(28px,2.5vw,48px)]">{data.titleBold}</span>
              <span className="block text-[24px] font-light sm:text-[38px] lg:whitespace-nowrap lg:text-[clamp(28px,2.5vw,48px)]">
                {data.titleLight}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <ul className="mt-8 grid grid-cols-2 gap-y-7 sm:grid-cols-4 lg:mt-[clamp(20px,3.6vh,44px)] lg:gap-y-[clamp(16px,3vh,36px)]">
              {data.items.map((d, i) => (
                <li
                  key={d.name}
                  className={`flex flex-col items-center justify-end px-2 text-center ${
                    i % 4 !== 0 ? 'sm:border-l sm:border-white/50' : ''
                  } ${i % 2 !== 0 ? 'max-sm:border-l max-sm:border-white/50' : ''}`}
                >
                  <img
                    src={assetUrl(d.icon)}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-11 w-auto max-w-[92px] object-contain sm:h-12 lg:h-[clamp(36px,5.2vh,56px)]"
                  />
                  <span className="mt-2.5 text-[13px] font-semibold uppercase tracking-[0.06em] sm:text-sm lg:text-[clamp(13px,1vw,19px)]">
                    {d.name}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-8 max-w-[640px] space-y-4 text-[15px] leading-relaxed text-white sm:text-base lg:mt-[clamp(20px,3.6vh,40px)] lg:space-y-[clamp(8px,1.6vh,16px)] lg:text-[clamp(14px,1vw,18px)]">
              {data.paragraphs?.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {data.cta && (
              <a
                href={data.cta.href}
                className="mt-8 inline-flex h-[52px] min-w-[240px] items-center justify-center rounded-full border border-white px-10 text-[15px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-white hover:text-[#0a74b5] lg:mt-[clamp(20px,3.6vh,36px)] lg:h-[clamp(44px,6vh,56px)]"
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
