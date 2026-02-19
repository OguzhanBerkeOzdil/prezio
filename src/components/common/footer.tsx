import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Gift, Heart } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { ROUTES } from '@/lib/constants'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Gift className="h-4 w-4" />
              </div>
              <span className="font-serif text-lg font-bold">
                Prezio
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{t('footer.product')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to={ROUTES.BUILDER} className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.builder')}</Link></li>
              <li><Link to={ROUTES.CATALOG} className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.catalog')}</Link></li>
              <li><Link to={ROUTES.PRICING} className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.pricing')}</Link></li>
              <li><Link to={ROUTES.PROFILE} className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.profile')}</Link></li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to={ROUTES.ABOUT} className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.about')}</Link></li>
              <li><Link to={ROUTES.FAQ} className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.faq')}</Link></li>
              <li><Link to={ROUTES.CONTACT} className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to={ROUTES.PRIVACY} className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.privacy')}</Link></li>
              <li><Link to={ROUTES.TERMS} className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.terms')}</Link></li>
            </ul>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            {t('footer.copyright')}
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            {t('footer.madeWith').replace('❤️', '')}
            <Heart className="h-3 w-3 fill-primary text-primary" />
          </p>
        </div>
      </div>
    </footer>
  )
}
