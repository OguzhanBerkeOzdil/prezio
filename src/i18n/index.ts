import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import tr from './locales/tr.json'
import pl from './locales/pl.json'
import { geoLanguageDetector, detectLanguageByGeo } from './geo-lang-detector'

const STORAGE_KEY = 'prezio-lang'

const detector = new LanguageDetector()
detector.addDetector(geoLanguageDetector)

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      tr: { translation: tr },
      pl: { translation: pl },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'tr', 'pl'],
    detection: {
      order: ['querystring', 'localStorage', 'geoLanguage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: STORAGE_KEY,
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

// After init, async-detect language by IP (only if no saved preference)
detectLanguageByGeo(i18n.changeLanguage.bind(i18n), STORAGE_KEY)

export default i18n
