import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle, Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { SEO } from '@/components/common/seo'
import { PageTransition } from '@/components/common/page-transition'

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

type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

const infoCards = [
  { icon: Mail, key: 'email' },
  { icon: Phone, key: 'phone' },
  { icon: MapPin, key: 'address' },
  { icon: Clock, key: 'hours' },
] as const

function HeroSection() {
  const { t } = useTranslation()
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
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
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            {t('contact.title')}
          </h1>
          <p className="mt-2 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function ContactForm() {
  const { t } = useTranslation()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, t('contact.validation.nameRequired')),
        email: z
          .string()
          .min(1, t('contact.validation.emailRequired'))
          .email(t('contact.validation.emailInvalid')),
        subject: z.string().min(1, t('contact.validation.subjectRequired')),
        message: z
          .string()
          .min(1, t('contact.validation.messageRequired'))
          .min(10, t('contact.validation.messageTooShort')),
      }),
    [t],
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async () => {
    setSubmitError(false)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
      reset()
    } catch {
      setSubmitError(true)
    }
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-4 py-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <CheckCircle className="h-16 w-16 text-green-500" />
          </motion.div>
          <p className="text-xl font-semibold text-center">{t('contact.form.success')}</p>
          <Button variant="default" className="mt-2" onClick={() => setIsSubmitted(false)}>
            {t('contact.form.send')}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div {...fadeInUp}>
      <Card>
        <CardHeader>
          <CardTitle>{t('contact.title')}</CardTitle>
          <CardDescription>{t('contact.subtitle')}</CardDescription>
        </CardHeader>
        <Separator className="mb-6" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">{t('contact.form.name')}</Label>
              <Input
                id="name"
                placeholder={t('contact.form.namePlaceholder')}
                className={cn(errors.name && 'border-destructive focus-visible:ring-destructive')}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                {...register('name')}
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-destructive" role="alert">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t('contact.form.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('contact.form.emailPlaceholder')}
                className={cn(errors.email && 'border-destructive focus-visible:ring-destructive')}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                {...register('email')}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-destructive" role="alert">{errors.email.message}</p>
              )}
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">{t('contact.form.subject')}</Label>
              <Input
                id="subject"
                placeholder={t('contact.form.subjectPlaceholder')}
                className={cn(errors.subject && 'border-destructive focus-visible:ring-destructive')}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                {...register('subject')}
              />
              {errors.subject && (
                <p id="subject-error" className="text-sm text-destructive" role="alert">{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">{t('contact.form.message')}</Label>
              <Textarea
                id="message"
                rows={5}
                placeholder={t('contact.form.messagePlaceholder')}
                className={cn(errors.message && 'border-destructive focus-visible:ring-destructive')}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                {...register('message')}
              />
              {errors.message && (
                <p id="message-error" className="text-sm text-destructive" role="alert">{errors.message.message}</p>
              )}
            </div>

            {submitError && (
              <p className="text-sm text-destructive">{t('contact.form.error')}</p>
            )}

            <Button
              type="submit"
              variant="shimmer"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t('contact.form.sending')}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {t('contact.form.send')}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ContactInfo() {
  const { t } = useTranslation()

  return (
    <motion.div {...staggerContainer} className="space-y-4">
      {infoCards.map(({ icon: Icon, key }) => (
        <motion.div key={key} {...staggerItem}>
          <Card className="transition-shadow hover:shadow-lg">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium leading-none mb-1">
                  {t(`contact.info.${key}`)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(`contact.info.${key}Value` as string)}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function ContactPage() {
  const { t } = useTranslation()

  return (
    <PageTransition>
      <SEO title={t('contact.title')} description={t('contact.subtitle')} path="/contact" />

      <HeroSection />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <ContactForm />
          <ContactInfo />
        </div>
      </section>
    </PageTransition>
  )
}
