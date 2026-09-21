// Single source of truth for the Hydra Curls landing page copy & structured
// content, extracted from the Figma design ("Parachute Advanced Hydra
// Curls" — file key Yqq9qC4hZqj0adhv5kJUNG, node 1:503).

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'Hair Care Blog', href: '#blog' },
  { label: 'Curly Girl Method', href: '#curly-girl-method' },
] as const

export const featureBadges = [
  { label: 'No SLS, Silicones, Parabens' },
  { label: '48-Hour Hydration' },
  { label: 'Hair Types 2, 3, 4' },
] as const

export const products = [
  {
    id: 'shampoo',
    name: 'Hydrating Shampoo',
    tint: '#eabafe',
    image: '/images/carousel-shampoo.webp',
    thumbnail: '/images/carousel-shampoo-thumb.webp',
  },
  {
    id: 'conditioner',
    name: 'Hydrating Conditioner',
    tint: '#aab9ff',
    image: '/images/carousel-conditioner.webp',
    thumbnail: '/images/carousel-conditioner-thumb.webp',
  },
  {
    id: 'cream',
    name: 'Defining Cream',
    tint: '#c6edff',
    image: '/images/carousel-cream.webp',
    thumbnail: '/images/carousel-cream-thumb.webp',
  },
  {
    id: 'gel',
    name: 'Defining Gel',
    tint: '#ffcfaf',
    image: '/images/carousel-gel.webp',
    thumbnail: '/images/carousel-gel-thumb.webp',
  },
  {
    id: 'mask',
    name: 'Hydrating Mask',
    tint: '#d9fda5',
    image: '/images/carousel-mask.webp',
    thumbnail: '/images/carousel-mask-thumb.webp',
  },
] as const

export const loremFeatures = [
  {
    id: 'lorem-1',
    title: 'Lorem Ipsum',
    body: 'Hyaluronic Acid acts like a magnet for moisture, drawing hydration into each strand. Hyaluronic Acid acts like a magnet for moisture, drawing hydration into each strand.Hyaluronic Acid acts like a magnet for moisture, drawing hydration into each strand.',
    imageAlt: '',
  },
  {
    id: 'lorem-2',
    title: 'Lorem Ipsum',
    body: 'Hyaluronic Acid acts like a magnet for moisture, drawing hydration into each strand. Hyaluronic Acid acts like a magnet for moisture, drawing hydration into each strand.Hyaluronic Acid acts like a magnet for moisture, drawing hydration into each strand.',
    imageAlt: 'Hydra Curls product range',
  },
] as const

export const promiseFeatures = [
  {
    title: 'Moisture Attraction',
    body: 'Hyaluronic Acid acts like a magnet for moisture, drawing hydration into each strand.',
  },
  {
    title: 'Strengthening Seal',
    body: 'Coconut & Avocado oils seal the hair cuticle, preventing moisture loss and adding strength.',
  },
] as const

export const ingredientCards = [
  {
    id: 'hyaluronic-acid',
    title: 'Hyaluronic Acid',
    description:
      'A proven moisture magnet that holds 1000x its weight in water for empowering, long-lasting hydration and bounce.',
    features: ['Deep Hydration', 'Moisture Lock', 'Plump Curls'],
    icon: '/icons/ingredient-hyaluronic-acid.gif',
    video: '/media/ingredients1.mp4',
  },
  {
    id: 'coconut-oil',
    title: 'Coconut Extract',
    description:
      'A trusted essential that penetrates deep into the shaft to provide nourishing repair and prevent protein loss.',
    features: ['Hair Strength', 'Natural Shine', 'Frizz Control'],
    icon: '/icons/ingredient-coconut-oil.gif',
    video: '/media/ingredients3.mp4',
  },
  {
    id: 'avocado-extract',
    title: 'Avocado Extract',
    description:
      'Rich in natural fats and biotin to provide a gentle shield against breakage while boosting authentic shine.',
    features: ['Curl Definition', 'Softness', 'Nutrient Rich'],
    icon: '/icons/ingredient-avocado-extract.gif',
    video: '/media/ingredients2.mp4',
  },
] as const

export const benefitBadges = [
  'No SLS',
  'No Silicones',
  'No Parabens',
  'Cruelty Free',
  'Natural Extracts',
] as const

