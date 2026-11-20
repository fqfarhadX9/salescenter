import { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import MobileCtaBar from '../components/layout/MobileCtaBar'
import Hero from '../components/sections/Hero'
import Highlights from '../components/sections/Highlights'
import Amenities from '../components/sections/Amenities'
import Destinations from '../components/sections/Destinations'
import FloorPlans from '../components/sections/FloorPlans'
import Gallery from '../components/sections/Gallery'
import Location from '../components/sections/Location'
import WhyDubai from '../components/sections/WhyDubai'
import Developer from '../components/sections/Developer'
import FinalCta from '../components/sections/FinalCta'
import EnquiryPopup from '../components/forms/EnquiryPopup'

/** Project landing page. Content comes from a project config in src/config/projects/. */
export default function LandingPage({ config }) {
  // Any "#enquire" button (Book with just 10%, Book a Free Consultation, Know More,
  // Get Floor Plan & Price…) opens the enquiry form in a pop-up instead of scrolling.
  // Add data-no-popup to a link to keep the normal scroll behaviour.
  const [popup, setPopup] = useState(null)

  // Animated buttons (shine + pulse like "Book with just 10%"): config.animatedButtons: true
  useEffect(() => {
    if (!config.animatedButtons) return
    document.documentElement.classList.add('animate-ctas')
    return () => document.documentElement.classList.remove('animate-ctas')
  }, [config.animatedButtons])
  const closePopup = useCallback(() => setPopup(null), [])

  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = e.target.closest?.('a[href$="#enquire"]')
      if (!link || link.hasAttribute('data-no-popup') || link.closest('#enquire')) return
      e.preventDefault()
      setPopup({ label: link.textContent.trim() })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      <a href="#main" className="sr-only z-[60] rounded bg-white px-4 py-2 text-navy-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      {config.showNavbar !== false && <Navbar brand={config.brand} nav={config.nav} contact={config.contact} />}
      <main id="main">
        <Hero hero={config.hero} form={config.form} project={config.slug} hideNavSpace={config.showNavbar === false} />
        <Highlights data={config.highlights} />
        <Amenities data={config.amenities} />
        <Destinations data={config.destinations} />
        <FloorPlans data={config.floorPlans} />
        <Gallery data={config.gallery} />
        <Location data={config.location} />
        <WhyDubai data={config.whyDubai} />
        <Developer data={config.developer} />
        <FinalCta data={config.finalCta} form={config.form} contact={config.contact} project={config.slug} />
      </main>
      <Footer
        brand={config.brand}
        nav={config.nav}
        contact={config.contact}
        footer={config.footer}
        hasMobileBar={config.mobileCtaBar !== false}
      />
      {config.mobileCtaBar !== false && <MobileCtaBar contact={config.contact} />}
      <EnquiryPopup
        open={!!popup}
        onClose={closePopup}
        form={config.form}
        project={config.slug}
        source={`${config.slug}-popup-${slugify(popup?.label)}`}
      />
    </>
  )
}

/** "Book with just 10%" → "book-with-just-10" (shows which button the lead came from) */
function slugify(text = '') {
  return String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'button'
}
