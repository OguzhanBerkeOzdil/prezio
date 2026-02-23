import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import i18n from '@/i18n'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Map i18next language codes to locale + currency */
const CURRENCY_MAP: Record<string, { locale: string; currency: string; rate: number }> = {
  en: { locale: 'en-US', currency: 'USD', rate: 1 },
  tr: { locale: 'tr-TR', currency: 'TRY', rate: 38.5 },
  pl: { locale: 'pl-PL', currency: 'PLN', rate: 4.0 },
}

export function formatPrice(amount: number, lang?: string): string {
  const lng = lang ?? i18n.language ?? 'en'
  const cfg = CURRENCY_MAP[lng] ?? CURRENCY_MAP.en
  const converted = amount * cfg.rate
  return new Intl.NumberFormat(cfg.locale, {
    style: 'currency',
    currency: cfg.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: cfg.currency === 'USD' ? 2 : 0,
  }).format(converted)
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}
