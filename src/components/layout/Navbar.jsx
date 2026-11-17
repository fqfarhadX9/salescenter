import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Phone, X } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'

export default function Navbar({ brand, nav = [], contact, ctaHref = '#enquire' }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const solid = scrolled || open
  const hasNav = nav.length > 0

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? 'bg-navy-900/95 shadow-lg shadow-navy-950/20 backdrop-blur-md' : 'bg-gradient-to-b from-navy-950/70 to-transparent'
      }`}
    >
      <nav
        className={`container-site flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-[72px]' : 'h-20 lg:h-24'}`}
        aria-label="Main"
      >
        <Link to="/" aria-label={`${brand.name} — home`} onClick={() => setOpen(false)}>
          <Logo name={brand.name} subtitle={brand.subtitle} logoSrc={brand.logoSrc} />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="group relative py-2 text-sm font-medium text-white/85 transition-colors hover:text-white">
                {item.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold-400 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={contact.phoneHref}
            className="hidden items-center gap-2 text-sm font-medium text-white/85 transition-colors hover:text-gold-200 xl:flex"
          >
            <Phone className="h-4 w-4 text-gold-400" aria-hidden="true" />
            {contact.phone}
          </a>
          <Button href={ctaHref} variant="light" size="sm" className={hasNav ? 'hidden sm:inline-flex' : 'inline-flex !px-4 sm:!px-5'}>
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="max-[359px]:sr-only">Contact Us</span>
          </Button>
          {hasNav && (
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {hasNav && (
        <div
          id="mobile-menu"
          className={`overflow-hidden bg-navy-900 transition-[max-height,opacity] duration-500 lg:hidden ${
            open ? 'max-h-[calc(100svh-80px)] opacity-100' : 'max-h-0 opacity-0'
          }`}
          hidden={!open}
        >
          <ul className="container-site space-y-1 border-t border-white/10 py-6">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 font-display text-lg text-white/90 transition-colors hover:bg-white/5 hover:text-gold-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="grid gap-3 pt-4 sm:grid-cols-2">
              <Button href={ctaHref} variant="gold" onClick={() => setOpen(false)}>
                Enquire Now
              </Button>
              <Button href={contact.phoneHref} variant="outline">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {contact.phone}
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
