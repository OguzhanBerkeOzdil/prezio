export const SITE_NAME = 'Prezio'
export const SITE_URL = 'https://oguzhanberkeozdil.github.io/prezio'

export const STORAGE_KEYS = {
  THEME: 'prezio-theme',
  LANGUAGE: 'prezio-lang',
  SAVED_DESIGNS: 'prezio-saved-designs',
  BUILDER_DRAFT: 'prezio-builder-draft',
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
