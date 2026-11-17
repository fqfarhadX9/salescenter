import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import MobileCtaBar from '../components/layout/MobileCtaBar'
import Hero from '../components/sections/Hero'
import Highlights from '../components/sections/Highlights'
import Amenities from '../components/sections/Amenities'
import FloorPlans from '../components/sections/FloorPlans'
import Gallery from '../components/sections/Gallery'
import WhyDubai from '../components/sections/WhyDubai'
import Developer from '../components/sections/Developer'
import FinalCta from '../components/sections/FinalCta'

/** Project landing page. Content comes from a project config in src/config/projects/. */
export default function LandingPage({ config }) {
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
        <FloorPlans data={config.floorPlans} />
        <Gallery data={config.gallery} />
        <WhyDubai data={config.whyDubai} />
        <Developer data={config.developer} />
        <FinalCta data={config.finalCta} form={config.form} contact={config.contact} project={config.slug} />
      </main>
      <Footer brand={config.brand} nav={config.nav} contact={config.contact} footer={config.footer} />
      <MobileCtaBar contact={config.contact} />
    </>
  )
}
