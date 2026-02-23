import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SEO } from '@/components/common/seo'
import { PageTransition } from '@/components/common/page-transition'
import { GradientOrb } from '@/components/common/gradient-orb'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'
import { Home, Gift } from 'lucide-react'
import notFoundImg from '@/assets/illustrations/birthday.png'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <PageTransition>
      <SEO title={t('notFound.title')} />

      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 noise-bg" />

        {/* Gradient orbs */}
        <GradientOrb color="primary" size="xl" className="absolute -top-20 -left-20 opacity-30" />
        <GradientOrb color="secondary" size="lg" className="absolute -bottom-20 -right-10 opacity-25" />
        <GradientOrb color="accent" size="md" className="absolute top-1/4 right-[15%] opacity-20" />

        <div className="relative z-10 text-center px-4 sm:px-6">
          <div className="glass-strong rounded-3xl p-10 sm:p-16 max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
              className="mx-auto mb-6"
            >
              <img
                src={notFoundImg}
                alt=""
                className="mx-auto w-40 h-40 object-contain drop-shadow-lg"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tighter text-gradient"
            >
              404
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-xl sm:text-2xl font-semibold tracking-tight"
            >
              {t('notFound.subtitle')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-3 max-w-md mx-auto text-muted-foreground"
            >
              {t('notFound.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Button asChild variant="glow" size="lg">
                <Link to={ROUTES.HOME}>
                  <Home className="mr-2 h-4 w-4" />
                  {t('notFound.backHome')}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to={ROUTES.CATALOG}>
                  <Gift className="mr-2 h-4 w-4" />
                  {t('notFound.browseGifts')}
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
