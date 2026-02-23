import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SEO } from '@/components/common/seo'
import { PageTransition } from '@/components/common/page-transition'
import { Separator } from '@/components/ui/separator'
import { FileText } from 'lucide-react'
import { fadeInUp } from '@/lib/animations'
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


// ─── Page ────────────────────────────────────────────────────────────────────

export default function TermsPage() {
  const { t } = useTranslation()

  return (
    <PageTransition>
      <SEO title={t('legal.terms.title')} path="/terms" />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 noise-bg" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-secondary/10 glass">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {t('legal.terms.title')}
            </h1>
            <p className="text-sm text-muted-foreground">{t('legal.terms.lastUpdated')}</p>
          </motion.div>
        </div>
      </section>

      <Separator />

      {/* Content */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="glass rounded-2xl p-6 sm:p-10">
          <motion.div {...fadeInUp} className="space-y-6">
            {renderFormattedContent(t('legal.terms.content'))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
