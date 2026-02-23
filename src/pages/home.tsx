import { useRef, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Gift, Palette, Truck, Heart, Sparkles, DollarSign, Zap,
  Star, ChevronRight, ArrowRight, Package, Check, Target, Rocket,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SEO } from '@/components/common/seo'
import { PageTransition } from '@/components/common/page-transition'
import { GradientOrb } from '@/components/common/gradient-orb'
import { SectionHeading } from '@/components/common/section-heading'
import { ROUTES } from '@/lib/constants'
import { staggerContainer, staggerItem } from '@/lib/animations'
import GradientText from '@/components/reactbits/gradient-text'
import ShinyText from '@/components/reactbits/shiny-text'
import Magnet from '@/components/reactbits/magnet'
import SpotlightCard from '@/components/reactbits/spotlight-card'
import BlurText from '@/components/reactbits/blur-text'
import heroGiftData from '@/assets/lottie/hero-gift.json'

const Lottie = lazy(() => import('lottie-react'))


function HeroSection() {
  const { t } = useTranslation()
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={heroRef} className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Multi-layer mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 noise-bg" />

      {/* Gradient orbs with parallax */}
      <motion.div style={{ y: orbY }} className="absolute -top-20 -left-20">
        <GradientOrb color="primary" size="xl" />
      </motion.div>
      <motion.div style={{ y: orbY }} className="absolute -bottom-32 -right-20">
        <GradientOrb color="secondary" size="lg" />
      </motion.div>
      <motion.div style={{ y: orbY }} className="absolute top-1/3 right-[10%]">
        <GradientOrb color="accent" size="md" />
      </motion.div>

      {/* Hero Lottie — decorative gift box animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        style={{ y: orbY }}
        className="absolute right-[5%] top-[15%] hidden lg:block w-85 h-85 pointer-events-none select-none"
      >
        <Suspense fallback={null}>
          <Lottie animationData={heroGiftData} loop autoplay className="w-full h-full" />
        </Suspense>
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32"
      >
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-6 px-5 py-2 text-sm font-medium glass border-white/20 text-foreground">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              <ShinyText text={t('hero.badge')} speed={4} className="text-inherit" />
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
          >
            <span className="bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              {t('hero.titleBase')}{' '}
            </span>
            <GradientText
              colors={['#f43f5e', '#ec4899', '#8b5cf6', '#f43f5e']}
              animationSpeed={6}
              className="font-serif"
            >
              {t('hero.titleHighlight')}
            </GradientText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Magnet padding={60} magnetStrength={3}>
              <Link to={ROUTES.BUILDER}>
                <Button variant="glow" size="xl" className="group text-base">
                  <Gift className="mr-2 h-5 w-5" />
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </Magnet>
            <Link to={ROUTES.CATALOG}>
              <Button variant="outline" size="xl" className="glass border-white/20 hover:border-white/40 hover:text-foreground">
                {t('hero.secondaryCta')}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex items-center justify-center gap-3"
          >
            <div className="flex -space-x-2">
              {['A', 'M', 'J', 'K'].map((initial, i) => {
                const colors = [
                  'bg-linear-to-br from-primary/30 to-primary/10 text-primary ring-2 ring-primary/20',
                  'bg-linear-to-br from-secondary/30 to-secondary/10 text-secondary ring-2 ring-secondary/20',
                  'bg-linear-to-br from-amber-300/30 to-amber-100/10 text-amber-700 ring-2 ring-amber-200/30',
                  'bg-linear-to-br from-emerald-300/30 to-emerald-100/10 text-emerald-700 ring-2 ring-emerald-200/30',
                ]
                return (
                  <span
                    key={i}
                    className={`flex h-8 w-8 items-center justify-center rounded-full ring-background text-xs font-bold ${colors[i]}`}
                  >
                    {initial}
                  </span>
                )
              })}
            </div>
            <span className="text-sm text-muted-foreground font-medium">
              {t('hero.trustedBy')}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

function FeaturesSection() {
  const { t } = useTranslation()

  const features = [
    { icon: Package, key: 'curated', color: 'from-primary/20 to-primary/5', text: 'text-primary' },
    { icon: Palette, key: 'personalized', color: 'from-secondary/20 to-secondary/5', text: 'text-secondary' },
    { icon: Truck, key: 'delivery', color: 'from-accent/20 to-accent/5', text: 'text-accent' },
    { icon: Heart, key: 'occasions', color: 'from-pink-500/20 to-pink-500/5', text: 'text-pink-500' },
    { icon: DollarSign, key: 'budget', color: 'from-emerald-500/20 to-emerald-500/5', text: 'text-emerald-500' },
    { icon: Zap, key: 'fast', color: 'from-amber-500/20 to-amber-500/5', text: 'text-amber-500' },
  ]

  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t('features.sectionTitle')}
          badgeIcon={Sparkles}
          title={t('features.sectionTitle')}
          subtitle={t('features.sectionSubtitle')}
        />

        {/* Bento grid */}
        <motion.div {...staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, key, color, text }, idx) => (
            <motion.div
              key={key}
              {...staggerItem}
              className={idx === 0 ? 'lg:col-span-2' : ''}
            >
              <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <Card variant="glass" className="h-full group hover:border-primary/20 relative overflow-hidden">
                  {idx === 0 && (
                    <div className="absolute -top-12 -right-12 opacity-30">
                      <GradientOrb color="primary" size="sm" animate={false} />
                    </div>
                  )}
                  <CardContent className={`relative z-10 ${idx === 0 ? 'p-8' : 'p-6'}`}>
                    <div className={`mb-4 flex ${idx === 0 ? 'h-14 w-14' : 'h-12 w-12'} items-center justify-center rounded-2xl bg-linear-to-br ${color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`${idx === 0 ? 'h-7 w-7' : 'h-6 w-6'} ${text}`} />
                    </div>
                    <h3 className={`${idx === 0 ? 'text-xl' : 'text-lg'} font-semibold mb-2 line-clamp-1`}>
                      {t(`features.${key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 min-h-15">
                      {t(`features.${key}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.5'],
  })
  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  const steps = [
    { key: 'step1', StepIcon: Target },
    { key: 'step2', StepIcon: Package },
    { key: 'step3', StepIcon: Rocket },
  ]

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t('howItWorks.sectionTitle')}
          subtitle={t('howItWorks.sectionSubtitle')}
        />

        <div className="relative">
          {/* Animated connecting line */}
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-0.5 bg-border/30">
            <motion.div
              style={{ scaleX: lineScaleX, transformOrigin: 'left' }}
              className="h-full bg-linear-to-r from-primary via-secondary to-accent rounded-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, idx) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="relative text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-3xl glass glow-primary"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-secondary/10">
                    <step.StepIcon className="h-10 w-10 text-primary" />
                  </div>
                </motion.div>
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-primary to-secondary text-primary-foreground text-sm font-bold mb-4 shadow-lg shadow-primary/20">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3">{t(`howItWorks.${step.key}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(`howItWorks.${step.key}.description`)}</p>
              </motion.div>
            ))}
          </div>
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
    <section className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t('testimonials.sectionTitle')}
          subtitle={t('testimonials.sectionSubtitle')}
        />

        <motion.div {...staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((item, idx) => (
            <motion.div key={idx} {...staggerItem}>
              <motion.div whileHover={{ y: -4, rotate: 0.5 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <Card variant="glass" className="h-full relative overflow-hidden">
                  {/* Decorative quote mark */}
                  <div className="absolute -top-2 right-4 font-serif text-8xl text-primary/8 select-none pointer-events-none leading-none">
                    &ldquo;
                  </div>
                  <CardContent className="relative z-10 p-6">
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400 drop-shadow-sm" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/90 mb-5 line-clamp-4 min-h-20">
                      &ldquo;{item.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-primary/20 to-secondary/10 ring-2 ring-primary/20 text-primary font-bold text-sm">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
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
    <section className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t('pricingPreview.sectionTitle')}
          subtitle={t('pricingPreview.sectionSubtitle')}
        />

        <motion.div {...staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map(({ key, popular }) => {
            const features = t(`pricingPreview.${key}.features`, { returnObjects: true }) as string[]
            return (
              <motion.div key={key} {...staggerItem}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <SpotlightCard
                    spotlightColor={popular ? 'rgba(244, 63, 94, 0.15)' : 'rgba(255, 255, 255, 0.08)'}
                    className={popular ? 'h-full' : 'h-full'}
                  >
                  <Card
                    variant={popular ? 'gradient-border' : 'glass'}
                    className={`h-full flex flex-col relative ${popular ? 'scale-[1.03] glow-primary' : ''}`}
                  >
                    {popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <Badge className="px-4 py-1 shadow-lg shadow-primary/20 animate-pulse-soft">
                          {t(`pricingPreview.${key}.badge`)}
                        </Badge>
                      </div>
                    )}
                    <CardContent className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-semibold">{t(`pricingPreview.${key}.name`)}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{t(`pricingPreview.${key}.description`)}</p>
                      <div className="mt-4 mb-6">
                        <span className={`text-4xl font-bold ${popular ? 'text-gradient' : ''}`}>
                          {t(`pricingPreview.${key}.price`)}
                        </span>
                        <span className="text-sm text-muted-foreground ml-1">
                          / {t(`pricingPreview.${key}.period`)}
                        </span>
                      </div>
                      <ul className="space-y-3 mb-8 flex-1">
                        {features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Check className={`h-4 w-4 mt-0.5 shrink-0 ${popular ? 'text-primary' : 'text-muted-foreground'}`} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to={ROUTES.BUILDER}>
                        <Button variant={popular ? 'glow' : 'outline'} className="w-full">
                          {t('pricingPreview.cta')}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  </SpotlightCard>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8"
        >
          <Link to={ROUTES.PRICING}>
            <Button variant="link" className="group text-base">
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
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-secondary/8 to-primary/10" />
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      {/* Decorative orbs */}
      <GradientOrb color="primary" size="lg" className="absolute -left-20 top-1/2 -translate-y-1/2 opacity-40" />
      <GradientOrb color="secondary" size="md" className="absolute -right-10 top-1/4 opacity-30" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center glass-strong rounded-3xl p-10 sm:p-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <BlurText text={t('cta.title')} delay={80} animateBy="words" className="justify-center" />
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <Link to={ROUTES.BUILDER}>
            <Button variant="glow" size="xl" className="group text-base">
              <Gift className="mr-2 h-5 w-5" />
              {t('cta.button')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <p className="mt-5 text-sm text-muted-foreground">
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
