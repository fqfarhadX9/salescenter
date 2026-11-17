/**
 * DAMAC Islands — project landing page content (served at /damac-island).
 *
 * Everything a marketer would want to change per campaign lives here:
 * names, copy, images, highlights, amenities, floor plans, gallery and
 * form options. Components read from this file only — no copy is
 * hard-coded in the UI.
 *
 * NOTE: Project/developer names and figures below are PLACEHOLDERS.
 * Replace them with the real project details before going live.
 *
 * Images: any URL or a path inside /public (e.g. '/images/hero.jpg').
 */

const unsplash = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const damacIsland = {
  // URL: offplansale.com/<slug>
  slug: 'damac-island',

  // Card shown on the home page project list
  card: {
    title: 'DAMAC Islands',
    developer: 'DAMAC Properties',
    location: 'Dubai',
    image: 'https://v.fastcdn.co/u/a43967b2/66043466-0-di2-desktop-banner.webp',
    tag: 'Off-Plan',
    summary: 'Island-inspired villas and townhouses with resort-style amenities.',
    facts: [
      { label: 'Type', value: 'Villas & Townhouses' },
      { label: 'Bedrooms', value: '3–5' },
      { label: 'Payment', value: 'Flexible plan' },
    ],
  },

  showNavbar: false, // top navigation bar on this page

  seo: {
    title: 'DAMAC Islands | Luxury Villas for Sale in Dubai',
    description: 'Explore DAMAC Islands villas — floor plans, amenities, gallery and payment plans. Request a call back today.',
  },

  brand: {
    name: 'Offplan Sale',
    subtitle: 'Villas · Dubai',
    // Optional: path to a logo image. Leave empty to use the built-in mark.
    logoSrc: '',
  },

  contact: {
    phone: '+971 4 000 0000',
    phoneHref: 'tel:+97140000000',
    whatsappHref: 'https://wa.me/971500000000',
    email: 'sales@example.com',
  },

  nav: [
    // { label: 'Highlights', href: '#highlights' },
    // { label: 'Amenities', href: '#amenities' },
    // { label: 'Floor Plans', href: '#floor-plans' },
    // { label: 'Gallery', href: '#gallery' },
    // { label: 'Why Dubai', href: '#why-dubai' },
    // { label: 'Developer', href: '#developer' },
  ],

  hero: {
    eyebrow: '', // small gold label above the headline (leave empty to hide)
    titleLine1: 'PAY LIKE FOUR',
    titleLine2: 'LIVE IN FIVE',
    titleline: 'Waterfront Villas in the',
    showForm: false, // set true to show the enquiry form inside the hero
    align: 'center', // 'left' or 'center'
    // Logo shown above the headline. Put the file in /public/images/ (PNG/SVG with transparent background).
    logo: { src: '/images/damac-islands-2-logo.png', alt: 'DAMAC Islands 2', height: 120 },
    overlay: false, // dark tint over the hero image (false = show image as-is)
    textBackdrop: true, // soft dark glow only behind the text so it stays readable
    subtitle:
      'Exceptional villas designed around the way you want to live — private pools, landscaped gardens and resort-style amenities, minutes from the heart of the city.',
    primaryCta: { label: 'Learn More', href: '#highlights' },
    secondaryCta: { label: 'Download Brochure', href: '#enquire' },
    // image: unsplash('photo-1613490493576-7fde63acd811', 2200),
    image: 'https://v.fastcdn.co/u/a43967b2/66043466-0-di2-desktop-banner.webp',
    stats: [
      { value: '3–5', label: 'Bedroom villas' },
      { value: 'Flexible', label: 'Payment plans' },
      { value: 'Freehold', label: 'Ownership' },
    ],
  },

  form: {
    title: 'Get in Touch',
    subtitle: 'Leave your details and our property consultant will call you back.',
    submitLabel: 'Request a Call Back',
    propertyTypes: ['3 Bedroom Villa', '4 Bedroom Villa', '5 Bedroom Villa', 'Townhouse', 'Not sure yet'],
    consentText: 'By submitting, you agree to be contacted about this project.',
    successTitle: 'Thank you!',
    successMessage: 'Your request has been received. A consultant will call you shortly.',
  },

  highlights: {
    eyebrow: 'The Collection',
    title: 'Key Highlights',
    description:
      'A gated community of contemporary villas where generous space, considered design and everyday convenience come together.',
    image: unsplash('photo-1600596542815-ffad4c1539a9', 1600),
    imageBadge: { value: 'Ready', label: 'Handover options' },
    items: [
      { icon: 'Home', title: 'Spacious Villa Living', text: 'Double-height living areas, private gardens and pools.' },
      { icon: 'MapPin', title: 'Prime Dubai Location', text: 'Quick access to major highways, schools and malls.' },
      { icon: 'LayoutGrid', title: 'Thoughtful Floor Plans', text: 'Open layouts with maid’s rooms and en-suite bedrooms.' },
      { icon: 'Gem', title: 'Lifestyle Amenities', text: 'Clubhouse, parks, fitness and leisure on your doorstep.' },
      { icon: 'ShieldCheck', title: 'Gated & Secure', text: '24/7 security and controlled community access.' },
      { icon: 'Wallet', title: 'Flexible Payment Plan', text: 'Attractive plans with post-handover options.' },
    ],
  },

  amenities: {
    eyebrow: 'Resort-Style Living',
    title: 'Amenities',
    description: 'Everything your family needs to unwind, play and stay active — all within the community.',
    items: [
      { icon: 'Waves', title: 'Swimming Pool', text: 'Temperature-controlled lagoon-style pools.', image: "https://pangeadubai.com/wp-content/uploads/2024/12/Damac-Islands-Pools-1024x630.webp" },
      { icon: 'Trees', title: 'Landscaped Gardens', text: 'Shaded walkways and lush green parks.', image: unsplash('photo-1585320806297-9794b3e4eeae', 900) },
      { icon: 'Dumbbell', title: 'Fitness Centre', text: 'Fully equipped indoor and outdoor gyms.', image: unsplash('photo-1534438327276-14e5300c3a48', 900) },
      { icon: 'Baby', title: "Children's Play Area", text: 'Safe, imaginative play zones for kids.', image: "https://images.ctfassets.net/zoq5l15g49wj/5idX10CneXJaqJqDyIhwn0/12fa33c8b04f96b3fe65ce9c7cb6156c/Damac_Lagoons_Morocco-Amenities-01-Kids-Play-Area-4x3.jpg" },
      { icon: 'Building2', title: 'Clubhouse', text: 'Lounge, café and residents-only events.', image: unsplash('photo-1566073771259-6a8506099945', 900) },
      { icon: 'Sun', title: 'Leisure Spaces', text: 'Sun decks, BBQ areas and cabanas.', image: unsplash('photo-1571896349842-33c89424de2d', 900) },
    ],
  },

  floorPlans: {
    eyebrow: 'Layouts',
    title: 'Floor Plans',
    description: 'Spacious layouts for modern family living. Select a villa type to view its plan.',
    // `image` is optional — when empty, a generated illustrative plan is shown.
    plans: [
      {
        id: '3br',
        label: '3 Bedroom',
        image: '',
        variant: 3,
        details: [
          { label: 'Built-up area', value: 'From 2,800 sq.ft' },
          { label: 'Plot size', value: 'From 3,500 sq.ft' },
          { label: 'Bathrooms', value: '4' },
          { label: 'Parking', value: '2 cars' },
        ],
        features: ['Maid’s room', 'Private garden', 'Family lounge'],
      },
      {
        id: '4br',
        label: '4 Bedroom',
        image: '',
        variant: 4,
        details: [
          { label: 'Built-up area', value: 'From 3,600 sq.ft' },
          { label: 'Plot size', value: 'From 4,500 sq.ft' },
          { label: 'Bathrooms', value: '5' },
          { label: 'Parking', value: '2 cars' },
        ],
        features: ['Maid’s room', 'Private pool option', 'Study'],
      },
      {
        id: '5br',
        label: '5 Bedroom',
        image: '',
        variant: 5,
        details: [
          { label: 'Built-up area', value: 'From 4,800 sq.ft' },
          { label: 'Plot size', value: 'From 6,000 sq.ft' },
          { label: 'Bathrooms', value: '6' },
          { label: 'Parking', value: '3 cars' },
        ],
        features: ['Private pool', 'Majlis', 'Driver’s room'],
      },
    ],
    disclaimer: 'Plans are illustrative and not to scale. Final layouts may vary.',
  },

  gallery: {
    eyebrow: 'Visual Tour',
    title: 'Gallery',
    description: 'A closer look at the architecture, interiors and lifestyle that await.',
    images: [
      { src: unsplash('photo-1600585154340-be6161a56a0c', 1600), alt: 'Contemporary villa exterior at dusk', category: 'Exterior' },
      { src: unsplash('photo-1600210492486-724fe5c67fb0', 1600), alt: 'Bright double-height living room', category: 'Interior' },
      { src: unsplash('photo-1580587771525-78b9dba3b914', 1600), alt: 'Villa facade with landscaped front garden', category: 'Exterior' },
      { src: unsplash('photo-1600607687939-ce8a6c25118c', 1600), alt: 'Open-plan living and dining area', category: 'Interior' },
      { src: unsplash('photo-1564501049412-61c2a3083791', 1600), alt: 'Pool deck with loungers', category: 'Lifestyle' },
      { src: unsplash('photo-1600566753190-17f0baa2a6c3', 1600), alt: 'Modern kitchen with island', category: 'Interior' },
      { src: unsplash('photo-1512917774080-9991f1c4c750', 1600), alt: 'Villa with private pool', category: 'Landscape' },
      { src: unsplash('photo-1540541338287-41700207dee6', 1600), alt: 'Resort-style pool among palms', category: 'Lifestyle' },
    ],
  },

  whyDubai: {
    eyebrow: 'Invest With Confidence',
    title: 'Why Dubai?',
    description:
      'A global city of opportunity, luxury and an unmatched lifestyle — with world-class infrastructure and a property market built for long-term growth.',
    image: unsplash('photo-1512453979798-5ea266f8880c', 2200),
    items: [
      { icon: 'Globe2', title: 'Global Business Hub', text: 'A gateway between East and West, home to thousands of international companies.' },
      { icon: 'Palmtree', title: 'World-Class Lifestyle', text: 'Beaches, fine dining, top schools and year-round sunshine.' },
      { icon: 'Plane', title: 'Exceptional Connectivity', text: 'One of the world’s busiest international airports, with most of the world within an 8-hour flight.' },
      { icon: 'TrendingUp', title: 'Investment Appeal', text: 'No personal income tax, freehold ownership for foreigners and long-term residency options for property investors.' },
      { icon: 'TrainFront', title: 'Modern Infrastructure', text: 'Metro, road networks and smart-city services built for the future.' },
      { icon: 'ShieldCheck', title: 'Safe & Stable', text: 'Consistently ranked among the safest cities in the world.' },
    ],
  },

  developer: {
    eyebrow: 'About the Developer',
    name: 'Your Developer',
    // Optional: path to developer logo image. Leave empty to use the built-in mark.
    logoSrc: '',
    intro:
      'A trusted name in UAE real estate, known for delivering high-quality communities and exceptional living experiences across Dubai.',
    body:
      'With a portfolio spanning villas, townhouses and landmark residences, the developer pairs refined architecture with meticulous construction standards — creating homes that hold their value and communities residents are proud to call home.',
    stats: [
      { value: '20+', label: 'Years of experience' },
      { value: '15k+', label: 'Homes delivered' },
      { value: '30+', label: 'Communities' },
    ],
    pillars: [
      { icon: 'ShieldCheck', title: 'Quality Construction', text: 'Premium materials and rigorous standards.' },
      { icon: 'Handshake', title: 'Trusted Partnership', text: 'Transparent processes from booking to handover.' },
      { icon: 'Award', title: 'Excellence in Design', text: 'Award-winning architecture and interiors.' },
    ],
  },

  finalCta: {
    eyebrow: 'Limited Availability',
    titleLine1: 'Take the Next Step',
    titleLine2: 'Towards Your New Home',
    description:
      'Speak with our property consultants to receive the latest prices, payment plans and availability for your preferred villa.',
    image: unsplash('photo-1518684079-3c830dcef090', 2000),
    perks: ['Latest price list & payment plan', 'Floor plans & brochure', 'Private viewing on request'],
  },

  footer: {
    disclaimer:
      'All images are for illustrative purposes only. Specifications, prices and availability are subject to change without notice.',
  },
}

export default damacIsland
