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

## Editing content

**All copy, images and options live in [`src/config/siteConfig.js`](src/config/siteConfig.js).** Components don't hard-code any content, so to launch a new project you edit only that file:

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

Payload: `name, phone, email, propertyType, source (hero-form | final-cta-form), page, submittedAt`, plus any `utm_*`, `fbclid` and `gclid` parameters from the URL.

- **No endpoint in development:** the lead is logged to the browser console and the form shows success, so you can test the flow.
- **No endpoint in production:** the form shows an error, so leads are never silently lost.

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
