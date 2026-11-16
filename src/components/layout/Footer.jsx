import { Mail, Phone } from 'lucide-react'
import Logo from '../ui/Logo'

const YEAR = new Date().getFullYear()

export default function Footer({ brand, nav, contact, footer }) {
  return (
    <footer className="bg-navy-950 pb-24 pt-14 text-white/70 sm:pb-10">
      <div className="container-site">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-10 lg:flex-row lg:items-center lg:justify-between">
          <Logo name={brand.name} subtitle={brand.subtitle} logoSrc={brand.logoSrc} />
          {nav.length > 0 && (
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="inline-block py-1.5 transition-colors hover:text-gold-200">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className="flex flex-col gap-2 text-sm">
            <a href={contact.phoneHref} className="flex items-center gap-2 py-1.5 transition-colors hover:text-gold-200">
              <Phone className="h-4 w-4 text-gold-400" aria-hidden="true" /> {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-2 py-1.5 transition-colors hover:text-gold-200">
              <Mail className="h-4 w-4 text-gold-400" aria-hidden="true" /> {contact.email}
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-8 text-xs text-white/45 md:flex-row md:justify-between">
          <p className="max-w-3xl leading-relaxed">{footer.disclaimer}</p>
          <p className="whitespace-nowrap">
            © {YEAR} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
