import { ArrowDown, MessageCircle, Phone, Sparkles } from 'lucide-react'
import { site } from '../config/site'
import { projects } from '../config/projects'
import usePageMeta from '../hooks/usePageMeta'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ProjectCard from '../components/home/ProjectCard'
import SectionHeading from '../components/ui/SectionHeading'
import SmartImage from '../components/ui/SmartImage'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'

/** Home page: lists all projects from src/config/projects as cards. */
export default function HomePage() {
  usePageMeta(site.seo)
  const { home, contact } = site

  return (
    <>
      <Navbar brand={site.brand} contact={contact} ctaHref="#contact" />
      <main id="main">
        {/* Intro banner */}
        <section className="relative isolate overflow-hidden bg-navy-950" aria-labelledby="home-title">
          <SmartImage src={home.image} alt="Dubai skyline" priority className="!absolute inset-0 -z-10 h-full w-full" imgClassName="animate-slow-zoom" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/90 via-navy-950/70 to-navy-950/40" />
          <div className="container-site flex min-h-[520px] flex-col justify-center pb-16 pt-32 sm:min-h-[600px] lg:pt-36">
            <div className="max-w-3xl animate-fade-in">
              <span className="mb-6 block h-px w-20 bg-gold-400" />
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">{home.eyebrow}</p>
              <h1 id="home-title" className="text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                {home.title}
                <span className="text-gold-gradient block">{home.titleAccent}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{home.subtitle}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="#projects" variant="light" size="lg" className="!h-12 sm:!h-14">
                  View Projects
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" variant="outline" size="lg" className="!h-12 sm:!h-14">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Project cards */}
        <section id="projects" className="bg-cream-50 py-20 sm:py-24" aria-labelledby="projects-title">
          <div className="container-site">
            <SectionHeading id="projects-title" align="center" eyebrow="Portfolio" title={home.projectsTitle} description={home.projectsSubtitle} />

            <ul className="mt-12 grid grid-cols-1 justify-center gap-6 sm:grid-cols-[repeat(auto-fit,minmax(300px,380px))]">
              {projects.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={i * 80}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
              <Reveal as="li" delay={projects.length * 80}>
                <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-card border-2 border-dashed border-gold-200 bg-white/60 p-8 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-50 text-gold-500">
                    <Sparkles className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-navy-900">More Launches Coming Soon</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink/65">
                    Be the first to hear about new off-plan releases and early-bird payment plans.
                  </p>
                  <Button href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" variant="navy" size="sm" className="mt-6">
                    Get Early Access
                  </Button>
                </div>
              </Reveal>
            </ul>
          </div>
        </section>

        {/* Contact strip */}
        <section id="contact" className="bg-navy-900 py-16" aria-labelledby="contact-title">
          <div className="container-site flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 id="contact-title" className="text-2xl font-semibold text-white sm:text-3xl">
                Not sure which project suits you?
              </h2>
              <p className="mt-2 text-white/70">Talk to our property consultants for honest advice and the latest prices.</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href={contact.phoneHref} variant="gold">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {contact.phone}
              </Button>
              <Button href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" variant="outline">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer brand={site.brand} nav={[]} contact={contact} footer={site.footer} />
    </>
  )
}
