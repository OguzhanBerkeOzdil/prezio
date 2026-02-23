import { useRef, type ReactNode, type MouseEvent } from 'react'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.15)',
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = divRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    divRef.current?.style.setProperty('--x', `${x}px`)
    divRef.current?.style.setProperty('--y', `${y}px`)
    divRef.current?.style.setProperty('--spotlight-color', spotlightColor)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{
        background: `radial-gradient(350px circle at var(--x, 50%) var(--y, 50%), var(--spotlight-color, transparent), transparent 80%)`,
      }}
    >
      {children}
    </div>
  )
}
