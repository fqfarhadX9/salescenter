import assetUrl from '../../utils/assetUrl'

/**
 * Hero built in code to match the campaign creative:
 * photo background + project logo + serif headline + gold italic line + two-part offer pill.
 * Real text (sharp at any size, SEO-friendly) with separate layouts for phone, tablet and desktop.
 */
const PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

export default function HeroDesigned({ hero }) {
  const bg = hero.background || {}
  const desktopSet = bg.srcSet?.map(([u, w]) => `${assetUrl(u)} ${w}w`).join(', ')
  const offer = hero.offer || {}

  return (
    <section
      id="top"
      className="hero-designed relative isolate overflow-hidden bg-[#1b6fc4]"
      aria-labelledby="hero-title"
      style={{ '--hero-sky-top': bg.skyTop, '--hero-sky-bottom': bg.skyBottom }}
    >
      {/* Background photo: portrait crop for phones / upright tablets, wide image elsewhere */}
      <picture>
        {/* Phones / upright tablets use the separate photo at the bottom instead (1px placeholder avoids a wasted download) */}
        {bg.mobile && <source media="(orientation: portrait) and (max-width: 1100px)" srcSet={PIXEL} />}
        <img
          src={assetUrl(bg.image)}
          srcSet={desktopSet}
          sizes="100vw"
          alt={hero.imageAlt || ''}
          fetchPriority="high"
          decoding="async"
          className="hero-designed__bg absolute inset-0 -z-10 h-full w-full object-cover"
        />
      </picture>
      {/* Very light top shade keeps white text crisp on the bright sky (keeps the photo's colours) */}
      <div aria-hidden="true" className="hero-designed__shade absolute inset-x-0 top-0 -z-10 h-[62%] bg-gradient-to-b from-[#0b3d86]/25 via-[#0b3d86]/10 to-transparent" />

      <div className="hero-designed__content container-site flex flex-col items-center text-center text-white">
        {/* Project logo with side lines (aligned to the "ISLANDS 2" row) */}
        {hero.logo?.src && (
          <div className="hero-designed__logo relative">
            <img src={assetUrl(hero.logo.src)} alt={hero.logo.alt || ''} className="block h-full w-auto drop-shadow-[0_2px_10px_rgba(0,30,80,0.25)]" />
            <span aria-hidden="true" className="hero-designed__rule absolute right-full top-[70%]" />
            <span aria-hidden="true" className="hero-designed__rule absolute left-full top-[70%]" />
          </div>
        )}

        <h1 id="hero-title" className="hero-designed__title font-serif font-medium text-white">
          {withAmpersand(hero.titleLine1)}
        </h1>

        {hero.titleLine2 && (
          <p className="hero-designed__subtitle flex w-full items-center justify-center font-serif italic">
            <span aria-hidden="true" className="hero-designed__rule hero-designed__rule--gold" />
            <span className="hero-designed__gold whitespace-nowrap px-[0.45em]">{hero.titleLine2}</span>
            <span aria-hidden="true" className="hero-designed__rule hero-designed__rule--gold" />
          </p>
        )}

        {(offer.highlight || offer.price) && (
          <div className="hero-designed__pill">
            {offer.highlight && (
              <div className="hero-designed__pill-left">
                <span className="font-display font-bold">{offer.highlight.value}</span>{' '}
                <span className="font-semibold">{offer.highlight.text}</span>
              </div>
            )}
            {offer.price && (
              <div className="hero-designed__pill-right">
                <span className="font-medium">{offer.price.prefix}</span>{' '}
                <span className="font-display font-bold">{offer.price.value}</span>{' '}
                <span className="font-semibold">{offer.price.suffix}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Phones + upright tablets: whole villa + couple photo at the bottom, fading into the blue gradient */}
      {bg.mobile && (
        <div className="hero-designed__mobile-photo" aria-hidden="true">
          <img src={assetUrl(bg.mobile)} alt="" width={bg.mobileWidth || 1080} height={bg.mobileHeight || 1190} decoding="async" fetchPriority="high" />
        </div>
      )}
    </section>
  )
}

/** Renders "&" in a smaller classic serif, like the campaign creative. */
function withAmpersand(text = '') {
  return String(text)
    .split('&')
    .flatMap((part, i) => (i === 0 ? [part] : [<span key={i} className="hero-designed__amp">&amp;</span>, part]))
}

