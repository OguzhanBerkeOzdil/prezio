export const SITE_NAME = 'GiftBox Studio'
export const SITE_DESCRIPTION = 'Craft the perfect gift box for every occasion'
export const SITE_URL = 'https://yourusername.github.io/giftbox-studio'

export const STORAGE_KEYS = {
  THEME: 'giftbox-theme',
  LANGUAGE: 'giftbox-lang',
  SAVED_DESIGNS: 'giftbox-saved-designs',
  BUILDER_DRAFT: 'giftbox-builder-draft',
} as const

export const ROUTES = {
  HOME: '/',
  BUILDER: '/builder',
  CATALOG: '/catalog',
  PRICING: '/pricing',
  ABOUT: '/about',
  FAQ: '/faq',
  CONTACT: '/contact',
  PROFILE: '/profile',
  PRIVACY: '/privacy',
  TERMS: '/terms',
} as const

export const PRICE_CONFIG = {
  BOX_SIZES: {
    S: { label: 'Small', basePrice: 15, maxItems: 3 },
    M: { label: 'Medium', basePrice: 25, maxItems: 6 },
    L: { label: 'Large', basePrice: 40, maxItems: 10 },
  },
  PACKAGING: {
    classic: { label: 'Classic', multiplier: 1 },
    luxury: { label: 'Luxury', multiplier: 1.5 },
    eco: { label: 'Eco-Friendly', multiplier: 1.2 },
  },
  CARD_PRICE: 3,
  GIFT_WRAP_PRICE: 5,
} as const
