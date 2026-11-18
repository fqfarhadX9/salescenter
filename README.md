# Sales Center — Luxury Villa Landing Page

A premium, conversion-focused real estate landing page (React + Vite + Tailwind CSS) for Dubai villa campaigns.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview  # serve the production build
npm run lint
```

## Sections (in order)

1. **Hero**: logo, navigation, headline, CTAs, full-bleed villa image, enquiry form
2. **Key Highlights**: large image + icon highlights
3. **Amenities**: image cards with overlay and hover reveal
4. **Floor Plans**: 3 / 4 / 5 bedroom tabs (keyboard accessible), plan + specs
5. **Gallery**: category filters, bento grid, lightbox (keyboard + swipe)
6. **Why Dubai?**: skyline background with investment and lifestyle points
7. **About the Developer**: logo, intro, stats and trust pillars
8. **Final CTA**: navy section with an enquiry form, call and WhatsApp links

Also included: a sticky navbar with a mobile menu, a mobile bottom CTA bar, a footer, scroll-reveal animations (these respect `prefers-reduced-motion`) and a skip link.

## Pages & adding projects

| URL | Page |
|---|---|
| `/` | Home page: a card for every project |
| `/damac-island` | DAMAC Islands landing page |
| anything else | 404 page |

**To add a project:** copy `src/config/projects/damac-island.js` to a new file (e.g. `emaar-south.js`), change its `slug`, `card` and content, then add it to the `projects` array in `src/config/projects/index.js`. It appears on the home page and lives at `/<slug>`.

Site-wide settings (brand, contact, home page text) are in `src/config/site.js`.

**Hosting:** because each project has its own URL, the server must send every path to `index.html`. `vercel.json` (Vercel), `public/_redirects` (Netlify) and `public/.htaccess` (Hostinger / cPanel / Apache / LiteSpeed) already handle this. When uploading `dist/` manually, make sure the hidden `.htaccess` file is included.

## Editing content

**Each project's copy, images and options live in its file in `src/config/projects/`.** Components don't hard-code any content:

- `brand.logoSrc` / `developer.logoSrc`: point these at a logo image (for example `/images/logo.svg` in `/public`). If you leave them empty, the page uses the built-in mark.
- Images: use any URL or a file under `/public`. If an image fails to load, the page shows a branded navy fallback instead of a broken image.
- `floorPlans.plans[].image`: add real plan images here. While it's empty, the page draws an illustrative SVG plan.
- Icons: use names from `src/components/ui/Icon.jsx`. To use another [lucide](https://lucide.dev) icon, add it there first.

> ⚠️ The project name, developer name, statistics, sizes and contact details in the config are **placeholders**. Replace them before going live.

## Lead capture

Forms validate name, phone, email and property type, and show loading, success and error states. Submissions are sent as a JSON `POST` to `VITE_LEAD_ENDPOINT`:

```bash
cp .env.example .env   # then set VITE_LEAD_ENDPOINT
```

Payload: `project, name, phone, email, propertyType, source (e.g. damac-island-hero-form), page, submittedAt`, plus any `utm_*`, `fbclid` and `gclid` parameters from the URL.

- **No endpoint in development:** the lead is logged to the browser console and the form shows success, so you can test the flow.
- **No endpoint in production:** the form shows an error, so leads are never silently lost.

**Google Sheets + Gmail:** [`integrations/google-apps-script.gs`](integrations/google-apps-script.gs) saves every lead to a Google Sheet and emails it to Gmail. Setup steps are at the top of that file. The body is sent as `text/plain` (still JSON) so Apps Script accepts it without a CORS preflight.

The endpoint must accept CORS requests from the site's domain. Zapier and Make webhooks work, and so do most CRMs.

## Structure

```
src/
  config/siteConfig.js        # all content
  pages/LandingPage.jsx       # composes the sections
  components/
    layout/                   # Navbar, Footer, MobileCtaBar
    sections/                 # the 8 sections + FloorPlanDiagram
    forms/EnquiryForm.jsx     # reusable form (stacked | grid layout)
    ui/                       # Button, SectionHeading, SmartImage, Reveal, Lightbox, Logo, Icon
  hooks/                      # useInView, useLeadForm (validation + submit state)
  services/leadService.js     # POST to VITE_LEAD_ENDPOINT
```

## Owner access (private homepage)

| URL | Who | Behaviour |
|---|---|---|
| `/` | Owner only | Signed-in owner sees the homepage; everyone else is redirected to `/damac-island` (UTM tags kept) |
| `/damac-island` | Everyone | Public landing page (redirects to the current slug) |
| `/owner-login` | Owner | Sign-in page (not linked anywhere, `noindex`, disallowed in robots.txt) |
| Log out | Owner | "Log out" pill on the homepage — clears the session |

**How it works:** server-side PHP on Hostinger (`public/api/auth/`). `/.htaccess` routes `/` through
`home-gate.php`, which checks an **HttpOnly, SameSite=Strict, Secure** session cookie before serving the homepage.
Sessions last 8 h (configurable) and end after 2 h of inactivity. Failed logins are rate-limited
(5 per 15 min per IP). The password is stored only as a salted **PBKDF2-SHA256** hash, in a config file
**outside `public_html`** — nothing secret is in the website files or the browser bundle.

**Set your credentials (once):**
1. `npm run owner:hash` → enter a username and a strong password (12+ chars). This creates
   `offplansale-owner-config.php` (git-ignored).
2. Upload it with hPanel File Manager / FTP to the folder that **contains** `public_html`
   (e.g. `/home/u123456789/domains/offplansale.com/`), **not inside** `public_html`. Delete the local copy.
3. To change the password later, repeat both steps. Existing sessions stay valid until they expire (max 8 h);
   use **Log out** on any device you're still signed in on.

Alternative: set server environment variables `OWNER_USERNAME` and `OWNER_PASSWORD_HASH`
(and optionally `OWNER_SESSION_HOURS`).

**Local testing:** `php -S localhost:8000 -t public` in one terminal, then
`OWNER_API_PROXY=http://localhost:8000 npm run dev`. (Without PHP, `/` simply redirects to the landing page.)

> Note: Vercel/Netlify can't run these PHP files — this feature requires PHP hosting such as Hostinger.
