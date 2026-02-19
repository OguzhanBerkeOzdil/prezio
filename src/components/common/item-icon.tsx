import type { LucideProps } from 'lucide-react'
import { getIcon } from '@/lib/icon-map'

/**
 * Renders a Lucide icon by registry key.
 * Falls back to the Gift icon when a key is unrecognized.
 */
export function ItemIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = getIcon(name)
  return <Icon {...props} />
}
