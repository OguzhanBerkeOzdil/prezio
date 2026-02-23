import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useTransform, motion, animate } from 'framer-motion'

interface AnimatedCounterProps {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function AnimatedCounter({
  target,
  duration = 2,
  suffix = '',
  prefix = '',
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => {
    if (target >= 1000) return `${prefix}${Math.round(v).toLocaleString()}${suffix}`
    if (target % 1 !== 0) return `${prefix}${v.toFixed(1)}${suffix}`
    return `${prefix}${Math.round(v)}${suffix}`
  })

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration,
        ease: 'easeOut',
      })
      return controls.stop
    }
  }, [isInView, target, duration, count])

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  )
}
