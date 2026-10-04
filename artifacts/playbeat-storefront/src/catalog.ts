export type ProductCategory =
  | 'AI & Productivity'
  | 'Streaming'
  | 'Gift Cards'
  | 'Gaming'
  | 'Software'
  | 'VPN & Security'
  | 'IPTV'
  | 'Smart Projectors'
  | 'Business Web Services'
  | 'Services';
export type ProductType = 'digital' | 'physical' | 'service';
export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  type: ProductType;
  pricePKR: number;
  originalPricePKR?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  artwork: string;
  shortDescription: string;
  deliveryEstimate: string;
  region?: string;
  features: string[];
};

type Seed = [name: string, category: ProductCategory, type: ProductType, list: number, price: number, art: string, brand?: string, note?: string, region?: string];
const seeds: Seed[] = [
  ['Xbox Game Pass Ultimate 1 Month', 'Gaming', 'digital', 2926, 1810, 'X', 'Xbox', 'A one-month Xbox Game Pass Ultimate subscription.'],
  ['HCS350PRO Smart Projector', 'Smart Projectors', 'physical', 47000, 40710, 'HCS', 'HCS', 'HCS350PRO smart projector.', undefined],
  ['HY320 NTV (Netflix Licensed)', 'Smart Projectors', 'physical', 47000, 40710, 'HY', 'Magcubic', 'HY320 NTV smart projector.'],
  ['HY300 Plus Smart Projector', 'Smart Projectors', 'physical', 30500, 26550, 'HY', 'Magcubic', 'HY300 Plus smart projector.'],
  ['Magcubic HY300 PRO', 'Smart Projectors', 'physical', 24500, 21122, 'HY', 'Magcubic', 'HY300 PRO smart projector.'],
  ['Netflix 1 Month', 'Streaming', 'digital', 750, 600, 'N', 'Netflix', 'A one-month Netflix subscription option.'],
  ['Spotify Individual Plan 1 Month', 'Streaming', 'digital', 400, 299, 'S', 'Spotify', 'A one-month Spotify Individual plan.', 'Local Pakistan region noted in supplied listing'],
  ['PlayStation Network Gift Card', 'Gift Cards', 'digital', 3000, 2820, 'PS', 'PlayStation', 'A PlayStation Network gift card.', 'Denomination: 10 USD; confirm region compatibility'],
  ['CapCut Pro', 'AI & Productivity', 'digital', 2000, 1499, 'C', 'CapCut', 'CapCut Pro subscription option.', 'Plan: 1 month; listed account details should be confirmed'],
  ['Xbox Live Gift Card', 'Gift Cards', 'digital', 550, 440, 'X', 'Xbox', 'An Xbox Live gift card.', 'Denomination: 1 USD; confirm region compatibility'],
  ['Surfshark VPN', 'VPN & Security', 'digital', 600, 499, 'S', 'Surfshark', 'Surfshark VPN subscription option.', 'Plan: 1 month'],
  ['ElevenLabs 1 Month', 'AI & Productivity', 'digital', 7000, 1800, '11', 'ElevenLabs', 'A one-month ElevenLabs subscription option.'],
  ['Grammarly Premium 1 Month', 'AI & Productivity', 'digital', 600, 499, 'G', 'Grammarly', 'A one-month Grammarly Premium subscription option.'],
  ['YouTube Premium', 'Streaming', 'digital', 500, 400, 'Y', 'YouTube', 'YouTube Premium subscription option.'],
  ['Hongtop P10', 'Smart Projectors', 'physical', 48000, 41890, 'P10', 'Hongtop', 'Hongtop P10 smart projector.'],
  ['HY7 Built-in Battery Projector', 'Smart Projectors', 'physical', 60500, 52510, 'HY7', 'Magcubic', 'HY7 projector with built-in battery.'],
  ['Magcubic HY300Pro Plus', 'Smart Projectors', 'physical', 26000, 22538, 'HY', 'Magcubic', 'HY300Pro Plus smart projector.'],
  ['Magcubic HY310', 'Smart Projectors', 'physical', 39500, 34220, 'HY', 'Magcubic', 'HY310 smart projector.'],
  ['Magcubic HY320PRO', 'Smart Projectors', 'physical', 41500, 35990, 'HY', 'Magcubic', 'HY320PRO smart projector.'],
  ['Magcubic HY350 Upgraded+', 'Smart Projectors', 'physical', 49000, 42480, 'HY', 'Magcubic', 'HY350 Upgraded+ smart projector.'],
  ['Magcubic HY320MINI', 'Smart Projectors', 'physical', 29000, 25370, 'HY', 'Magcubic', 'HY320MINI smart projector.'],
  ['Magcubic HY300X', 'Smart Projectors', 'physical', 26500, 23010, 'HY', 'Magcubic', 'HY300X smart projector.'],
  ['HCS350MAX', 'Smart Projectors', 'physical', 49500, 43070, 'HCS', 'HCS', 'HCS350MAX smart projector.'],
  ['Bitdefender Internet Security', 'Software', 'digital', 750, 604, 'B', 'Bitdefender', 'Bitdefender Internet Security subscription.', 'Plan: 1 device, 1 year'],
  ['A10', 'Smart Projectors', 'physical', 36000, 31270, 'A10', 'A10', 'A10 smart projector.'],
  ['Bitdefender Antivirus Plus', 'Software', 'digital', 3000, 2523, 'B', 'Bitdefender', 'Bitdefender Antivirus Plus subscription.', 'Plan: 1 device, 2 years'],
  ['McAfee Total Protection', 'Software', 'digital', 1500, 1313, 'M', 'McAfee', 'McAfee Total Protection subscription.', 'Plan: 5 devices, 2 years'],
  ['CyberGhost VPN', 'VPN & Security', 'digital', 12000, 10592, 'CG', 'CyberGhost', 'CyberGhost VPN subscription.'],
  ['F18', 'Smart Projectors', 'physical', 102000, 88500, 'F18', 'F18', 'F18 smart projector.'],
  ['Kaspersky Antivirus', 'Software', 'digital', 8000, 6925, 'K', 'Kaspersky', 'Kaspersky Antivirus subscription.', 'Option: Standard 5 devices'],
  ['Bitdefender Total Security', 'Software', 'digital', 2000, 1753, 'B', 'Bitdefender', 'Bitdefender Total Security subscription.', 'Plan: 3 months, global'],
  ['Perplexity Pro', 'AI & Productivity', 'digital', 4500, 3834, 'P', 'Perplexity', 'Perplexity Pro subscription.', 'Plan: 1 month, global'],
  ['190cm Stand for Projector', 'Smart Projectors', 'physical', 1500, 1121, '190', 'PlayBeat', '190cm projector stand.'],
  ['Microsoft Office Suite – All Versions & Variants', 'Software', 'digital', 3500, 2945, 'O', 'Microsoft', 'Microsoft Office suite listing.', 'Edition: Professional'],
  ['Steam Gift Card', 'Gift Cards', 'digital', 1500, 1255, 'S', 'Steam', 'A Steam gift card.', 'Denomination: 4 USD; confirm region compatibility'],
  ['Hailio AI 1 Month', 'AI & Productivity', 'digital', 5500, 4999, 'H', 'Hailio', 'A one-month Hailio AI subscription.'],
  ['Disney+ with VPN 1 Month', 'Streaming', 'digital', 2000, 1850, 'D+', 'Disney+', 'A one-month Disney+ listing with VPN noted in title.'],
  ['Perplexity AI Private Yearly Plan', 'AI & Productivity', 'digital', 11000, 9500, 'P', 'Perplexity', 'Perplexity AI Private yearly plan.'],
  ['Adobe Creative Cloud', 'Software', 'digital', 2000, 1498, 'A', 'Adobe', 'Adobe Creative Cloud plan.', 'Plan: Photography plan listed'],
  ['ExpressVPN 1 Month Single Device', 'VPN & Security', 'digital', 2000, 1600, 'E', 'ExpressVPN', 'ExpressVPN single-device subscription.', 'Plan: 1 month'],
  ['ChatGPT 5', 'AI & Productivity', 'digital', 3000, 2499, 'AI', 'ChatGPT', 'ChatGPT 5 subscription option.'],
  ['Google Veo 3 1 Month Normal', 'AI & Productivity', 'digital', 2500, 2000, 'V3', 'Google', 'A one-month Google Veo 3 plan.'],
  ['Xbox Game Pass Ultimate', 'Gaming', 'digital', 3500, 2999, 'X', 'Xbox', 'Xbox Game Pass Ultimate subscription.', 'Plan: 1 device share'],
  ['Microsoft Windows 11', 'Software', 'digital', 6000, 5429, 'W11', 'Microsoft', 'Microsoft Windows 11 license listing.', 'Edition: Home PC global'],
  ['Crunchyroll Single Screen 1 Month', 'Streaming', 'digital', 600, 499, 'C', 'Crunchyroll', 'A one-month Crunchyroll single-screen plan.'],
  ['Apple TV+', 'Streaming', 'digital', 600, 499, 'TV+', 'Apple', 'Apple TV+ subscription option.'],
  ['Sony Liv 1 Month', 'Streaming', 'digital', 950, 800, 'S', 'Sony', 'A one-month Sony Liv subscription.'],
  ['Chaupal Single Screen 1 Month', 'Streaming', 'digital', 750, 600, 'C', 'Chaupal', 'A one-month Chaupal single-screen plan.'],
  ['HBO Max with VPN 1 Month', 'Streaming', 'digital', 800, 650, 'HBO', 'HBO', 'A one-month HBO Max listing with VPN noted in title.'],
  ['Zee5 with VPN 1 Month', 'Streaming', 'digital', 1500, 1250, 'Z5', 'Zee5', 'A one-month Zee5 listing with VPN noted in title.'],
  ['Helium 10 Platinum Plan 1 Month', 'Services', 'digital', 1500, 1200, 'H10', 'Helium 10', 'A one-month Helium 10 Platinum plan.'],
  ['Zoom Pro', 'Services', 'digital', 2500, 2000, 'Z', 'Zoom', 'Zoom Pro subscription.', 'Plan: 100 participants'],
  ['ExpressVPN For PC', 'VPN & Security', 'digital', 1100, 900, 'E', 'ExpressVPN', 'ExpressVPN for PC subscription.'],
  ['IPVanish VPN 1 Month', 'VPN & Security', 'digital', 800, 650, 'IP', 'IPVanish', 'A one-month IPVanish VPN subscription.'],
  ['Razer Gold Gift Card', 'Gift Cards', 'digital', 1500, 1471, 'R', 'Razer Gold', 'A Razer Gold gift card.', 'Denomination: 5 USD; confirm region compatibility'],
  ['Apple Gift Card', 'Gift Cards', 'digital', 1500, 1471, 'A', 'Apple', 'An Apple gift card.', 'Denomination: 5 USD; confirm region compatibility'],
  ['Prime Video', 'Streaming', 'digital', 250, 199, 'P', 'Prime Video', 'Prime Video subscription option.', 'Plan: 1 month shared'],
  ['Ullu 1 Month', 'Streaming', 'digital', 600, 499, 'U', 'Ullu', 'A one-month Ullu subscription.'],
  ['ChatGPT Go Plan 1 Year', 'AI & Productivity', 'digital', 8500, 7599, 'AI', 'ChatGPT', 'A one-year ChatGPT Go plan.'],
  ['Jio Hotstar with VPN 1 Month', 'Streaming', 'digital', 1500, 1250, 'JH', 'Jio Hotstar', 'A one-month Jio Hotstar listing with VPN noted in title.'],
  ['Freepik Premium 1 Month', 'AI & Productivity', 'digital', 2000, 1599, 'F', 'Freepik', 'A one-month Freepik Premium plan.'],
  ['QuillBot Premium 1 Month', 'AI & Productivity', 'digital', 600, 499, 'Q', 'QuillBot', 'A one-month QuillBot Premium plan.'],
  ['NordVPN', 'VPN & Security', 'digital', 600, 499, 'N', 'NordVPN', 'NordVPN subscription.', 'Plan: 1 month shared'],
  ['Proton VPN 1 Month', 'VPN & Security', 'digital', 800, 650, 'P', 'Proton VPN', 'A one-month Proton VPN subscription.'],
  ['Leonardo AI Unlimited Plan Official 1 Month', 'AI & Productivity', 'digital', 3000, 2499, 'L', 'Leonardo AI', 'A one-month Leonardo AI Unlimited plan.'],
  ['Turnitin Instructor Account 1 Month', 'Services', 'digital', 19500, 16999, 'T', 'Turnitin', 'A one-month Turnitin Instructor account listing.'],
  ['Netflix + Prime Video Combo', 'Streaming', 'digital', 850, 699, 'N+', 'Netflix', 'A Netflix and Prime Video combo listing.'],
  ['Hulu with VPN 1 Month', 'Streaming', 'digital', 800, 650, 'H', 'Hulu', 'A one-month Hulu listing with VPN noted in title.'],
  ['Hotspot Shield VPN 1 Month', 'VPN & Security', 'digital', 600, 499, 'HS', 'Hotspot Shield', 'A one-month Hotspot Shield VPN subscription.'],
];

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const initials = (value: string) => value.split(/\s+/).map((word) => word[0]).join('').slice(0, 2).toUpperCase();
export const catalog: Product[] = seeds.map(([name, category, type, originalPricePKR, pricePKR, artwork, brand, note, region], index) => {
  const slug = slugify(name);
  const physical = type === 'physical';
  const features = [physical ? 'Physical product listing' : 'Digital product listing', ...(note ? [note] : [])];
  if (category === 'Gift Cards') features.push('Check region and denomination details before purchase');
  return {
    id: `${index + 1}-${slug}`, slug, name, brand: brand ?? name.split(' ')[0], category, type,
    pricePKR, originalPricePKR, rating: 0, reviewCount: 0,
    badge: index === 0 || index === 1 || index === 5 ? 'Featured' : undefined,
    artwork: artwork || initials(brand ?? name),
    shortDescription: note?.split(';')[0] ?? `${name} listing from the supplied PlayBeat Digital catalog.`,
    deliveryEstimate: physical ? 'Delivery timing to be confirmed before purchase' : 'Digital delivery details to be confirmed before purchase',
    region, features,
  };
});

export const categories: { name: ProductCategory; title: string; note: string; glyph: string }[] = [
  { name: 'AI & Productivity', title: 'AI & Productivity', note: 'Tools for making', glyph: 'AI' },
  { name: 'Streaming', title: 'Streaming', note: 'Watch & listen', glyph: 'S' },
  { name: 'Gift Cards', title: 'Gift Cards', note: 'A better kind of gift', glyph: 'G' },
  { name: 'Gaming', title: 'Gaming', note: 'Play your way', glyph: 'X' },
  { name: 'Software', title: 'Software', note: 'Digital essentials', glyph: 'SW' },
  { name: 'VPN & Security', title: 'VPN & Security', note: 'Privacy tools', glyph: 'VPN' },
  { name: 'IPTV', title: 'IPTV', note: 'Digital entertainment', glyph: 'TV' },
  { name: 'Smart Projectors', title: 'Smart Projectors', note: 'Big-screen thinking', glyph: 'HCS' },
  { name: 'Business Web Services', title: 'Business Web Services', note: 'Built for business', glyph: 'WEB' },
  { name: 'Services', title: 'Services', note: 'Plans & platforms', glyph: 'SVC' },
];

export const formatPKR = (amount: number) =>
  `Rs ${new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(amount)}`;