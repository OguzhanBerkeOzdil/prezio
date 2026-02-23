import { useRef, useState, useEffect } from 'react'

interface CountUpProps {
  to: number
  from?: number
  duration?: number
  delay?: number
  separator?: string
  className?: string
  decimals?: number
  prefix?: string
  suffix?: string
}

export default function CountUp({
  to,
  from = 0,
  duration = 2,
  delay = 0,
  separator = '',
  className = '',
  decimals = 0,
  prefix = '',
  suffix = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(from)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const timeout = setTimeout(() => {
      const start = performance.now()
      const totalDuration = duration * 1000

      const animate = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / totalDuration, 1)
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = from + (to - from) * eased
        setValue(current)
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }, delay * 1000)
    return () => clearTimeout(timeout)
  }, [started, from, to, duration, delay])

  const formatted = (() => {
    const fixed = value.toFixed(decimals)
    if (!separator) return `${prefix}${fixed}${suffix}`
    const [int, dec] = fixed.split('.')
    const withSep = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    return `${prefix}${dec ? `${withSep}.${dec}` : withSep}${suffix}`
  })()

  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  )
}
