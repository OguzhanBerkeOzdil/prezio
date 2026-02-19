import type { LucideIcon } from 'lucide-react'
import {
  Gift, Package, Sparkles, Heart, Star, Flame, Droplet, Droplets,
  Flower2, Leaf, Coffee, BookOpen, PenTool, Bookmark, Smartphone,
  Speaker, Sprout, Home, Image, Gem, KeyRound, Cake, CakeSlice,
  PartyPopper, TreePine, Moon, GraduationCap, Baby, HeartHandshake,
  Stethoscope, Target, Rocket, CircleDot, AlignJustify, Hexagon,
  ShoppingBag, Laptop, Candy, Cookie, Ribbon, Ghost, Bath, Sofa,
  Search, Square, Wine,
} from 'lucide-react'

/**
 * Master icon registry — every emoji in the app replaced with a Lucide SVG icon.
 * Keys are short, readable identifiers used in data files and component props.
 */
export const ICON_MAP: Record<string, LucideIcon> = {
  // ── Catalog item icons ────────────────────────────
  candy: Candy,
  'cake-slice': CakeSlice,
  droplets: Droplets,
  cookie: Cookie,
  flame: Flame,
  flower: Flower2,
  droplet: Droplet,
  ribbon: Ribbon,
  'key-round': KeyRound,
  gem: Gem,
  bath: Bath,
  sparkles: Sparkles,
  leaf: Leaf,
  coffee: Coffee,
  wine: Wine,
  'book-open': BookOpen,
  'pen-tool': PenTool,
  bookmark: Bookmark,
  smartphone: Smartphone,
  speaker: Speaker,
  sprout: Sprout,
  home: Home,
  image: Image,
  sofa: Sofa,
  laptop: Laptop,

  // ── General purpose ───────────────────────────────
  gift: Gift,
  package: Package,
  heart: Heart,
  star: Star,
  'shopping-bag': ShoppingBag,

  // ── Occasion icons ────────────────────────────────
  cake: Cake,
  'party-popper': PartyPopper,
  'tree-pine': TreePine,
  moon: Moon,
  ghost: Ghost,
  'graduation-cap': GraduationCap,
  baby: Baby,
  'heart-handshake': HeartHandshake,
  stethoscope: Stethoscope,
  target: Target,
  rocket: Rocket,

  // ── Pattern icons ─────────────────────────────────
  square: Square,
  'circle-dot': CircleDot,
  'align-justify': AlignJustify,
  hexagon: Hexagon,
  search: Search,
}

/** Resolve icon by key; falls back to `Gift`. */
export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Gift
}