export const testimonials = [
  {
    name: 'Aisha K',
    location: 'Dubai, UAE',
    quote:
      "I've struggled with frizz my whole life. Hydra Curls is the first range that actually tamed my hair for more than a day! The 48-hour claim is real.",
    avatar: '/images/testimonial-avatar-1.webp',
  },
  {
    name: 'Maya R',
    location: 'Abu Dhabi, UAE',
    quote:
      'Hydra Curls made my routine so much easier. My curls stay soft, defined, and hydrated all day long.',
    avatar: '/images/testimonial-avatar-2.webp',
  },
  {
    name: 'Sara M',
    location: 'Sharjah, UAE',
    quote:
      'My hair feels healthier, bouncier, and easier to manage. I finally found a range made for my curls.',
    avatar: '/images/testimonial-avatar-3.webp',
  },
] as const

export const influencerPosts = [
  { id: 1, caption: 'Pov: when you have a good hair day', image: '/images/influencer-1.webp' },
  { id: 2, caption: 'Get ready with me — curl edition', image: '/images/influencer-2.webp' },
  { id: 3, caption: 'My honest 48-hour hydration test', image: '/images/influencer-3.webp' },
  { id: 4, caption: 'Wash day routine for coily hair', image: '/images/influencer-4.webp' },
  { id: 5, caption: 'Pov: when you have a good hair day', image: '/images/influencer-5.webp' },
  { id: 6, caption: 'Girls trip hair prep', image: '/images/influencer-6.webp' },
  { id: 7, caption: 'Wash day routine for coily hair', image: '/images/influencer-7.webp' },
  { id: 8, caption: 'Curl definition in 3 steps', image: '/images/influencer-8.webp' },
] as const

export const hairTypes = [
  {
    id: 'wavy',
    label: 'Wavy',
    pattern: 'S-shaped pattern',
    description: 'Loose waves with slight bend, can be fine to coarse texture',
    characteristics: ['S-shaped pattern', 'Light waves', 'Can be frizz-prone'],
    image: '/images/hairtype-wavy.jpg',
  },
  {
    id: 'curly',
    label: 'Curly',
    pattern: 'Springy coils',
    description: 'Well-defined springy curls that range from loose to tight',
    characteristics: ['Springy coils', 'Natural volume', 'Needs deep moisture'],
    image: '/images/hairtype-curly.jpg',
  },
  {
    id: 'coily',
    label: 'Coily',
    pattern: 'Tight, dense coils',
    description: 'Tightly coiled pattern with maximum shrinkage and density',
    characteristics: ['Tight coil pattern', 'High density', 'Prone to dryness'],
    image: '/images/hairtype-coily.jpg',
  },
] as const

export const editorialCards = [
  {
    id: 'guide-1',
    eyebrow: 'Expert Guide',
    title: 'Curly Girl Method Guide',
    description:
      'Complete guide to the CGM with moodboards, tips, and step-by-step instructions designed specifically for Arab hair.',
    color: '#5365BB',
    image: '/images/editorial-split-1.png',
    photoSide: 'left',
    // Wavy panel background pulled directly from production (hydracurls.co/images/firstbackground.svg) —
    // a solid-filled rect with a wobbly edge on the side that meets the photo, replacing a
    // flat straight seam / CSS clip-path notch with the actual production art.
    waveBackground: '/images/editorial-wave-1.svg',
  },
  {
    id: 'guide-2',
    eyebrow: 'Expert Guide',
    title: 'Curly Girl Method Guide',
    description:
      'Complete guide to the CGM with moodboards, tips, and step-by-step instructions designed specifically for Arab hair.',
    color: '#76468A',
    image: '/images/editorial-split-2.png',
    photoSide: 'right',
    waveBackground: '/images/editorial-wave-2.svg',
  },
  {
    id: 'guide-3',
    eyebrow: 'Expert Guide',
    title: 'Curly Girl Method Guide',
    description:
      'Complete guide to the CGM with moodboards, tips, and step-by-step instructions designed specifically for Arab hair.',
    color: '#009ABA',
    image: '/images/editorial-split-3.png',
    photoSide: 'left',
    waveBackground: '/images/editorial-wave-3.svg',
  },
] as const

export const revolutionStats = [
  { value: '48h', label: 'Hydration' },
  { value: '05', label: 'Products' },
  { value: '3', label: 'Hair Types' },
  { value: '0', label: 'Sulfates' },
] as const

export const footerLinks = [
  'Curly Girl Method',
  'Hair Type Guide',
  'Styling Tips',
  'Ingredient Benefits',
] as const

export const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/hydra.curls/',
    icon: '/icons/footer-instagram.svg',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/',
    icon: '/icons/footer-facebook.svg',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/',
    icon: '/icons/footer-youtube.svg',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@hydra.curls',
    icon: '/icons/footer-tiktok.svg',
  },
] as const
