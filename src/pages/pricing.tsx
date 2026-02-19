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
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/constants'

// ─── Animation variants ──────────────────────────────────────────────────────

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

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
    variant: 'shimmer' as const,
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
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-primary)_0%,transparent_50%)] opacity-[0.06]" />

      <div className="container relative mx-auto max-w-3xl px-4 text-center">
        <motion.div {...fadeInUp}>
          <Badge variant="outline" className="mb-4 gap-1.5 px-3 py-1">
            <Sparkles className="size-3.5" />
            {t('pricing.subtitle')}
          </Badge>
        </motion.div>

        <motion.h1
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
        >
          {t('pricing.title')}
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
      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:items-center">
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
              whileHover={{ y: -6 }}
              className={cn(tier.popular && 'md:-mt-4 md:mb-4')}
            >
              <Card
                className={cn(
                  'relative flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl',
                  tier.popular &&
                    'border-primary/50 bg-linear-to-b from-primary/4 to-transparent shadow-lg ring-1 ring-primary/20',
                )}
              >
                {tier.popular && (
                  <div className="absolute right-4 top-4">
                    <Badge className="gap-1">
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
                        ? 'bg-primary/15 text-primary'
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
                    <span className="font-serif text-4xl font-bold tracking-tight">
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
                    variant={tier.variant}
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
    <section className="border-t bg-muted/30 py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div {...fadeInUp} className="mb-10 text-center">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">
            {t('pricing.allPlansInclude')}
          </h2>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Gift className="size-4" />
              </div>
              <span className="text-sm font-medium">{feat}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function BottomCTA() {
  const { t } = useTranslation()

  return (
    <section className="py-20">
      <motion.div
        {...fadeInUp}
        className="container mx-auto max-w-2xl px-4 text-center"
      >
        <Sparkles className="mx-auto mb-4 size-8 text-primary" />
        <h2 className="font-serif text-2xl font-bold md:text-3xl">
          {t('pricing.title')}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          {t('pricing.description')}
        </p>
        <Button asChild variant="shimmer" size="lg" className="mt-8 gap-2">
          <Link to={ROUTES.BUILDER}>
            {t('pricing.getStarted')}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
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
