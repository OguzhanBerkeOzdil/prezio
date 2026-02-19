import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SEO } from '@/components/common/seo'
import { PageTransition } from '@/components/common/page-transition'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'
import { Home, Gift, PackageX, Sparkles, Ribbon, Heart } from 'lucide-react'

// ─── Page ────────────────────────────────────────────────────────────────────

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <PageTransition>
      <SEO title={t('notFound.title')} />

      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden py-20">
        {/* Floating icon decorations */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
          className="absolute top-16 left-[12%] opacity-20 select-none text-primary/40"
        >
          <Gift className="h-10 w-10" />
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' as const }}
          className="absolute top-32 right-[14%] opacity-20 select-none text-primary/40"
        >
          <Sparkles className="h-8 w-8" />
        </motion.div>
        <motion.div
          animate={{ y: [-8, 12, -8] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const }}
          className="absolute bottom-24 left-[18%] opacity-15 select-none text-primary/40"
        >
          <Ribbon className="h-8 w-8" />
        </motion.div>
        <motion.div
          animate={{ y: [12, -8, 12] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' as const }}
          className="absolute bottom-36 right-[22%] opacity-15 select-none text-primary/40"
        >
          <Heart className="h-7 w-7" />
        </motion.div>

        <div className="relative text-center px-4 sm:px-6">
          {/* Animated icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
            className="mx-auto mb-6"
          >
            <PackageX className="mx-auto h-20 w-20 text-muted-foreground/40" strokeWidth={1.2} />
          </motion.div>

          {/* 404 gradient text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tighter"
          >
            <span className="bg-linear-to-r from-primary via-primary/70 to-primary/40 bg-clip-text text-transparent">
              404
            </span>
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

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button asChild size="lg">
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
      </section>
    </PageTransition>
  )
}
