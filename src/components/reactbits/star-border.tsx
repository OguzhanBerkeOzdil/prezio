import { type ElementType, type ReactNode, type ComponentPropsWithoutRef } from 'react'

interface StarBorderOwnProps {
  as?: ElementType
  color?: string
  speed?: string
  children: ReactNode
  className?: string
}

type StarBorderProps<T extends ElementType = 'button'> = StarBorderOwnProps &
  Omit<ComponentPropsWithoutRef<T>, keyof StarBorderOwnProps>

export default function StarBorder<T extends ElementType = 'button'>({
  as,
  className = '',
  color = 'white',
  speed = '6s',
  children,
  ...rest
}: StarBorderProps<T>) {
  const Component = as || 'button'

  return (
    <>
      <style>{`
        @keyframes star-movement-bottom {
          0% { transform: translate(0%, 0%); opacity: 1; }
          100% { transform: translate(-100%, 0%); opacity: 0; }
        }
        @keyframes star-movement-top {
          0% { transform: translate(0%, 0%); opacity: 1; }
          100% { transform: translate(100%, 0%); opacity: 0; }
        }
      `}</style>
      <Component
        className={`relative inline-block overflow-hidden rounded-xl border border-white/10 px-6 py-3 ${className}`}
        {...rest}
      >
        <span
          className="pointer-events-none absolute -top-px left-0 h-px w-25 opacity-0"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            animation: `star-movement-top ${speed} infinite alternate`,
            animationDelay: '0s',
            opacity: 1,
          }}
        />
        <span
          className="pointer-events-none absolute -bottom-px right-0 h-px w-25 opacity-0"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            animation: `star-movement-bottom ${speed} infinite alternate`,
            animationDelay: '1s',
            opacity: 1,
          }}
        />
        <span className="relative z-10">{children}</span>
      </Component>
    </>
  )
}
