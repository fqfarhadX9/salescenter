import { useState } from 'react'
import assetUrl from '../../utils/assetUrl'

/**
 * Image with lazy loading, a soft shimmer while loading and an elegant
 * navy/gold fallback if the source fails — so a broken URL never shows
 * a broken-image icon on a live campaign.
 */
export default function SmartImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  priority = false,
  sizes,
  srcSet,
  ...rest
}) {
  const [status, setStatus] = useState(src ? 'loading' : 'error')

  return (
    <div className={`relative overflow-hidden bg-navy-800 ${className}`}>
      {status !== 'error' && (
        <img
          src={assetUrl(src)}
          alt={alt}
          sizes={sizes}
          srcSet={srcSet ? srcSet.map(([u, w]) => `${assetUrl(u)} ${w}w`).join(', ') : undefined}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
          {...rest}
        />
      )}
      {status === 'loading' && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-navy-800 via-navy-700 to-navy-800" />
      )}
      {status === 'error' && (
        <div
          role={alt ? 'img' : undefined}
          aria-label={alt || undefined}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#284A80_0%,#12274A_45%,#070F1F_100%)]"
        >
          <svg className="absolute bottom-0 left-0 w-full text-gold-400/25" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
            <path fill="currentColor" d="M0 120V80h20V60h15v20h10V40h12v40h18V70h14V30h8V10h6v20h8v50h16V55h20v25h14V45h12v35h20V65h16v15h18V50h14v30h22V70h16v10h20V60h14v20h16V75h24v45z" />
          </svg>
        </div>
      )}
    </div>
  )
}
