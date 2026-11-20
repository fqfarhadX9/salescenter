import assetUrl from '../../utils/assetUrl'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'

/**
 * "Eight destinations" section: beach background with a blue tint, the island
 * map graphic on the left (separate transparent PNG so it stays crisp and is
 * never cropped), headline, 4×2 destination grid, story text and a CTA.
 * Sizes scale with the viewport so the whole section fits one desktop screen.
 */
export default function Destinations({ data }) {
  if (!data) return null
  const centered = data.layout === 'centered' // heading centred on top, map + content side by side below
  const tint = data.tint || {} // optional colour overrides (default = blue island tint)

  const heading = (
    <Reveal className={centered ? 'text-center' : undefined}>
      <h2 id="destinations-title" className="font-display uppercase leading-[1.08] tracking-[0.02em]">
        <span className="block text-[28px] font-bold sm:text-[38px] lg:text-[clamp(28px,2.5vw,48px)]">{data.titleBold}</span>
        <span className="block text-[24px] font-light sm:text-[38px] lg:whitespace-nowrap lg:text-[clamp(28px,2.5vw,48px)]">
          {data.titleLight}
        </span>
      </h2>
      {centered && <span aria-hidden="true" className="mx-auto mt-5 block h-px w-24 bg-gold-300/80 lg:mt-6" />}
      {centered && data.paragraphs?.length > 0 && (
        <div className="mx-auto mt-6 max-w-3xl space-y-4 text-[15px] leading-relaxed text-white/85 sm:text-base lg:mt-7 lg:text-[17px]">
          {data.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      )}
    </Reveal>
  )
  return (
    <section
      id="destinations"
      className="relative isolate overflow-hidden bg-[#0a86c9]"
      style={tint.base ? { backgroundColor: tint.base } : undefined}
      aria-labelledby="destinations-title"
    >
      {/* Background + brochure-style blue tint */}
      <img
        src={assetUrl(data.background)}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-top"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#0b78bd]/60 mix-blend-multiply"
        style={tint.multiply ? { backgroundColor: tint.multiply } : undefined}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,110,175,0)_0%,rgba(4,150,215,0.25)_55%,rgba(0,172,236,0.9)_100%)]"
        style={tint.gradient ? { backgroundImage: tint.gradient } : undefined}
      />

      {centered && <div className="container-site pt-20 text-white sm:pt-24 lg:pt-28">{heading}</div>}
      <div
        className={
          centered
            ? 'container-site grid items-center gap-10 pb-20 pt-10 sm:pb-24 sm:pt-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12 lg:pb-28 lg:pt-14 xl:gap-16'
            : 'container-site grid items-center gap-10 py-16 sm:py-20 lg:min-h-[min(100svh,860px)] lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:py-[clamp(40px,6vh,80px)]'
        }
      >
        {/* Island map */}
        {data.map && (
          <Reveal className={centered ? 'flex justify-center' : 'hidden justify-center lg:flex'}>
            <img
              src={assetUrl(data.map)}
              alt={data.mapAlt || 'DAMAC Islands 2 masterplan with eight island destinations'}
              loading="lazy"
              className={
                data.mapFramed
                  ? 'h-auto max-h-[min(80svh,700px)] w-full rounded-card object-contain shadow-lift ring-1 ring-white/25'
                  : 'h-[min(80svh,700px)] w-auto max-w-full object-contain drop-shadow-[0_18px_30px_rgba(0,40,80,0.18)]'
              }
            />
          </Reveal>
        )}

        <div className="text-white">
          {!centered && heading}

          <Reveal delay={100}>
            <ul
              className={`grid grid-cols-2 gap-y-7 sm:grid-cols-4 lg:gap-y-[clamp(16px,3vh,36px)] ${
                centered ? '' : 'mt-8 lg:mt-[clamp(20px,3.6vh,44px)]'
              }`}
            >
              {data.items.map((d, i) => (
                <li
                  key={d.name + (d.sub || '')}
                  className={`flex flex-col items-center px-2 text-center ${centered ? 'justify-start' : 'justify-end'} ${
                    i % 4 !== 0 ? 'sm:border-l sm:border-white/50' : ''
                  } ${i % 2 !== 0 ? 'max-sm:border-l max-sm:border-white/50' : ''}`}
                >
                  {d.iconName ? (
                    <Icon name={d.iconName} strokeWidth={1.3} className="h-11 w-11 text-gold-200 sm:h-12 sm:w-12 lg:h-[clamp(36px,5.2vh,52px)] lg:w-[clamp(36px,5.2vh,52px)]" />
                  ) : (
                    <img
                      src={assetUrl(d.icon)}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="h-11 w-auto max-w-[92px] object-contain sm:h-12 lg:h-[clamp(36px,5.2vh,56px)]"
                    />
                  )}
                  <span
                    className={`mt-2.5 text-[13px] font-semibold uppercase tracking-[0.06em] sm:text-sm ${
                      centered ? 'leading-snug [text-wrap:balance] lg:text-[clamp(12px,0.9vw,16px)]' : 'lg:text-[clamp(13px,1vw,19px)]'
                    }`}
                  >
                    {d.name}
                  </span>
                  {d.sub && (
                    <span className={`mt-0.5 text-[12px] text-white/75 sm:text-[13px] ${centered ? 'leading-snug [text-wrap:balance] lg:text-[clamp(11.5px,0.8vw,14px)]' : 'lg:text-[clamp(12px,0.85vw,15px)]'}`}>
                      {d.sub}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={180} className={centered ? 'max-lg:text-center' : undefined}>
            {!centered && (
            <div className="mt-8 max-w-[640px] max-lg:mx-auto space-y-4 text-[15px] leading-relaxed text-white sm:text-base lg:mt-[clamp(20px,3.6vh,40px)] lg:space-y-[clamp(8px,1.6vh,16px)] lg:text-[clamp(14px,1vw,18px)]">
              {data.paragraphs?.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            )}
            {data.cta && (
              <a
                href={data.cta.href}
                className="mt-10 inline-flex h-[52px] min-w-[240px] items-center justify-center rounded-full border border-white px-10 text-[15px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-white hover:text-[#0a74b5] lg:mt-[clamp(20px,3.6vh,36px)] lg:h-[clamp(44px,6vh,56px)]"
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
