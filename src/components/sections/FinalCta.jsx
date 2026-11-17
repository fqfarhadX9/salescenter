import { Check, MessageCircle, Phone } from 'lucide-react'
import EnquiryForm from '../forms/EnquiryForm'
import Reveal from '../ui/Reveal'
import SmartImage from '../ui/SmartImage'

export default function FinalCta({ data, form, contact, project }) {
  return (
    <section id="enquire" className="relative isolate overflow-hidden bg-navy-900 py-20 sm:py-24 lg:py-28" aria-labelledby="cta-title">
      <SmartImage src={data.image} alt="" className="!absolute inset-0 -z-20 h-full w-full opacity-40" sizes="100vw" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-950/95 via-navy-900/90 to-navy-800/80" />
      {/* Gold sweep accent */}
      <svg aria-hidden="true" className="absolute -bottom-10 left-0 -z-10 w-full text-gold-400/40" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path d="M0 160 C 360 60, 720 220, 1440 40" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M0 190 C 420 90, 800 240, 1440 90" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
      </svg>

      <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_520px] lg:gap-16">
        <Reveal>
          <span className="mb-6 block h-px w-20 bg-gold-400" />
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">{data.eyebrow}</p>
          <h2 id="cta-title" className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {data.titleLine1}
            <span className="text-gold-gradient block">{data.titleLine2}</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">{data.description}</p>

          <ul className="mt-8 space-y-3">
            {data.perks.map((p) => (
              <li key={p} className="flex items-center gap-3 text-white/90">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gold-500 text-white">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-8">
            <a href={contact.phoneHref} className="group flex items-center gap-3 text-white transition-colors hover:text-gold-200">
              <span className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-white/25 transition-colors group-hover:bg-gold-500 group-hover:ring-gold-500">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs text-white/55">Call us</span>
                <span className="font-semibold">{contact.phone}</span>
              </span>
            </a>
            <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-white transition-colors hover:text-gold-200">
              <span className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-white/25 transition-colors group-hover:bg-gold-500 group-hover:ring-gold-500">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs text-white/55">Chat with us</span>
                <span className="font-semibold">WhatsApp</span>
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="rounded-card bg-white p-6 shadow-lift sm:p-9">
          <h3 className="text-2xl font-semibold text-navy-900">Request a Call Back</h3>
          <p className="mb-6 mt-1.5 text-sm text-ink/65">Get the latest prices and availability within minutes.</p>
          <EnquiryForm config={form} source={`${project}-final-cta-form`} project={project} layout="grid" />
        </Reveal>
      </div>
    </section>
  )
}
