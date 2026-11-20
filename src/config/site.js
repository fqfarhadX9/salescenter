/**
 * Site-wide settings for offplansale.com (home page, header, footer).
 * Each project page has its own config in ./projects/.
 */
export const site = {
  brand: {
    name: 'Offplan Sale',
    subtitle: 'Dubai Properties',
    logoSrc: '', // optional logo image path, e.g. '/images/logo.svg'
  },

  // Where enquiry forms send leads: your Google Apps Script web-app URL (ends in /exec).
  // Leads are saved to the Google Sheet AND emailed (see integrations/google-apps-script.gs).
  // Paste the URL between the quotes. (VITE_LEAD_ENDPOINT, if set at build time, takes priority.)
  leadEndpoint: 'https://script.google.com/macros/s/AKfycbzlklUbjfY39p7Qsrv2cGeGtUb-mTE9egEJ23IH8SJO48gG4Kjoy7UnOMPNnFXJcwYr/exec',

  contact: {
    phone: '+971 4 000 0000',
    phoneHref: 'tel:+97140000000',
    whatsappHref: 'https://wa.me/971500000000',
    email: 'sales@example.com',
  },

  seo: {
    title: 'Offplan Sale | Off-Plan Properties for Sale in Dubai',
    description: 'Explore the latest off-plan villas, townhouses and apartments in Dubai. Floor plans, payment plans and expert advice.',
  },

  home: {
    eyebrow: 'Off-Plan Projects in Dubai',
    title: 'Discover Dubai’s Most Sought-After',
    titleAccent: 'Off-Plan Communities',
    subtitle:
      'Handpicked launches from leading developers — explore floor plans, amenities and payment plans, and get the latest prices from our consultants.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=80',
    projectsTitle: 'Featured Projects',
    projectsSubtitle: 'Select a project to view full details, floor plans and pricing.',
  },

  footer: {
    disclaimer:
      'All images are for illustrative purposes only. Specifications, prices and availability are subject to change without notice.',
  },
}
