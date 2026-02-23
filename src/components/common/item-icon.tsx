import type { LucideProps } from 'lucide-react'
import { getIcon } from '@/lib/icon-map'
import { get3DIcon } from '@/lib/icon-3d-map'

interface ItemIconProps extends LucideProps {
  name: string
  /** Catalog item ID — when provided, attempts to show a 3D PNG icon */
  itemId?: string
  /** Size of the 3D image in px (default 40) */
  imgSize?: number
}

/**
 * Renders a 3D PNG icon when a matching `itemId` exists,
 * otherwise falls back to a Lucide SVG icon by registry key.
 */
export function ItemIcon({ name, itemId, imgSize = 40, ...props }: ItemIconProps) {
  const img = itemId ? get3DIcon(itemId) : undefined

  if (img) {
    return (
      <img
        src={img}
        alt=""
        width={imgSize}
        height={imgSize}
        className="object-contain drop-shadow-sm"
        loading="lazy"
      />
    )
  }

  const Icon = getIcon(name)
  return <Icon {...props} />
}
