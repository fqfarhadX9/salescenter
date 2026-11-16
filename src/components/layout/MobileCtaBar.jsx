import { useEffect, useState } from 'react'
import { MessageCircle, Phone } from 'lucide-react'

/** Sticky bottom action bar on mobile — appears after the hero to keep the enquiry one tap away. */
export default function MobileCtaBar({ contact }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-900/95 p-3 backdrop-blur-md transition-transform duration-500 sm:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="grid grid-cols-[auto_auto_1fr] gap-2">
        <a href={contact.phoneHref} tabIndex={visible ? 0 : -1} aria-label="Call us" className="grid h-12 w-12 place-items-center rounded-lg text-white ring-1 ring-white/25">
          <Phone className="h-5 w-5" />
        </a>
        <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" tabIndex={visible ? 0 : -1} aria-label="Chat on WhatsApp" className="grid h-12 w-12 place-items-center rounded-lg text-white ring-1 ring-white/25">
          <MessageCircle className="h-5 w-5" />
        </a>
        <a href="#enquire" tabIndex={visible ? 0 : -1} className="grid h-12 place-items-center rounded-lg bg-gold-500 text-sm font-semibold text-white">
          Enquire Now
        </a>
      </div>
    </div>
  )
}
