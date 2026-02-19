import type { CustomDetector } from 'i18next-browser-languagedetector'

const COUNTRY_LANG_MAP: Record<string, string> = {
  PL: 'pl',
  TR: 'tr',
}

const GEO_CACHE_KEY = 'prezio-geo-lang'

/**
 * Custom i18next detector that maps user's country (via IP) to a language.
 * Uses the free ipapi.co JSON endpoint — no API key needed.
 * Result is cached in sessionStorage so the fetch runs only once per tab.
 */
export const geoLanguageDetector: CustomDetector = {
  name: 'geoLanguage',

  lookup(): string | undefined {
    try {
      const cached = sessionStorage.getItem(GEO_CACHE_KEY)
      if (cached) return cached === 'none' ? undefined : cached
    } catch {
      // sessionStorage unavailable
    }
    return undefined
  },

  cacheUserLanguage() {
    // No-op — we don't persist geo detection to localStorage
  },
}

/**
 * Async fetch that runs after i18n init.
 * If no language was already chosen by the user (localStorage),
 * detects country from IP and switches the language.
 */
export async function detectLanguageByGeo(
  changeLanguage: (lng: string) => Promise<unknown>,
  storageKey: string,
): Promise<void> {
  try {
    // If the user already has a stored preference, skip geo detection
    const stored = localStorage.getItem(storageKey)
    if (stored) return

    // Check session cache first
    const cached = sessionStorage.getItem(GEO_CACHE_KEY)
    if (cached) {
      if (cached !== 'none') await changeLanguage(cached)
      return
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)

    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal })
    clearTimeout(timeout)

    if (!res.ok) {
      sessionStorage.setItem(GEO_CACHE_KEY, 'none')
      return
    }

    const data = await res.json()
    const countryCode: string = data?.country_code ?? ''
    const lang = COUNTRY_LANG_MAP[countryCode.toUpperCase()]

    if (lang) {
      sessionStorage.setItem(GEO_CACHE_KEY, lang)
      await changeLanguage(lang)
    } else {
      sessionStorage.setItem(GEO_CACHE_KEY, 'none')
    }
  } catch {
    // Network error or timeout — silently fall back to default
    try {
      sessionStorage.setItem(GEO_CACHE_KEY, 'none')
    } catch {
      // ignore
    }
  }
}
