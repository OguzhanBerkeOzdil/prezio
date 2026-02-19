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
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary)_0%,transparent_50%)] opacity-[0.07]" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            {t('about.title')}
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
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          {(['about.story.p1', 'about.story.p2', 'about.story.p3'] as const).map((key, i) => (
            <motion.p
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
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
    <section className="py-20 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp}>
          <Card className="relative overflow-hidden border-0 shadow-lg">
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-primary/60 to-primary" />
            <CardHeader className="items-center text-center pt-10 pb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl">{t('about.mission.title')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center pb-10 px-8 sm:px-16">
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
  { key: 'quality', icon: Award, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { key: 'sustainability', icon: Leaf, color: 'text-green-500', bg: 'bg-green-500/10' },
  { key: 'personalization', icon: Sparkles, color: 'text-violet-500', bg: 'bg-violet-500/10' },
  { key: 'joy', icon: Smile, color: 'text-rose-500', bg: 'bg-rose-500/10' },
] as const

function ValuesSection() {
  const { t } = useTranslation()
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          {...fadeInUp}
          className="text-3xl sm:text-4xl font-bold text-center mb-14"
        >
          {t('about.values.title')}
        </motion.h2>
        <motion.div {...staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map(({ key, icon: Icon, color, bg }) => (
            <motion.div key={key} {...staggerItem}>
              <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-0.5">
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
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const stats = [
  { key: 'boxesCreated', label: 'boxesLabel', icon: Gift },
  { key: 'happyRecipients', label: 'recipientsLabel', icon: Users },
  { key: 'countries', label: 'countriesLabel', icon: Globe },
  { key: 'satisfaction', label: 'satisfactionLabel', icon: Heart },
] as const

function StatsSection() {
  const { t } = useTranslation()
  return (
    <section className="py-20 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map(({ key, label, icon: Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-3">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
                {t(`about.stats.${key}`)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t(`about.stats.${label}`)}
              </p>
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
    <section className="py-24 sm:py-32">
      <motion.div
        {...fadeInUp}
        className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center"
      >
        <Separator className="mb-16 mx-auto max-w-xs" />
        <Gift className="mx-auto h-10 w-10 text-primary mb-6" />
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          {t('about.mission.title')}
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          {t('about.subtitle')}
        </p>
        <Button asChild variant="shimmer" size="lg" className="gap-2">
          <Link to={ROUTES.BUILDER}>
            {t('home.hero.cta')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
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
