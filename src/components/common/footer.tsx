import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Gift, Heart, Github, Twitter, Instagram } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { ROUTES } from '@/lib/constants'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="relative border-t border-border">
      {/* Gradient accent bar */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-primary via-secondary to-accent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-secondary text-primary-foreground shadow-sm shadow-primary/20">
                <Gift className="h-4 w-4" />
              </div>
              <span className="font-serif text-lg font-bold">
                Prezio
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.description')}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {[Github, Twitter, Instagram].map((Icon, i) => (
                <div
                  key={i}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer"
                >
                  <Icon className="h-4 w-4" />
                </div>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{t('footer.product')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to={ROUTES.BUILDER} className="text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all duration-200 inline-block py-1">{t('nav.builder')}</Link></li>
              <li><Link to={ROUTES.CATALOG} className="text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all duration-200 inline-block py-1">{t('nav.catalog')}</Link></li>
              <li><Link to={ROUTES.PRICING} className="text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all duration-200 inline-block py-1">{t('nav.pricing')}</Link></li>
              <li><Link to={ROUTES.PROFILE} className="text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all duration-200 inline-block py-1">{t('nav.profile')}</Link></li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to={ROUTES.ABOUT} className="text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all duration-200 inline-block py-1">{t('nav.about')}</Link></li>
              <li><Link to={ROUTES.FAQ} className="text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all duration-200 inline-block py-1">{t('nav.faq')}</Link></li>
              <li><Link to={ROUTES.CONTACT} className="text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all duration-200 inline-block py-1">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to={ROUTES.PRIVACY} className="text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all duration-200 inline-block py-1">{t('nav.privacy')}</Link></li>
              <li><Link to={ROUTES.TERMS} className="text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all duration-200 inline-block py-1">{t('nav.terms')}</Link></li>
            </ul>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row glass-subtle rounded-lg my-4 px-4">
          <p className="text-xs text-muted-foreground">
            {t('footer.copyright')}
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            {t('footer.madeWith').replace('❤️', '')}
            <Heart className="h-3 w-3 fill-primary text-primary animate-pulse-soft" />
          </p>
        </div>
      </div>
    </footer>
  )
}
