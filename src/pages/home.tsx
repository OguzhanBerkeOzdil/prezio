import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Gift, Palette, Truck, Heart, Sparkles, DollarSign, Zap,
  Star, ChevronRight, ArrowRight, Package, Check, Target, Rocket,
  Ribbon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SEO } from '@/components/common/seo'
import { PageTransition } from '@/components/common/page-transition'
import { ROUTES } from '@/lib/constants'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

function HeroSection() {
  const { t } = useTranslation()
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary)_0%,transparent_50%)] opacity-[0.07]" />
      
      {/* Floating decorations */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
        className="absolute top-20 left-[10%] opacity-20 select-none text-primary/40"
      >
        <Gift className="h-10 w-10" aria-hidden="true" />
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' as const }}
        className="absolute top-40 right-[15%] opacity-20 select-none text-primary/40"
      >
        <Sparkles className="h-8 w-8" aria-hidden="true" />
      </motion.div>
      <motion.div
        animate={{ y: [-8, 12, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const }}
        className="absolute bottom-20 left-[20%] opacity-15 select-none text-primary/40"
      >
        <Ribbon className="h-8 w-8" aria-hidden="true" />
      </motion.div>
      <motion.div
        animate={{ y: [12, -8, 12] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' as const }}
        className="absolute bottom-32 right-[25%] opacity-15 select-none text-primary/40"
      >
        <Heart className="h-7 w-7" aria-hidden="true" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-40">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              {t('hero.badge')}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
          >
            <span className="bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              {t('hero.title')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to={ROUTES.BUILDER}>
              <Button variant="shimmer" size="xl" className="group">
                <Gift className="mr-2 h-5 w-5" />
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to={ROUTES.CATALOG}>
              <Button variant="outline" size="xl">
                {t('hero.secondaryCta')}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-sm text-muted-foreground flex items-center justify-center gap-2"
          >
            <span className="flex -space-x-2">
              {['A', 'M', 'J', 'K'].map((initial, i) => {
                const colors = ['bg-primary/20 text-primary', 'bg-secondary/20 text-secondary', 'bg-amber-100 text-amber-700', 'bg-emerald-100 text-emerald-700']
                return (
                  <span key={i} className={`flex h-7 w-7 items-center justify-center rounded-full ring-2 ring-background text-xs font-semibold ${colors[i]}`}>
                    {initial}
                  </span>
                )
              })}
            </span>
            {t('hero.trustedBy')}
          </motion.p>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const { t } = useTranslation()

  const features = [
    { icon: Package, key: 'curated', color: 'text-primary' },
    { icon: Palette, key: 'personalized', color: 'text-secondary' },
    { icon: Truck, key: 'delivery', color: 'text-accent' },
    { icon: Heart, key: 'occasions', color: 'text-pink-500' },
    { icon: DollarSign, key: 'budget', color: 'text-emerald-500' },
    { icon: Zap, key: 'fast', color: 'text-amber-500' },
  ]

  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">{t('features.sectionTitle')}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('features.sectionSubtitle')}</p>
        </motion.div>

        <motion.div {...staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, key, color }) => (
            <motion.div key={key} {...staggerItem}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 group border-transparent hover:border-primary/20">
                <CardContent className="p-6">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-background shadow-sm group-hover:scale-110 transition-transform ${color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{t(`features.${key}.title`)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`features.${key}.description`)}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const { t } = useTranslation()

  const steps = [
    { key: 'step1', icon: Heart, StepIcon: Target },
    { key: 'step2', icon: Package, StepIcon: Package },
    { key: 'step3', icon: Sparkles, StepIcon: Rocket },
  ]

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">{t('howItWorks.sectionTitle')}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('howItWorks.sectionSubtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, idx) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-linear-to-r from-primary/30 to-transparent" />
              )}
              
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-secondary/10">
                <step.StepIcon className="h-10 w-10 text-primary" />
              </div>
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold mb-4">
                {idx + 1}
              </div>
              <h3 className="text-xl font-semibold mb-3">{t(`howItWorks.${step.key}.title`)}</h3>
              <p className="text-muted-foreground leading-relaxed">{t(`howItWorks.${step.key}.description`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const { t } = useTranslation()
  const testimonials = t('testimonials.items', { returnObjects: true }) as Array<{
    name: string; role: string; text: string; rating: number
  }>

  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">{t('testimonials.sectionTitle')}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('testimonials.sectionSubtitle')}</p>
        </motion.div>

        <motion.div {...staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div key={idx} {...staggerItem}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90 mb-4">"{item.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function PricingPreviewSection() {
  const { t } = useTranslation()

  const tiers = [
    { key: 'starter', popular: false },
    { key: 'plus', popular: true },
    { key: 'deluxe', popular: false },
  ]

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">{t('pricingPreview.sectionTitle')}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('pricingPreview.sectionSubtitle')}</p>
        </motion.div>

        <motion.div {...staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map(({ key, popular }) => {
            const features = t(`pricingPreview.${key}.features`, { returnObjects: true }) as string[]
            return (
              <motion.div key={key} {...staggerItem}>
                <Card className={`h-full flex flex-col relative ${popular ? 'border-primary shadow-lg scale-[1.02]' : ''}`}>
                  {popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="px-3 py-1">{t(`pricingPreview.${key}.badge`)}</Badge>
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold">{t(`pricingPreview.${key}.name`)}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t(`pricingPreview.${key}.description`)}</p>
                    <div className="mt-4 mb-6">
                      <span className="text-4xl font-bold">{t(`pricingPreview.${key}.price`)}</span>
                      <span className="text-sm text-muted-foreground ml-1">/ {t(`pricingPreview.${key}.period`)}</span>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                      {features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to={ROUTES.BUILDER}>
                      <Button variant={popular ? 'default' : 'outline'} className="w-full">
                        {t('pricingPreview.cta')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div {...fadeInUp} className="text-center mt-8">
          <Link to={ROUTES.PRICING}>
            <Button variant="link" className="group">
              {t('pricingPreview.viewAll')}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function CTASection() {
  const { t } = useTranslation()

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-secondary/10 to-primary/10" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div {...fadeInUp}>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <Link to={ROUTES.BUILDER}>
            <Button variant="shimmer" size="xl" className="group">
              <Gift className="mr-2 h-5 w-5" />
              {t('cta.button')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            {t('cta.noCreditCard')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <PageTransition>
      <SEO
        title={t('nav.home')}
        description={t('site.description')}
        path="/"
      />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingPreviewSection />
      <CTASection />
    </PageTransition>
  )
}
