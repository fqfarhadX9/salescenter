import { Navigate, useLocation, useParams } from 'react-router-dom'
import { getProjectByAlias, getProjectBySlug } from '../config/projects'
import usePageMeta from '../hooks/usePageMeta'
import LandingPage from './LandingPage'
import NotFoundPage from './NotFoundPage'

export default function ProjectPage() {
  const { slug } = useParams()
  const { search, hash } = useLocation()
  const project = getProjectBySlug(slug)
  if (!project) {
    // Old address -> redirect to the current one, keeping UTM tags (?utm_source=...) and #anchors
    const moved = getProjectByAlias(slug)
    if (moved) return <Navigate to={`/${moved.slug}${search}${hash}`} replace />
    return <NotFoundPage />
  }
  return <ProjectPageContent key={project.slug} project={project} />
}

function ProjectPageContent({ project }) {
  usePageMeta(project.seo)
  return <LandingPage config={project} />
}
