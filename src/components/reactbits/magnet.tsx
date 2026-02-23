import { useRef, useState, type ReactNode, type MouseEvent } from 'react'

interface MagnetProps {
  children: ReactNode
  padding?: number
  magnetStrength?: number
  disabled?: boolean
  className?: string
}

export default function Magnet({
  children,
  padding = 80,
  magnetStrength = 2,
  disabled = false,
  className = '',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('translate3d(0, 0, 0)')

  const handleMouseMove = (e: MouseEvent) => {
    if (disabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setTransform(`translate3d(${x / magnetStrength}px, ${y / magnetStrength}px, 0)`)
  }

  const handleMouseLeave = () => {
    setTransform('translate3d(0, 0, 0)')
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-block',
        padding,
        margin: -padding,
      }}
    >
      <div
        style={{
          transform,
          transition: 'transform 0.2s ease-out',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  )
}
