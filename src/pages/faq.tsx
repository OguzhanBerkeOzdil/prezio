import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { HelpCircle, MessageCircle, Search, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
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

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function FAQPage() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')

  const items = t('faq.items', { returnObjects: true }) as { question: string; answer: string }[]

  const filtered = useMemo(
    () =>
      items.filter(
        (item) =>
          item.question.toLowerCase().includes(query.toLowerCase()) ||
          item.answer.toLowerCase().includes(query.toLowerCase()),
      ),
    [items, query],
  )

  return (
    <PageTransition>
      <SEO title={t('faq.title')} path={ROUTES.FAQ} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-primary)_0%,transparent_50%)] opacity-[0.06]" />

        <div className="container relative mx-auto max-w-3xl px-4 text-center">
          <motion.div {...fadeInUp} className="mb-4 flex items-center justify-center gap-2 text-primary">
            <HelpCircle className="size-6" />
          </motion.div>

          <motion.h1
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            {t('faq.title')}
          </motion.h1>

          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground"
          >
            {t('faq.subtitle')}
          </motion.p>

          {/* Search */}
          <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.3 }} className="mx-auto mt-8 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('common.search')}
                className={cn(
                  'w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm',
                  'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30',
                  'transition-shadow duration-200',
                )}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ Items ─────────────────────────────────────────────────────── */}
      <section className="container mx-auto max-w-3xl px-4 pb-16">
        <Accordion type="single" collapsible className="w-full">
          {filtered.map((item, i) => (
            <motion.div
              key={i}
              {...staggerItem}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <AccordionItem value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">{t('common.search')} — 0 results</p>
        )}
      </section>

      <Separator />

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="container mx-auto max-w-3xl px-4 py-20 text-center">
        <motion.div {...fadeInUp} className="space-y-4">
          <MessageCircle className="mx-auto size-10 text-primary" />
          <h2 className="font-serif text-2xl font-bold md:text-3xl">{t('faq.stillHaveQuestions')}</h2>
          <p className="mx-auto max-w-md text-muted-foreground">{t('faq.contactUs')}</p>
          <div className="pt-2">
            <Button variant="shimmer" asChild>
              <Link to={ROUTES.CONTACT}>
                <Mail className="mr-2 size-4" />
                {t('faq.contactUs')}
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  )
}
