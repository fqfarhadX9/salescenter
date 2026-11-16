const VARIANTS = {
  gold: 'bg-gold-500 text-white shadow-gold hover:bg-gold-600 hover:-translate-y-0.5',
  light: 'bg-gold-100 text-navy-900 hover:bg-gold-200 hover:-translate-y-0.5',
  outline: 'border border-white/40 text-white hover:border-gold-300 hover:text-gold-200',
  navy: 'bg-navy-900 text-white hover:bg-navy-800 hover:-translate-y-0.5',
}

const SIZES = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-8 text-base',
}

/** Renders an <a> when `href` is given, otherwise a <button>. */
export default function Button({ href, variant = 'gold', size = 'md', className = '', children, ...rest }) {
  const classes = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-wide transition-all duration-300 disabled:pointer-events-none disabled:opacity-70 ${VARIANTS[variant]} ${SIZES[size]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
