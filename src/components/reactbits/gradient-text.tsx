import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react'

interface GradientTextProps {
  children: ReactNode
  className?: string
  colors?: string[]
  animationSpeed?: number
  showBorder?: boolean
}

export default function GradientText({
  children,
  className = '',
  colors = ['#ffaa40', '#9c40ff', '#ffaa40'],
  animationSpeed = 8,
  showBorder = false,
}: GradientTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.style.setProperty('--bg-size', '300%')
    el.style.setProperty(
      '--gradient',
      `linear-gradient(90deg, ${colors.join(', ')})`
    )
    el.style.setProperty('--speed', `${animationSpeed}s`)
  }, [colors, animationSpeed])

  const baseStyle: CSSProperties = {
    backgroundImage: 'var(--gradient)',
    backgroundSize: 'var(--bg-size) 100%',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'gradient-text-move var(--speed) infinite linear',
  }

  return (
    <>
      <style>{`
        @keyframes gradient-text-move {
          0% { background-position: 0% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
      <span
        ref={containerRef}
        className={`inline-flex ${showBorder ? 'rounded-3xl border border-white/10 px-2 py-1' : ''} ${className}`}
        style={baseStyle}
      >
        {children}
      </span>
    </>
  )
}
