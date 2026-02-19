import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Menu, X, Sun, Moon, Globe } from 'lucide-react'
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

export function Header() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'tr' : 'en'
    i18n.changeLanguage(newLang)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setMobileOpen(false)}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-110">
            <Gift className="h-5 w-5" />
          </div>
          <span className="font-serif text-xl font-bold tracking-tight">
            GiftBox <span className="text-primary">Studio</span>
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
        <div className="flex items-center gap-2">
          <Link to={ROUTES.PROFILE} className="hidden sm:block">
            <Button variant="ghost" size="sm">
              {t('nav.profile')}
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            aria-label={t('nav.language')}
            className="relative"
          >
            <Globe className="h-4 w-4" />
            <span className="absolute -bottom-0.5 -right-0.5 text-[9px] font-bold uppercase text-primary">
              {i18n.language === 'en' ? 'TR' : 'EN'}
            </span>
          </Button>

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
            aria-label="Menu"
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
