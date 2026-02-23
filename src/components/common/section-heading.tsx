import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { type LucideIcon } from 'lucide-react'

interface SectionHeadingProps {
  badge?: string
  badgeIcon?: LucideIcon
  title: string
  subtitle?: string
  gradient?: boolean
  className?: string
}

export function SectionHeading({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  gradient = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn('text-center mb-16', className)}
    >
      {badge && (
        <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-medium glass text-foreground">
          {BadgeIcon && <BadgeIcon className="mr-1.5 h-3.5 w-3.5" />}
          {badge}
        </Badge>
      )}
      <h2
        className={cn(
          'font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight',
          gradient && 'text-gradient'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
