/**
 * Palm Springs by Nakheel — project landing page content (served at /palmsprings).
 *
 * Same layout and sections as DAMAC Islands 2 (damac-island.js); only the content differs.
 * Source: palmspringsbynakheel.com (Nov 2026). Prices, sizes and dates are as published
 * there and subject to confirmation by the developer.
 *
 * Images: currently loaded from palmspringsbynakheel.com (see `ps()` below).
 * To host them yourself, save the files to /public/images/palm-springs/ and
 * change `ps()` to return `/images/palm-springs/${file}`.
 */

const unsplash = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const PS_IMG = 'https://palmspringsbynakheel.com/assets/img'
/** Render image by file name (without the "palm-springs-" prefix). */
const ps = (name) => `${PS_IMG}/renders/palm-springs-${name}.webp`

const palmSprings = {
  // URL: offplansale.com/<slug>
  slug: 'palmsprings',
  // Other addresses that redirect here
  aliases: ['palm-springs', 'palm-springs-by-nakheel'],

  // Card shown on the home page project list
  card: {
    title: 'Palm Springs',
    developer: 'Nakheel',
    location: 'Gateway to Palm Jebel Ali, Dubai',
    image: `${PS_IMG}/og-palm-springs-launch.jpg`,
    tag: 'Off-Plan',
    summary: 'Nature-led townhouses and villas around Canyon Park, beside Sheikh Zayed Road.',
    facts: [
      { label: 'Type', value: 'Townhouses & Villas' },
      { label: 'Bedrooms', value: '3, 4 & 5' },
      { label: 'Payment', value: '60/40 plan' },
    ],
  },

  showNavbar: false,
  mobileCtaBar: false,

  seo: {
    title: 'Palm Springs by Nakheel | Townhouses & Villas for Sale in Dubai',
    description:
      'Palm Springs by Nakheel — 3, 4 & 5-bedroom townhouses and villas at the gateway to Palm Jebel Ali. From AED 3.8M with a 60/40 payment plan. Request a call back today.',
  },

  brand: {
    name: 'Offplan Sale',
    subtitle: 'Villas · Dubai',
    logoSrc: '',
  },

  contact: {
    phone: '+971 4 000 0000',
    phoneHref: 'tel:+97140000000',
    whatsappHref: 'https://wa.me/971500000000',
    email: 'sales@example.com',
  },

  nav: [],

  hero: {
    mode: 'designed',
    // titleLine1: '3, 4 & 5-BR Townhouses & Villas',
    titleLine1: 'Ultra Luxury Townhouses & Villas By Nakheel',
    titleLine2: 'Next to Palm Jebel Ali On Sheikh Zayed Road',
    imageAlt: 'Palm Springs by Nakheel townhouses and villas among palm trees, beside Sheikh Zayed Road with Palm Jebel Ali and the sea beyond',
    background: {
      // Hero photo: Palm Springs with Palm Jebel Ali and the sea behind (supplied by the client, 1600×750)
      image: '/images/palm-springs/hero.jpg',
      position: '50% 40%', // keeps the sky behind the headline and the homes in view
      // Deeper blue shade behind the text so the gold line stays readable over the bright horizon
      shade: 'linear-gradient(180deg, rgba(4,38,84,0.55) 0%, rgba(4,38,84,0.38) 55%, rgba(4,38,84,0) 100%)',
      // Phones + upright tablets: same photo anchored at the bottom, its sky fading into this gradient
      mobile: '/images/palm-springs/hero-mobile.jpg',
      mobileWidth: 1080,
      mobileHeight: 1177, // portrait crop (homes + Palm Jebel Ali) of the same photo
      skyTop: '#05356a',
      skyBottom: '#0a4f97', // matches the top of the photo's sky
    },
    offer: {
      highlight: { value: '60/40', text: 'Payment Plan' },
      price: { prefix: 'Starting from', value: 'AED 3.8M', suffix: '( USD 1.03M )' },
    },
    bookCta: { label: 'Book with just 10%', href: '#enquire' },
    logo: { src: `${PS_IMG}/logo-palm-springs.webp`, alt: 'Palm Springs by Nakheel', height: 90 },
  },

  form: {
    title: 'Get in Touch',
    subtitle: 'Leave your details and our property consultant will call you back.',
    submitLabel: 'Submit',
    purposeOptions: ['For Investment', 'For Personal Use', 'Both'],
    consentText: 'By submitting, you agree to be contacted about this project.',
    successTitle: 'Thank you!',
    successMessage: 'Your request has been received. A consultant will call you shortly.',
  },

  highlights: {
    eyebrow: 'Palm Springs by Nakheel',
    title: 'Key Highlights',
    image: ps('residences-image'),
    imageBadge: { value: 'Handover', label: 'in October 2030' },
    items: [
      { icon: 'Home', title: '3 & 4 BR Townhouses, 4 & 5 BR Villas' },
      { icon: 'Tag', title: 'Starting From AED 3.8M (USD 1.03M)' },
      { icon: 'Wallet', title: '10% to Book' },
      { icon: 'CalendarCheck', title: '60/40 Payment Plan' },
      { icon: 'Trees', title: '382-Hectare Masterplan with 30%+ Open Space' },
      { icon: 'Bike', title: '35 km of Cycling & Jogging Tracks' },
      { icon: 'MapPin', title: 'Gateway to Palm Jebel Ali, beside Sheikh Zayed Road' },
    ],
    ctas: [{ label: 'Book a Free Consultation', href: '#enquire' }],
  },

  amenities: {
    eyebrow: 'Nature-Led Living',
    title: 'Amenities',
    description:
      'Two Signature Clubs, Canyon Park and 35 km of Cycling & Jogging Tracks — Resort-Style Pools, Courts, Gardens and Play Areas Within the Community',
    items: [
      { icon: 'Waves', title: 'Beach Pool & Sand Beach', text: 'A beach pool with a sand beach, lap pool, kids’ pools and splash pads.', image: ps('pool-03') },
      { icon: 'Palmtree', title: 'Thousand Palms Country Club', text: 'The social hub with restaurants, gym, courtyard and an event lawn.', image: ps('community-06') },
      { icon: 'Trophy', title: 'Silver Spur Racquet Club', text: 'Racquet and sports courts with a poolside pavilion for active living.', image: ps('community-park-05') },
      { icon: 'Trees', title: 'Canyon Park', text: 'Sensory gardens, waterways and green corridors at the heart of the community.', image: ps('community-park-02') },
      { icon: 'Baby', title: 'Kids’ Play Parks', text: 'Play parks, an adventure oasis and a nature centre for young families.', image: ps('community-park-01') },
      { icon: 'UtensilsCrossed', title: 'Dining & Courtyard Lounges', text: 'Restaurants, landscaped courtyards and lounges for relaxed social time.', image: ps('community-09') },
    ],
  },

  // "Destinations"-style section after Amenities: the masterplan and its neighbourhoods
  destinations: {
    titleBold: '15 Neighbourhoods,',
    titleLight: 'One Nature-Led Community',
    background: ps('community-05'),
    map: ps('masterplan-community'),
    mapAlt: 'Palm Springs masterplan showing the four Rancho and eleven Aliso neighbourhoods around Canyon Park',
    mapFramed: true, // the masterplan is a full image (not a cut-out), so show it in a rounded frame
    tint: {
      base: '#12304d',
      multiply: 'rgba(15, 39, 64, 0.62)',
      gradient: 'linear-gradient(180deg, rgba(15,39,64,0) 0%, rgba(15,39,64,0.35) 55%, rgba(12,30,50,0.92) 100%)',
    },
    items: [
      { name: 'Aliso', sub: 'Townhouses · 11 Areas', iconName: 'Home' },
      { name: 'Rancho', sub: 'Villas · 4 Areas', iconName: 'House' },
      { name: 'Canyon Park', sub: 'Gardens & Waterways', iconName: 'Trees' },
      { name: 'Thousand Palms', sub: 'Country Club', iconName: 'Palmtree' },
      { name: 'Silver Spur', sub: 'Racquet Club', iconName: 'Trophy' },
      { name: '35 km', sub: 'Cycling & Jogging Tracks', iconName: 'Bike' },
      { name: '30%+', sub: 'Open Space', iconName: 'Sprout' },
      { name: '382 Hectares', sub: 'Masterplan', iconName: 'Map' },
    ],
    paragraphs: [
      'Palm Springs brings together eleven Aliso townhouse neighbourhoods and four Rancho villa neighbourhoods, all set around Canyon Park, a green spine of sensory gardens, waterways and shaded walks.',
      'Homes open onto private courtyards and gardens, with two signature clubs and planned schools, shops and transport links within the masterplan.',
    ],
    cta: { label: 'Know More', href: '#enquire' },
  },

  floorPlans: {
    eyebrow: 'Layouts',
    title: 'Floor Plans',
    description:
      'Aliso townhouses and Rancho villas with panoramic windows and private courtyards. Select a unit type to preview its layout.',
    lockPlans: true,
    sizeLabel: 'Size From',
    plans: [
      {
        id: '3br-townhouse',
        label: '3BR TH',
        title: '3 Bedroom Townhouse',
        subtitle: 'Aliso · G+1 · From AED 3.8M',
        watermark: '3BR',
        variant: 3,
        size: { sqft: '2,328.6', sqm: '216.33' },
      },
      {
        id: '4br-townhouse',
        label: '4BR TH',
        title: '4 Bedroom Townhouse',
        subtitle: 'Aliso · G+1 & G+2 · From AED 4.6M',
        watermark: '4BR',
        variant: 4,
        size: { sqft: '2,672.0', sqm: '248.24' },
      },
      {
        id: '4br-villa',
        label: '4BR Villa',
        title: '4 Bedroom Villa',
        subtitle: 'Rancho · G+2 · From AED 7.0M',
        watermark: '4BR',
        variant: 4,
        size: { sqft: '4,041.4', sqm: '375.46' },
      },
      {
        id: '5br-villa',
        label: '5BR Villa',
        title: '5 Bedroom Villa',
        subtitle: 'Rancho · G+2 · From AED 8.9M',
        watermark: '5BR',
        variant: 5,
        size: { sqft: '4,921.4', sqm: '457.21' },
      },
    ],
    disclaimer: 'Plans are indicative and not to scale. Final layouts, areas and prices are subject to confirmation by the developer.',
  },

  gallery: {
    eyebrow: 'Visual Tour',
    title: 'Gallery',
    description: 'Explore the architecture, interiors, parks and lifestyle of Nakheel’s newest community.',
    images: [
      { src: ps('5-bed-villa-5br-villa-ext-01'), alt: 'Rancho 5-bedroom villa with garden frontage', category: 'Exterior' },
      { src: ps('5-bedroom-villa-int-5br-mbr-01'), alt: '5-bedroom villa master bedroom', category: 'Interior' },
      { src: ps('4-plex-townhouses-th-ext-02'), alt: 'Aliso 4-plex townhouses along a landscaped street', category: 'Exterior' },
      { src: ps('5-bedroom-villa-int-5br-bh-01'), alt: '5-bedroom villa bathroom', category: 'Interior' },
      { src: ps('pool-06'), alt: 'Pool at Thousand Palms Country Club', category: 'Lifestyle' },
      { src: ps('4-bedroom-villa-int-4br-lv-and-d-and-k-01'), alt: '4-bedroom villa open-plan living, dining and kitchen', category: 'Interior' },
      { src: ps('community-12'), alt: 'Aerial view of the Palm Springs masterplan', category: 'Landscape' },
      { src: ps('community-10'), alt: 'Water gardens in the Palm Springs community', category: 'Landscape' },
    ],
  },

  location: {
    eyebrow: 'Location',
    title: 'At the Gateway to Palm Jebel Ali',
    description:
      'Palm Springs sits beside Sheikh Zayed Road and Al Maktoum Airport Street in Dubai’s southern growth corridor, next to a planned Red Line Metro extension station and close to Etihad Rail’s Al Yalayis station.',
    map: `${PS_IMG}/renders/palm-springs-location-map.webp?v=2`,
    mapAlt: 'Map showing Palm Springs beside Sheikh Zayed Road near Palm Jebel Ali',
    items: [
      { icon: 'Palmtree', name: 'Palm Jebel Ali', time: '14 min' },
      { icon: 'MapPin', name: 'Bluewaters Island', time: '20 min' },
      { icon: 'Plane', name: 'Al Maktoum Int’l Airport (DWC)', time: '23 min' },
      { icon: 'Palmtree', name: 'Palm Jumeirah', time: '25 min' },
      { icon: 'Landmark', name: 'Burj Al Arab', time: '30 min' },
      { icon: 'MapPin', name: 'Yas Island, Abu Dhabi', time: '50 min' },
    ],
    note: 'Travel times are approximate and may vary depending on route, traffic and time of day.',
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
    name: 'Nakheel',
    logoSrc: `${PS_IMG}/logo-palm-springs.webp`,
    intro: 'WHY NAKHEEL?',
    body: 'Nakheel is one of Dubai’s leading master developers and the name behind Palm Jumeirah. Its landmark communities, from Palm Jebel Ali and Dubai Islands to Jumeirah Park, Jumeirah Islands and Al Furjan, are known for green spaces, waterfront living and lasting value.',
    // Landmark communities (the developer's site publishes no headline figures)
    stats: [
      { icon: 'Palmtree', value: 'Palm Jumeirah', label: 'Delivered' },
      { icon: 'Waves', value: 'Palm Jebel Ali', label: 'In progress' },
      { icon: 'Landmark', value: 'Dubai Islands', label: 'In progress' },
      { icon: 'Trees', value: 'Jumeirah Park', label: 'Delivered' },
    ],
    statsNote: 'Selected Nakheel communities.',
    pillars: [],
  },

  finalCta: {
    eyebrow: 'Limited Availability',
    titleLine1: 'Take the Next Step',
    titleLine2: 'Towards Your New Home',
    description:
      'Speak with our property consultants to receive the latest prices, payment plan and availability for your preferred townhouse or villa.',
    image: ps('community-14'),
    perks: ['Latest price list & payment plan', 'Floor plans & brochure', 'Private consultation on request'],
  },

  footer: {
    showBrand: false,
    disclaimer:
      'All images are for illustrative purposes only. Specifications, prices and availability are subject to change and confirmation by the developer.',
  },
}

export default palmSprings
