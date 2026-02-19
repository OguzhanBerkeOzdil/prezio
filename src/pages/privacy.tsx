import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SEO } from '@/components/common/seo'
import { PageTransition } from '@/components/common/page-transition'
import { Separator } from '@/components/ui/separator'
import { Shield } from 'lucide-react'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderFormattedContent(content: string) {
  return content.split('\n\n').map((paragraph, i) => {
    const parts = paragraph.split(/\*\*(.*?)\*\*/g)
    return (
      <p key={i} className="text-muted-foreground leading-relaxed">
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j} className="text-foreground font-semibold">{part}</strong> : part,
        )}
      </p>
    )
  })
}

// ─── Animation variants ──────────────────────────────────────────────────────

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PrivacyPage() {
  const { t } = useTranslation()

  return (
    <PageTransition>
      <SEO title={t('legal.privacy.title')} path="/privacy" />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary)_0%,transparent_50%)] opacity-[0.07]" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {t('legal.privacy.title')}
            </h1>
            <p className="text-sm text-muted-foreground">{t('legal.privacy.lastUpdated')}</p>
          </motion.div>
        </div>
      </section>

      <Separator />

      {/* Content */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div {...fadeInUp} className="space-y-6">
          {renderFormattedContent(t('legal.privacy.content'))}
        </motion.div>
      </section>
    </PageTransition>
  )
}
