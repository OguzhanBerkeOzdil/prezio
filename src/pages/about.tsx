import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Heart, Award, Leaf, Sparkles, Users, Globe,
  Gift, ArrowRight, Target, Smile,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { SEO } from '@/components/common/seo'
import { PageTransition } from '@/components/common/page-transition'
import { GradientOrb } from '@/components/common/gradient-orb'
import { AnimatedCounter } from '@/components/common/animated-counter'
import { SectionHeading } from '@/components/common/section-heading'
import { ROUTES } from '@/lib/constants'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } },
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
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 noise-bg" />
      <GradientOrb color="primary" size="lg" className="absolute -top-10 -right-20 opacity-30" />
      <GradientOrb color="secondary" size="md" className="absolute -bottom-10 -left-10 opacity-20" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-secondary/10 glass glow-primary">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-gradient">{t('about.title')}</span>
          </h1>
          <p className="mt-2 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {t('about.subtitle')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function StorySection() {
  const { t } = useTranslation()
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          {...fadeInUp}
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          {t('about.story.title')}
        </motion.h2>
        <div className="relative space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
          {/* Decorative gradient line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary/30 via-secondary/20 to-transparent rounded-full hidden sm:block" />

          {(['about.story.p1', 'about.story.p2', 'about.story.p3'] as const).map((key, i) => (
            <motion.p
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="sm:pl-6"
            >
              {t(key)}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}

function MissionSection() {
  const { t } = useTranslation()
  return (
    <section className="py-20 sm:py-24 bg-muted/30 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp}>
          <Card variant="glass" className="relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-secondary to-accent animate-gradient-x bg-size-[300%_100%]" />
            <CardHeader className="items-center text-center pt-10 pb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-primary/20 to-secondary/10 mb-4">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl">{t('about.mission.title')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center pb-10 px-4 sm:px-8 lg:px-16">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t('about.mission.text')}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

const values = [
  { key: 'quality', icon: Award, color: 'text-amber-500', bg: 'bg-linear-to-br from-amber-500/20 to-amber-500/5' },
  { key: 'sustainability', icon: Leaf, color: 'text-green-500', bg: 'bg-linear-to-br from-green-500/20 to-green-500/5' },
  { key: 'personalization', icon: Sparkles, color: 'text-violet-500', bg: 'bg-linear-to-br from-violet-500/20 to-violet-500/5' },
  { key: 'joy', icon: Smile, color: 'text-rose-500', bg: 'bg-linear-to-br from-rose-500/20 to-rose-500/5' },
] as const

function ValuesSection() {
  const { t } = useTranslation()
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t('about.values.title')}
        />
        <motion.div {...staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map(({ key, icon: Icon, color, bg }) => (
            <motion.div key={key} {...staggerItem}>
              <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <Card variant="glass" className="h-full hover:border-primary/20">
                  <CardHeader className="flex-row items-start gap-4 space-y-0">
                    <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl', bg)}>
                      <Icon className={cn('h-6 w-6', color)} />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{t(`about.values.${key}.title`)}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {t(`about.values.${key}.description`)}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const stats = [
  { key: 'boxesCreated', label: 'boxesLabel', icon: Gift, target: 500 },
  { key: 'happyRecipients', label: 'recipientsLabel', icon: Users, target: 1200 },
  { key: 'countries', label: 'countriesLabel', icon: Globe, target: 28 },
  { key: 'satisfaction', label: 'satisfactionLabel', icon: Heart, target: 98 },
] as const

function StatsSection() {
  const { t } = useTranslation()
  return (
    <section className="py-20 sm:py-24 bg-muted/30 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {stats.map(({ key, label, icon: Icon, target }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card variant="glass" className="text-center p-6">
                <CardContent className="p-0">
                  <div className="flex justify-center mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-secondary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold tracking-tight text-gradient">
                    <AnimatedCounter
                      target={target}
                      suffix={key === 'satisfaction' ? '%' : key === 'boxesCreated' ? '+' : ''}
                    />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(`about.stats.${label}`)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function CTASection() {
  const { t } = useTranslation()
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      <GradientOrb color="primary" size="md" className="absolute -left-10 top-1/3 opacity-30" />
      <GradientOrb color="secondary" size="sm" className="absolute -right-10 bottom-1/3 opacity-20" />

      <motion.div
        {...fadeInUp}
        className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="glass-strong rounded-3xl p-10 sm:p-16">
          <Separator className="mb-8 mx-auto max-w-xs" />
          <Gift className="mx-auto h-10 w-10 text-primary mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t('about.mission.title')}
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            {t('about.subtitle')}
          </p>
          <Button asChild variant="glow" size="lg" className="gap-2">
            <Link to={ROUTES.BUILDER}>
              {t('hero.cta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

export default function AboutPage() {
  const { t } = useTranslation()
  return (
    <PageTransition>
      <SEO title={t('about.title')} description={t('about.subtitle')} path={ROUTES.ABOUT} />
      <HeroSection />
      <StorySection />
      <MissionSection />
      <ValuesSection />
      <StatsSection />
      <CTASection />
    </PageTransition>
  )
}
