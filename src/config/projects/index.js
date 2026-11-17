/**
 * Project registry.
 *
 * To add a new project:
 *   1. Copy damac-island.js to e.g. emaar-south.js and change its content + `slug`.
 *   (keep the .js extension in the import — the build's image check needs it)
 *   2. Import it below and add it to the `projects` array.
 * It then appears as a card on the home page and lives at /<slug>.
 */
import damacIsland from './damac-island.js'

export const projects = [damacIsland]

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}
