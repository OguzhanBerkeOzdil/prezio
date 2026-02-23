import { useEffect, useRef, type CSSProperties } from 'react'

interface ShinyTextProps {
  text: string
  disabled?: boolean
  speed?: number
  className?: string
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 3,
  className = '',
}: ShinyTextProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    ref.current?.style.setProperty('--shine-speed', `${speed}s`)
  }, [speed])

  const style: CSSProperties = disabled
    ? {}
    : {
        backgroundImage:
          'linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'inherit',
        animation: `shiny-text-slide var(--shine-speed, ${speed}s) infinite linear`,
      }

  return (
    <>
      <style>{`
        @keyframes shiny-text-slide {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
      <span ref={ref} className={className} style={style}>
        {text}
      </span>
    </>
  )
}
