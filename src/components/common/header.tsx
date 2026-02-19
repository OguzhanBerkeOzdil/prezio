import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Menu, X, Sun, Moon, Globe, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/app/theme-provider'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/constants'

const navLinks = [
  { key: 'home', path: ROUTES.HOME },
  { key: 'builder', path: ROUTES.BUILDER },
  { key: 'catalog', path: ROUTES.CATALOG },
  { key: 'pricing', path: ROUTES.PRICING },
  { key: 'about', path: ROUTES.ABOUT },
  { key: 'faq', path: ROUTES.FAQ },
  { key: 'contact', path: ROUTES.CONTACT },
]

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'tr', label: 'TR' },
  { code: 'pl', label: 'PL' },
] as const

function LanguageSwitcher({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) {
  const { i18n, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (variant === 'mobile') {
    return (
      <div className="flex items-center gap-1 px-4 py-2" role="radiogroup" aria-label={t('nav.language')}>
        <Globe className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
        {LANGUAGES.map(lang => (
          <button
            key={lang.code}
            role="radio"
            aria-checked={i18n.language === lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={cn(
              'px-3 py-1.5 text-xs font-semibold rounded-md transition-colors',
              i18n.language === lang.code
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            {lang.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(!open)}
        aria-label={t('nav.language')}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="gap-1 px-2"
      >
        <Globe className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase">{i18n.language}</span>
        <ChevronDown className={cn('h-3 w-3 transition-transform', open && 'rotate-180')} />
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1 z-50 rounded-lg border border-border bg-background shadow-lg p-1 min-w-25"
            role="listbox"
            aria-label={t('nav.language')}
          >
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                role="option"
                aria-selected={i18n.language === lang.code}
                onClick={() => { i18n.changeLanguage(lang.code); setOpen(false) }}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  i18n.language === lang.code
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Header() {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setMobileOpen(false)}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-110">
            <Gift className="h-5 w-5" />
          </div>
          <span className="font-serif text-xl font-bold tracking-tight">
            Prezio
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path ||
              (link.path !== '/' && location.pathname.startsWith(link.path))
            return (
              <Link
                key={link.key}
                to={link.path}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium transition-colors rounded-md',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t(`nav.${link.key}`)}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1 right-1 h-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Link to={ROUTES.PROFILE} className="hidden sm:block">
            <Button variant="ghost" size="sm">
              {t('nav.profile')}
            </Button>
          </Link>

          <div className="hidden sm:block">
            <LanguageSwitcher variant="desktop" />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? t('nav.darkMode') : t('nav.lightMode')}
          >
            <AnimatePresence mode="wait">
              {theme === 'light' ? (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Moon className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Sun className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          <Link to={ROUTES.BUILDER} className="hidden sm:block">
            <Button variant="shimmer" size="sm">
              {t('hero.cta')}
            </Button>
          </Link>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t('nav.menu', 'Menu')}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border/50 bg-background overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map(link => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.key}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                )
              })}
              <Link
                to={ROUTES.PROFILE}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {t('nav.profile')}
              </Link>

              {/* Mobile language switcher */}
              <div className="border-t border-border/50 mt-2 pt-3">
                <LanguageSwitcher variant="mobile" />
              </div>

              <div className="pt-2">
                <Link to={ROUTES.BUILDER} onClick={() => setMobileOpen(false)}>
                  <Button variant="shimmer" className="w-full">
                    {t('hero.cta')}
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
