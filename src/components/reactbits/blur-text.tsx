import { useRef, useEffect, useState, useMemo } from 'react'

interface BlurTextProps {
  text: string
  delay?: number
  className?: string
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  threshold?: number
  onAnimationComplete?: () => void
}

export default function BlurText({
  text,
  delay = 100,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  onAnimationComplete,
}: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)
  const [completed, setCompleted] = useState(false)

  const parts = useMemo(
    () => (animateBy === 'words' ? text.split(/(\s+)/) : text.split('')),
    [text, animateBy]
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  useEffect(() => {
    if (inView && !completed) {
      const totalDuration = parts.length * delay + 600 // 600ms = transition time
      const timer = setTimeout(() => {
        setCompleted(true)
        onAnimationComplete?.()
      }, totalDuration)
      return () => clearTimeout(timer)
    }
  }, [inView, completed, parts.length, delay, onAnimationComplete])

  const yOffset = direction === 'top' ? -10 : 10

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {parts.map((part, i) => {
        const isSpace = /^\s+$/.test(part)
        if (isSpace) return <span key={i}>&nbsp;</span>
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              transition: `filter 0.6s ease, opacity 0.6s ease, transform 0.6s ease`,
              transitionDelay: `${i * delay}ms`,
              filter: inView ? 'blur(0)' : 'blur(8px)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : `translateY(${yOffset}px)`,
            }}
          >
            {part}
          </span>
        )
      })}
    </span>
  )
}
