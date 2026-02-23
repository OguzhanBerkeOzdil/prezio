import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Check, Star, Sparkles, Crown, Package, Gift, ArrowRight, Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { SEO } from '@/components/common/seo'
import { PageTransition } from '@/components/common/page-transition'
import { GradientOrb } from '@/components/common/gradient-orb'
import { SectionHeading } from '@/components/common/section-heading'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/constants'
import { fadeInUp } from '@/lib/animations'

const cardVariants = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

// ─── Tier config ─────────────────────────────────────────────────────────────

const TIERS = [
  {
    key: 'starter' as const,
    icon: Package,
    popular: false,
    variant: 'outline' as const,
  },
  {
    key: 'plus' as const,
    icon: Star,
    popular: true,
    variant: 'glow' as const,
  },
  {
    key: 'deluxe' as const,
    icon: Crown,
    popular: false,
    variant: 'default' as const,
  },
]

// ─── Components ──────────────────────────────────────────────────────────────

function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 noise-bg" />
      <GradientOrb color="primary" size="lg" className="absolute -top-20 -left-20 opacity-25" />
      <GradientOrb color="secondary" size="md" className="absolute -bottom-10 right-[10%] opacity-20" />

      <div className="container relative mx-auto max-w-3xl px-4 text-center">
        <motion.div {...fadeInUp}>
          <Badge variant="outline" className="mb-4 gap-1.5 px-3 py-1 glass text-foreground">
            <Sparkles className="size-3.5" />
            {t('pricing.subtitle')}
          </Badge>
        </motion.div>

        <motion.h1
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
        >
          <span className="text-gradient">{t('pricing.title')}</span>
        </motion.h1>

        <motion.p
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground"
        >
          {t('pricing.description')}
        </motion.p>
      </div>
    </section>
  )
}

function PricingCards() {
  const { t } = useTranslation()

  return (
    <section className="container mx-auto max-w-6xl px-4 pb-20">
      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        {TIERS.map((tier, i) => {
          const features = t(`pricing.tiers.${tier.key}.features`, { returnObjects: true }) as string[]
          const Icon = tier.icon

          return (
            <motion.div
              key={tier.key}
              variants={cardVariants}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={cn(tier.popular && 'md:-translate-y-4')}
              >
                <Card
                  variant={tier.popular ? 'gradient-border' : 'glass'}
                  className={cn(
                    'relative flex h-full flex-col overflow-hidden',
                    tier.popular && 'glow-primary scale-[1.02]',
                  )}
                >
                  {tier.popular && (
                    <div className="absolute right-4 top-4 z-10">
                      <Badge className="gap-1 shadow-lg shadow-primary/20 animate-pulse-soft">
                        <Zap className="size-3" />
                        {t('pricing.mostPopular')}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-4 pt-8">
                    <div
                      className={cn(
                        'mb-3 inline-flex size-11 items-center justify-center rounded-xl',
                        tier.popular
                          ? 'bg-linear-to-br from-primary/20 to-secondary/10 text-primary'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="text-xl">
                      {t(`pricing.tiers.${tier.key}.name`)}
                    </CardTitle>
                    <CardDescription>
                      {t(`pricing.tiers.${tier.key}.description`)}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-6">
                    <div>
                      <span className={cn('font-serif text-4xl font-bold tracking-tight', tier.popular && 'text-gradient')}>
                        {t(`pricing.tiers.${tier.key}.price`)}
                      </span>
                      <span className="ml-1.5 text-sm text-muted-foreground">
                        {t('pricing.perBox')}
                      </span>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {t('pricing.features')}
                      </p>
                      <ul className="space-y-2.5">
                        {features.map((feat, fi) => (
                          <li key={fi} className="flex items-start gap-2.5 text-sm">
                            <Check
                              className={cn(
                                'mt-0.5 size-4 shrink-0',
                                tier.popular ? 'text-primary' : 'text-muted-foreground',
                              )}
                            />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-4 pb-8">
                    <Button
                      asChild
                      variant={tier.popular ? 'glow' : tier.variant}
                      size="lg"
                      className="w-full gap-2"
                    >
                      <Link to={ROUTES.BUILDER}>
                        {t('pricing.getStarted')}
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

function CommonFeatures() {
  const { t } = useTranslation()
  const features = t('pricing.commonFeatures', { returnObjects: true }) as string[]

  return (
    <section className="border-t bg-muted/30 py-20 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      <div className="container mx-auto max-w-4xl px-4">
        <SectionHeading
          title={t('pricing.allPlansInclude')}
        />

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Card variant="glass" className="hover:border-primary/20">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary/20 to-secondary/10 text-primary">
                    <Gift className="size-4" />
                  </div>
                  <span className="text-sm font-medium">{feat}</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function BottomCTA() {
  const { t } = useTranslation()

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-40" />
      <GradientOrb color="primary" size="md" className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-25" />

      <motion.div
        {...fadeInUp}
        className="container relative mx-auto max-w-2xl px-4 text-center"
      >
        <div className="glass-strong rounded-3xl p-10 sm:p-14">
          <Sparkles className="mx-auto mb-4 size-8 text-primary" />
          <h2 className="font-serif text-2xl font-bold md:text-3xl">
            {t('pricing.title')}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            {t('pricing.description')}
          </p>
          <Button asChild variant="glow" size="lg" className="mt-8 gap-2">
            <Link to={ROUTES.BUILDER}>
              {t('pricing.getStarted')}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const { t } = useTranslation()

  return (
    <PageTransition>
      <SEO title={t('pricing.title')} description={t('pricing.description')} />
      <HeroSection />
      <PricingCards />
      <CommonFeatures />
      <BottomCTA />
    </PageTransition>
  )
}
