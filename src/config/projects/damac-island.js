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
      { label: 'Bedrooms', value: '4 & 5' },
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
    titleline: 'Waterfront Villas in the',
    titleLine1: '4&5 BR Waterfront Villas',
    titleLine2: 'in the Middle of Dubai',
    // 'image' = show the hero creative as-is (it already contains logo + headline + offer),
    // always fully visible on every screen. Remove this line to use the text hero instead.
    mode: 'image',
    imageWidth: 2560,
    imageHeight: 1136,
    // imageMobile: '/images/damac-island-cover-mobile.jpg', // optional portrait creative for phones
    showForm: false, // set true to show the enquiry form inside the hero
    align: 'center', // 'left' or 'center'
    position: 'top', // 'top' keeps content in the upper part of the image; 'center' = vertically centred
    // Logo shown above the headline. Put the file in /public/images/ (PNG/SVG with transparent background).
    logo: { src: '/images/damac-islands-2-logo.png', alt: 'DAMAC Islands 2', height: 90 },
    overlay: false, // dark tint over the hero image (false = show image as-is)
    textBackdrop: true, // soft dark glow only behind the text so it stays readable
    // Use " | " to split into separate highlight items
    // subtitle: '4 & 5-Bed Spacious Villas | 4% DLD Fee Waiver | Starting from USD 814K (AED 2.99M)',
    // Highlight boxes under the headline. `value` shows in gold, `text` in white, `eyebrow` is a small line on top.
    badges: [
      { value: '4%', text: 'DLD Fee Waiver' },
      { eyebrow: 'Starting from', value: 'USD 814K', text: '(AED 2.99M)' },
    ],
    primaryCta: { label: ' Learn More', href: '#highlights' },
    secondaryCta: { label: 'Download Brochure', href: '#enquire' },
    // image: unsplash('photo-1613490493576-7fde63acd811', 2200),
    // image: 'https://v.fastcdn.co/u/a43967b2/66043466-0-di2-desktop-banner.webp',
    image: '/images/damac-island-cover-2560.jpg',
    // Responsive versions: phones load the 1280px file, desktops / retina the 2560px file
    imageSrcSet: [
      ['/images/damac-island-cover-1280.jpg', 1280],
      ['/images/damac-island-cover-2560.jpg', 2560],
    ],
    stats: [
      { value: 'Flexible', label: 'Payment plans' },
      { value: 'Freehold', label: '100% Ownership' },
      { value: 'Size', label: '2,200 to 5,000 sq.ft' },
      { value: 'Handover', label: 'June 2030' },
    ],
    statsPosition: 'bottom', // 'bottom' pins the facts to the bottom of the hero; 'inline' = under the heading
  },

  form: {
    title: 'Get in Touch',
    subtitle: 'Leave your details and our property consultant will call you back.',
    submitLabel: 'Request a Call Back',
    // "Purpose" dropdown in the enquiry forms
    purposeOptions: ['For Investment', 'For Personal Use', 'Both'],
    consentText: 'By submitting, you agree to be contacted about this project.',
    successTitle: 'Thank you!',
    successMessage: 'Your request has been received. A consultant will call you shortly.',
  },

  highlights: {
    eyebrow: 'Damac Island 2',
    title: 'Key Highlights',
    // description:
    //   'A gated community of contemporary villas where generous space, considered design and everyday convenience come together.',
    // image: unsplash('photo-1600596542815-ffad4c1539a9', 1600),
    image: "/images/damac-islands-2-highlights.jpg",
    imageBadge: { value: 'Handover', label: 'in June 2030' },
    items: [
      { icon: 'Home', title: '4 & 5 BR Waterfront Townhouses & Villas' },
      { icon: 'Tag', title: 'Starting From AED 2.99M' },
      { icon: 'Wallet', title: '10% to Book' },
      { icon: 'BadgePercent', title: '4% DLD Fee Waiver' },
      { icon: 'CalendarCheck', title: '75/25 Payment Plan' },
      { icon: 'Waves', title: 'Crystal Lagoons & Private Beach Lifestyle' },
      { icon: 'MapPin', title: 'Minutes Away from Burj Khalifa & Dubai Marina' },
    ],
    // Buttons under the list (first = gold, second = outline). Remove to hide.
    ctas: [{ label: 'Book a Free Consultation', href: '#enquire' }],
  },

  amenities: {
    eyebrow: 'Resort-Style Living',
    title: 'Amenities',
    description: 'Experience 45+ Resort-Style Amenities — From Healing Pools and Tropical Waterfalls to Sky Ziplines, Luxury Wellness Retreats and Nature-Inspired Living',
    items: [
      { icon: 'Waves', title: 'Saltwater & Healing Pools', text: 'Relaxing saltwater pools with herbal tea and aromatherapy experiences.', image: '/images/amenities/saltwater-healing-pools.jpg' },
      { icon: 'Droplets', title: 'Waterfalls & Tranquil Lakes', text: 'Peaceful lakes, cascading waterfalls and nature-inspired relaxation spaces.', image: '/images/amenities/waterfalls-tranquil-lakes.jpg' },
      { icon: 'TentTree', title: 'Sky Zipline & Canopy Walk', text: 'Elevated canopy walks, treehouse adventures and exciting zipline experiences.', image: '/images/amenities/sky-zipline-canopy-walk.jpg' },
      { icon: 'Flower2', title: 'Luxury Spa & Wellness', text: 'Rejuvenating spa experiences with healing herbs, crystals and wellness facilities.', image: '/images/amenities/luxury-spa-wellness.jpg' },
      { icon: 'Dumbbell', title: 'Eco-Friendly Gym', text: 'Green fitness spaces with eco-friendly gym facilities and biodynamic training.', image: '/images/amenities/eco-friendly-gym.jpg' },
      { icon: 'Sparkles', title: '45+ Lifestyle Amenities', text: 'Over 45 world-class amenities for wellness, adventure, nature and social living.', image: '/images/amenities/lifestyle-amenities.jpg' },
    ],
  },

  // "Eight destinations" section shown after Amenities (remove to hide)
  destinations: {
    titleBold: 'Eight Destinations,',
    titleLight: 'One Seamless Paradise',
    background: '/images/destinations/islands-bg.jpg',
    map: '/images/destinations/islands-map.png', // island map graphic (left side, desktop)
    items: [
      { name: 'Bahamas', icon: '/images/destinations/bahamas.png' },
      { name: 'Tahiti', icon: '/images/destinations/tahiti.png' },
      { name: 'Bermuda', icon: '/images/destinations/bermuda.png' },
      { name: 'Barbados', icon: '/images/destinations/barbados.png' },
      { name: 'Cuba', icon: '/images/destinations/cuba.png' },
      { name: 'Maui', icon: '/images/destinations/maui.png' },
      { name: 'Mauritius', icon: '/images/destinations/mauritius.png' },
      { name: 'Antigua', icon: '/images/destinations/antigua.png' },
    ],
    paragraphs: [
      'From the rhythm of Bahamas to the serenity of Tahiti, from the tropical vibrancy of Barbados to the mystique of Mauritius, DAMAC Islands 2 brings together the world’s most captivating island landscapes in one extraordinary community.',
      'This is where island dreams come alive, inviting you to live the island state of mind, every single day.',
    ],
    cta: { label: 'Know More', href: '#enquire' },
  },

  floorPlans: {
    eyebrow: 'Layouts',
    title: 'Floor Plans',
    description: 'Thoughtfully designed waterfront townhouses for modern family living. Select a unit type to preview its layout.',
    lockPlans: true, // blur plans behind an "unlock" card that leads to the enquiry form
    sizeLabel: 'Size',
    plans: [
      {
        id: '4br-townhouse',
        label: '4 BR Townhouse',
        title: '4 Bedroom Townhouse',
        watermark: '4BR',
        image: '/images/floor-plans/4br-townhouse.jpg',
        size: { sqft: '2,185.50', sqm: '203.04' },
      },
      {
        id: '5br-townhouse',
        label: '5 BR Townhouse',
        title: '5 Bedroom Townhouse',
        watermark: '5BR',
        image: '/images/floor-plans/5br-townhouse.jpg',
        size: { sqft: '3,158.24', sqm: '293.41' }, 
      },
    ],
    disclaimer: 'Plans are indicative and not to scale. Final layouts and areas may vary.',
  },

  gallery: {
    eyebrow: 'Visual Tour',
    title: 'Gallery',
    description: "Explore the architecture, interiors, lagoons and lifestyle that define Dubai's newest waterfront destination.",
    images: [
      { src: '/images/gallery/villa-exterior-carport.jpg', alt: 'Modern DAMAC Islands 2 villa with covered carport and a family arriving home at dusk', category: 'Exterior' },
      { src: '/images/gallery/living-dining-room.jpg', alt: 'Spacious living and dining room with sculptural chandelier, marble feature wall and blue velvet seating', category: 'Interior' },
      { src: '/images/gallery/villa-private-pool.jpg', alt: 'Two-storey villa with private pool, sun loungers and landscaped garden terrace', category: 'Exterior' },
      { src: '/images/gallery/master-bedroom.jpg', alt: 'Master bedroom with sculptural wall art, floor-to-ceiling windows and lounge seating', category: 'Interior' },
      { src: '/images/gallery/crystal-lagoon-beach.jpg', alt: 'Crystal lagoon with sandy beach, palm islands and residents kayaking and paddleboarding', category: 'Lifestyle' },
      { src: '/images/gallery/marble-bathroom.jpg', alt: 'Luxury marble bathroom with freestanding bathtub, double vanity and glass shower', category: 'Interior' },
      { src: '/images/gallery/masterplan-aerial.jpg', alt: 'Aerial view of the DAMAC Islands 2 masterplan with turquoise lagoons winding through the community', category: 'Landscape' },
      { src: '/images/gallery/lagoon-island-aerial.jpg', alt: 'Aerial view of an island in the lagoon with beaches, water play areas and leisure facilities', category: 'Lifestyle' },
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
    name: 'DAMAC Properties',
    // Logo shown top-left on a navy panel (use a white/light logo). Leave empty to use the built-in mark.
    logoSrc: '/images/damac-islands-2-logo.png',
    // intro:
    //   'A trusted name in UAE real estate, known for delivering high-quality communities and exceptional living experiences across Dubai.',
    intro: 'WHY DAMAC PROPERTIES?',
    // body:
    //   'With a portfolio spanning villas, townhouses and landmark residences, the developer pairs refined architecture with meticulous construction standards — creating homes that hold their value and communities residents are proud to call home.',
    body: 'Renowned for iconic developments and exceptional craftsmanship, DAMAC Properties blends elegance, innovation, and world-class amenities. With a presence in the UAE, Saudi Arabia, Qatar, and beyond, its portfolio of luxury residential, commercial, and leisure properties sets a global standard for excellence.',
    stats: [
      { icon: 'House', value: '50,000+', label: 'Homes delivered*' },
      { icon: 'Building', value: '54,000+', label: 'In planning and progress*' },
      { icon: 'Trophy', value: '100+', label: 'Awards received' },
      { icon: 'Globe2', value: '9', label: 'Countries' },
    ],
    statsNote: '* Figures as published by DAMAC Properties.',
    pillars: [], // trust points under the figures (empty = hidden)
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
    showBrand: false, // hide logo + phone/email row; keep disclaimer and copyright
    disclaimer:
      'All images are for illustrative purposes only. Specifications, prices and availability are subject to change without notice.',
  },
}

export default damacIsland
