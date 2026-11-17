import { Link } from 'react-router-dom'
import { site } from '../config/site'
import usePageMeta from '../hooks/usePageMeta'
import { LogoMark } from '../components/ui/Logo'

export default function NotFoundPage() {
  usePageMeta({ title: `Page not found | ${site.brand.name}` })
  return (
    <main className="grid min-h-screen place-items-center bg-navy-950 px-6 text-center text-white">
      <div>
        <LogoMark className="mx-auto h-14 w-14 text-gold-400" />
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">404</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">This page doesn’t exist</h1>
        <p className="mt-3 text-white/70">The project may have moved or the link is incorrect.</p>
        <Link
          to="/"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-gold-500 px-7 font-semibold text-white transition-colors hover:bg-gold-600"
        >
          View all projects
        </Link>
      </div>
    </main>
  )
}
