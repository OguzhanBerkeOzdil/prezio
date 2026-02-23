import { useRef, useCallback, type ReactNode, type MouseEvent } from 'react'

interface ClickSparkProps {
  children: ReactNode
  sparkColor?: string
  sparkSize?: number
  sparkRadius?: number
  sparkCount?: number
  duration?: number
}

export default function ClickSpark({
  children,
  sparkColor = '#f43f5e',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      canvas.width = rect.width
      canvas.height = rect.height

      const sparks = Array.from({ length: sparkCount }, (_, i) => {
        const angle = (i / sparkCount) * Math.PI * 2
        return { angle, x, y }
      })

      const startTime = performance.now()

      const animate = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (progress >= 1) return

        sparks.forEach(({ angle, x: sx, y: sy }) => {
          const dist = sparkRadius * progress * 3
          const px = sx + Math.cos(angle) * dist
          const py = sy + Math.sin(angle) * dist
          const alpha = 1 - progress
          const size = sparkSize * (1 - progress * 0.5)

          ctx.beginPath()
          ctx.arc(px, py, size / 2, 0, Math.PI * 2)
          ctx.fillStyle = sparkColor
            .replace(')', `)`)
            .replace('rgb', 'rgba')
            .replace(')', `, ${alpha})`)
          // If not rgba, just set global alpha
          ctx.globalAlpha = alpha
          ctx.fillStyle = sparkColor
          ctx.fill()
          ctx.globalAlpha = 1
        })

        requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)
    },
    [sparkColor, sparkSize, sparkRadius, sparkCount, duration]
  )

  return (
    <div className="relative" onClick={handleClick}>
      {children}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-50"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
