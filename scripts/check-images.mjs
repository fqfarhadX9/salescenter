#!/usr/bin/env node
/**
 * Image check — runs automatically before every `npm run build`.
 *
 * Scans every project config for local image paths and fails the build when
 * an image would be broken on the live site:
 *   ✖ file does not exist in /public
 *   ✖ file exists locally but is NOT committed to git (works locally, missing on live)
 * and warns about things that cause problems later:
 *   ⚠ path starts with /public (works locally only; auto-corrected at runtime)
 *   ⚠ spaces / special characters / uppercase in file names
 *   ⚠ files over 600 KB (slow on mobile)
 *
 * Run manually:  npm run check:images
 * Skip in an emergency:  SKIP_IMAGE_CHECK=1 npm run build
 */
import { existsSync, statSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

if (process.env.SKIP_IMAGE_CHECK) process.exit(0)

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const IMG = /\.(jpe?g|png|webp|avif|gif|svg)$/i
const MAX_KB = 600

const { projects } = await import(pathToFileURL(join(root, 'src/config/projects/index.js')).href)
const { site } = await import(pathToFileURL(join(root, 'src/config/site.js')).href)

// Files tracked by git (null if git isn't available, e.g. on some CI uploads)
let tracked = null
try {
  tracked = new Set(
    execSync('git ls-files -z public', { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
      .split('\0')
      .filter(Boolean)
      .map((f) => f.replace(/\\/g, '/')),
  )
} catch {
  /* not a git checkout — skip the "not committed" check */
}

const refs = []
function collect(value, where) {
  if (typeof value === 'string') {
    if (IMG.test(value) && !/^(https?:|data:|blob:)/i.test(value)) refs.push({ path: value, where })
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => collect(v, `${where}[${i}]`))
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) collect(v, where ? `${where}.${k}` : k)
  }
}
collect(site, 'site')
projects.forEach((p) => collect(p, p.slug))

const errors = []
const warnings = []
for (const { path, where } of refs) {
  const clean = decodeURI(path.trim()).replace(/^\.?\/?public\//i, '/').replace(/^\/?/, '/')
  const file = join(publicDir, clean)
  const rel = relative(root, file).replace(/\\/g, '/')

  if (/^\.?\/?public\//i.test(path.trim())) warnings.push(`${where}: remove "/public" from "${path}" → use "${clean}"`)
  if (/[\s&+#%?]/.test(clean) || /[A-Z]/.test(clean.split('/').pop()))
    warnings.push(`${where}: rename "${clean}" to lowercase-with-dashes (no spaces, &, +, #)`)

  if (!existsSync(file)) {
    errors.push(`${where}: "${path}" → file not found at ${rel}`)
    continue
  }
  if (tracked && !tracked.has(rel)) {
    errors.push(`${where}: "${rel}" exists on this computer but is NOT committed to git → it will be missing on the live site. Run: git add "${rel}"`)
  }
  const kb = Math.round(statSync(file).size / 1024)
  if (kb > MAX_KB) warnings.push(`${where}: "${clean}" is ${kb} KB — compress/resize to under ${MAX_KB} KB (≈1600px wide JPG)`)
}

if (warnings.length) {
  console.warn(`\n⚠  Image warnings (${warnings.length}):`)
  warnings.forEach((w) => console.warn(`   - ${w}`))
}
if (errors.length) {
  console.error(`\n✖  ${errors.length} image(s) will be BROKEN on the live site:`)
  errors.forEach((e) => console.error(`   - ${e}`))
  console.error('\nFix the paths above, then build again.\n')
  process.exit(1)
}
console.log(`✔  Image check passed (${refs.length} local images)`)
