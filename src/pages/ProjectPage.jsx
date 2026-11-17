import { useParams } from 'react-router-dom'
import { getProjectBySlug } from '../config/projects'
import usePageMeta from '../hooks/usePageMeta'
import LandingPage from './LandingPage'
import NotFoundPage from './NotFoundPage'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  if (!project) return <NotFoundPage />
  return <ProjectPageContent key={project.slug} project={project} />
}

function ProjectPageContent({ project }) {
  usePageMeta(project.seo)
  return <LandingPage config={project} />
}
