import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GradientOrbProps {
  color?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  animate?: boolean
}

const colorMap = {
  primary: 'bg-primary/30 dark:bg-primary/20',
  secondary: 'bg-secondary/25 dark:bg-secondary/15',
  accent: 'bg-accent/20 dark:bg-accent/10',
}

const sizeMap = {
  sm: 'w-32 h-32',
  md: 'w-48 h-48',
  lg: 'w-72 h-72',
  xl: 'w-96 h-96',
}

export function GradientOrb({
  color = 'primary',
  size = 'md',
  className,
  animate: shouldAnimate = true,
}: GradientOrbProps) {
  return (
    <motion.div
      animate={
        shouldAnimate
          ? {
              y: [-10, 10, -10],
              x: [-5, 5, -5],
              scale: [1, 1.05, 1],
            }
          : undefined
      }
      transition={
        shouldAnimate
          ? {
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : undefined
      }
      className={cn(
        'rounded-full blur-3xl pointer-events-none select-none',
        colorMap[color],
        sizeMap[size],
        className
      )}
      aria-hidden="true"
    />
  )
}
