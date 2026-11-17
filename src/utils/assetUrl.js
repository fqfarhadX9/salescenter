/**
 * Normalises image paths from config so they work in production:
 * - "/public/images/x.jpg" -> "/images/x.jpg" (Vite serves /public at the site root;
 *   the "/public" prefix only works on the local dev server)
 * - encodes spaces and special characters in local file names
 * External URLs (http/https/data) are returned unchanged.
 */
export default function assetUrl(src) {
  if (!src || typeof src !== 'string') return src
  if (/^(https?:|data:|blob:)/i.test(src)) return src
  let path = src.trim().replace(/^\.?\/?public\//i, '/')
  if (!path.startsWith('/')) path = `/${path}`
  return encodeURI(decodeURI(path))
}
