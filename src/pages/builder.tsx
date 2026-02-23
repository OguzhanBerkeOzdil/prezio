import { useState, useMemo, useCallback, lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart, DollarSign, Package, Palette, ShoppingBag, MessageSquare,
  Eye, CreditCard, ChevronLeft, ChevronRight, Search, Plus, Minus,
  Check, X, Pencil, PartyPopper, RotateCcw, Save, Sparkles, User,
  Home, Cake, TreePine, Moon, GraduationCap, Baby, HeartHandshake,
  Stethoscope, Gift, Flower2, CircleDot, AlignJustify, Hexagon,
  Star, Square, Leaf, Ribbon, type LucideIcon,
} from 'lucide-react'
import { ItemIcon } from '@/components/common/item-icon'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'

import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SEO } from '@/components/common/seo'
import { PageTransition } from '@/components/common/page-transition'
import { useBuilderStore, TOTAL_STEPS } from '@/features/builder/builder-store'
import { catalogItems } from '@/data/catalog-items'
import { PRICE_CONFIG, ROUTES } from '@/lib/constants'
import { cn, formatPrice } from '@/lib/utils'
import ClickSpark from '@/components/reactbits/click-spark'
import confettiData from '@/assets/lottie/confetti.json'

const Lottie = lazy(() => import('lottie-react'))

// ─── Occasion Illustrations ─────────────────────────────────────────────────
import anniversaryIll from '@/assets/illustrations/anniversary.png'
import babyShotIll from '@/assets/illustrations/baby-shower.png'
import birthdayIll from '@/assets/illustrations/birthday.png'
import christmasIll from '@/assets/illustrations/christmas.png'
import getWellIll from '@/assets/illustrations/get-well.png'
import graduationIll from '@/assets/illustrations/graduation.png'
import valentineIll from '@/assets/illustrations/valentine.png'
import halloweenIll from '@/assets/illustrations/halloween.png'
import thankYouIll from '@/assets/illustrations/thank-you.png'
import weddingIll from '@/assets/illustrations/wedding.png'
import housewarmingIll from '@/assets/illustrations/housewarming.png'
import justBecauseIll from '@/assets/illustrations/just-because.png'

const OCCASION_ILL: Record<string, string> = {
  birthday: birthdayIll,
  anniversary: anniversaryIll,
  valentine: valentineIll,
  christmas: christmasIll,
  graduation: graduationIll,
  newBaby: babyShotIll,
  getWell: getWellIll,
  halloween: halloweenIll,
  thankYou: thankYouIll,
  wedding: weddingIll,
  housewarming: housewarmingIll,
  justBecause: justBecauseIll,
}

// ─── Constants ───────────────────────────────────────────────────────────────

const OCCASION_ICONS: Record<string, LucideIcon> = {
  birthday: Cake, anniversary: PartyPopper, valentine: Heart, christmas: TreePine,
  halloween: Moon, graduation: GraduationCap, newBaby: Baby, thankYou: HeartHandshake,
  getWell: Stethoscope, wedding: Sparkles, housewarming: Home, justBecause: Gift,
}

const OCCASION_KEYS = Object.keys(OCCASION_ICONS)

const RELATIONSHIP_KEYS = ['partner', 'friend', 'parent', 'sibling', 'colleague', 'child', 'teacher', 'other']

const INTEREST_KEYS = [
  'foodie', 'fitness', 'bookworm', 'techLover', 'artist',
  'natureLover', 'fashionista', 'gamer', 'traveler', 'musician',
]

const BUDGET_PRESETS = [
  { key: 'budget', value: 25 },
  { key: 'standard', value: 50 },
  { key: 'premium', value: 100 },
  { key: 'luxury', value: 200 },
]

const BOX_SIZES: ('S' | 'M' | 'L')[] = ['S', 'M', 'L']
const PACKAGING_STYLES: ('classic' | 'luxury' | 'eco')[] = ['classic', 'luxury', 'eco']

const PALETTE_COLORS: Record<string, string> = {
  rose: '#f43f5e', ocean: '#0ea5e9', forest: '#22c55e', sunset: '#f97316',
  midnight: '#8b5cf6', minimal: '#f5f5f5', festive: '#ef4444', pastel: '#f9a8d4',
}
const PALETTE_KEYS = Object.keys(PALETTE_COLORS)

const PATTERN_KEYS = ['none', 'dots', 'stripes', 'floral', 'geometric', 'stars']

const TONE_KEYS = ['heartfelt', 'funny', 'formal', 'romantic', 'casual']

const CATALOG_CATEGORIES = ['all', ...new Set(catalogItems.map(i => i.category))]

const STEP_ICONS = [Heart, User, DollarSign, Package, Palette, ShoppingBag, MessageSquare, Eye, CreditCard]

// ─── Animation Variants ──────────────────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
}

const slideTransition = {
  type: 'tween' as const,
  ease: 'easeInOut' as const,
  duration: 0.35,
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.04 } },
}

const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
}

// ─── Confetti Component (Lottie) ─────────────────────────────────────────────

function Confetti() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <Suspense fallback={null}>
        <Lottie animationData={confettiData} loop={false} autoplay className="w-full h-full" />
      </Suspense>
    </div>
  )
}

// ─── Step: Occasion (0) ──────────────────────────────────────────────────────

function OccasionStep() {
  const { t } = useTranslation()
  const { state, setState } = useBuilderStore()

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-2xl font-bold">{t('builder.steps.occasion.title')}</h2>
        <p className="text-muted-foreground">{t('builder.steps.occasion.description')}</p>
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {OCCASION_KEYS.map((key) => (
          <motion.div key={key} variants={staggerItem}>
            <Card
              variant="glass"
              className={cn(
                'cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-lg',
                state.occasion === key
                  ? 'ring-2 ring-primary/50 border-primary/30 shadow-[0_0_15px_rgba(225,29,72,0.15)]'
                  : 'hover:border-primary/30'
              )}
              onClick={() => setState({ occasion: key })}
            >
              <CardContent className="p-4 text-center space-y-2 flex flex-col items-center justify-center min-h-28">
                <span className="flex justify-center text-primary" role="img" aria-label={key}>
                  {OCCASION_ILL[key] ? (
                    <img src={OCCASION_ILL[key]} alt="" width={48} height={48} className="object-contain drop-shadow-sm" />
                  ) : (
                    (() => { const OccIcon = OCCASION_ICONS[key]; return <OccIcon className="h-8 w-8" /> })()
                  )}
                </span>
                <p className="text-sm font-medium leading-tight line-clamp-2">
                  {t(`builder.steps.occasion.options.${key}`)}
                </p>
                {state.occasion === key && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex justify-center"
                  >
                    <Check className="h-4 w-4 text-primary" />
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Step: Recipient (1) ─────────────────────────────────────────────────────

function RecipientStep() {
  const { t } = useTranslation()
  const { state, setState } = useBuilderStore()

  const toggleInterest = useCallback(
    (interest: string) => {
      const current = state.recipientInterests
      setState({
        recipientInterests: current.includes(interest)
          ? current.filter((i) => i !== interest)
          : [...current, interest],
      })
    },
    [state.recipientInterests, setState]
  )

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-2xl font-bold">{t('builder.steps.recipient.title')}</h2>
        <p className="text-muted-foreground">{t('builder.steps.recipient.description')}</p>
      </div>

      {/* Name */}
      <div className="space-y-2 max-w-md mx-auto">
        <Label htmlFor="recipient-name">{t('builder.steps.recipient.name')}</Label>
        <Input
          id="recipient-name"
          placeholder={t('builder.steps.recipient.namePlaceholder')}
          value={state.recipientName}
          onChange={(e) => setState({ recipientName: e.target.value })}
        />
      </div>

      {/* Relationship */}
      <div className="space-y-3">
        <Label className="text-base">{t('builder.steps.recipient.relationship')}</Label>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-2"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {RELATIONSHIP_KEYS.map((key) => (
            <motion.div key={key} variants={staggerItem}>
              <Button
                variant={state.recipientRelationship === key ? 'default' : 'outline'}
                className="w-full justify-center"
                size="sm"
                onClick={() => setState({ recipientRelationship: key })}
              >
                {t(`builder.steps.recipient.relationships.${key}`)}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Interests */}
      <div className="space-y-3">
        <Label className="text-base">{t('builder.steps.recipient.interests')}</Label>
        <motion.div
          className="flex flex-wrap gap-2 justify-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {INTEREST_KEYS.map((key) => {
            const selected = state.recipientInterests.includes(key)
            return (
              <motion.div key={key} variants={staggerItem}>
                <Badge
                  variant={selected ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer select-none px-3 py-1.5 text-sm transition-all',
                    selected ? 'shadow-md' : 'hover:bg-primary/10'
                  )}
                  onClick={() => toggleInterest(key)}
                >
                  {selected && <Check className="mr-1 h-3 w-3" />}
                  {t(`builder.steps.recipient.interestTags.${key}`)}
                </Badge>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

// ─── Step: Budget (2) ────────────────────────────────────────────────────────

function BudgetStep() {
  const { t } = useTranslation()
  const { state, setState } = useBuilderStore()

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-2xl font-bold">{t('builder.steps.budget.title')}</h2>
        <p className="text-muted-foreground">{t('builder.steps.budget.description')}</p>
      </div>

      <div className="max-w-lg mx-auto space-y-8">
        {/* Current value */}
        <motion.div
          key={state.budget}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <span className="text-4xl sm:text-5xl font-bold font-serif text-primary">
            {formatPrice(state.budget)}
          </span>
        </motion.div>

        {/* Slider */}
        <div className="px-2">
          <Slider
            value={[state.budget]}
            onValueChange={([val]) => setState({ budget: val })}
            min={10}
            max={200}
            step={5}
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>{formatPrice(10)}</span>
            <span>{formatPrice(200)}</span>
          </div>
        </div>

        {/* Presets */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">{t('builder.steps.budget.custom')}</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {BUDGET_PRESETS.map((preset) => (
              <Button
                key={preset.key}
                variant={state.budget === preset.value ? 'default' : 'outline'}
                onClick={() => setState({ budget: preset.value })}
                className="flex-col h-auto py-3"
              >
                <span className="text-xs opacity-70">{t(`builder.steps.budget.presets.${preset.key}`)}</span>
                <span className="font-bold">{formatPrice(preset.value)}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Step: Packaging (3) ─────────────────────────────────────────────────────

function PackagingStep() {
  const { t } = useTranslation()
  const { state, setState } = useBuilderStore()

  const boxSizeIcons: Record<string, LucideIcon> = { S: Package, M: Gift, L: Home }
  const styleIcons: Record<string, LucideIcon> = { classic: Ribbon, luxury: Sparkles, eco: Leaf }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-2xl font-bold">{t('builder.steps.packaging.title')}</h2>
        <p className="text-muted-foreground">{t('builder.steps.packaging.description')}</p>
      </div>

      {/* Box Size */}
      <div className="space-y-3">
        <Label className="text-base">{t('builder.steps.packaging.boxSize')}</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {BOX_SIZES.map((size) => {
            const config = PRICE_CONFIG.BOX_SIZES[size]
            const selected = state.boxSize === size
            return (
              <motion.div key={size} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card
                  className={cn(
                    'cursor-pointer transition-all duration-200',
                    selected
                      ? 'ring-2 ring-primary border-primary bg-primary/5'
                      : 'hover:border-primary/40'
                  )}
                  onClick={() => setState({ boxSize: size })}
                >
                  <CardContent className="p-5 text-center space-y-2">
                    <span className="flex justify-center text-primary">{(() => { const BIcon = boxSizeIcons[size]; return <BIcon className="h-8 w-8" /> })()}</span>
                    <p className="font-semibold">{t(`builder.steps.packaging.sizes.${size}.label`)}</p>
                    <p className="text-xs text-muted-foreground">
                      {t(`builder.steps.packaging.sizes.${size}.description`)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t(`builder.steps.packaging.sizes.${size}.items`, { count: config.maxItems })}
                    </p>
                    <Badge variant={selected ? 'default' : 'secondary'}>
                      {formatPrice(config.basePrice)}
                    </Badge>
                    {selected && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <Check className="h-4 w-4 text-primary mx-auto" />
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Packaging Style */}
      <div className="space-y-3">
        <Label className="text-base">{t('builder.steps.packaging.style')}</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PACKAGING_STYLES.map((style) => {
            const config = PRICE_CONFIG.PACKAGING[style]
            const selected = state.packagingStyle === style
            return (
              <motion.div key={style} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card
                  className={cn(
                    'cursor-pointer transition-all duration-200',
                    selected
                      ? 'ring-2 ring-primary border-primary bg-primary/5'
                      : 'hover:border-primary/40'
                  )}
                  onClick={() => setState({ packagingStyle: style })}
                >
                  <CardContent className="p-5 text-center space-y-2">
                    <span className="flex justify-center text-primary">{(() => { const SIcon = styleIcons[style]; return <SIcon className="h-8 w-8" /> })()}</span>
                    <p className="font-semibold">{t(`builder.steps.packaging.styles.${style}.label`)}</p>
                    <p className="text-xs text-muted-foreground">
                      {t(`builder.steps.packaging.styles.${style}.description`)}
                    </p>
                    {config.multiplier !== 1 && (
                      <Badge variant="accent" className="text-[10px]">
                        ×{config.multiplier}
                      </Badge>
                    )}
                    {selected && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <Check className="h-4 w-4 text-primary mx-auto" />
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Step: Theme (4) ─────────────────────────────────────────────────────────

function ThemeStep() {
  const { t } = useTranslation()
  const { state, setState } = useBuilderStore()

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-2xl font-bold">{t('builder.steps.theme.title')}</h2>
        <p className="text-muted-foreground">{t('builder.steps.theme.description')}</p>
      </div>

      {/* Color Palette */}
      <div className="space-y-3">
        <Label className="text-base">{t('builder.steps.theme.colorPalette')}</Label>
        <div className="flex flex-wrap justify-center gap-4">
          {PALETTE_KEYS.map((key) => {
            const selected = state.themePalette === key
            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setState({ themePalette: key })}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div
                  className={cn(
                    'w-12 h-12 rounded-full shadow-md transition-all duration-200 border-2',
                    selected
                      ? 'border-foreground ring-2 ring-primary ring-offset-2 ring-offset-background scale-110'
                      : 'border-transparent group-hover:border-primary/40'
                  )}
                  style={{ backgroundColor: PALETTE_COLORS[key] }}
                >
                  {selected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <Check
                        className="h-5 w-5"
                        style={{ color: key === 'minimal' ? '#333' : '#fff' }}
                      />
                    </motion.div>
                  )}
                </div>
                <span className={cn('text-xs', selected ? 'font-semibold text-foreground' : 'text-muted-foreground')}>
                  {t(`builder.steps.theme.palettes.${key}`)}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Pattern */}
      <div className="space-y-3">
        <Label className="text-base">{t('builder.steps.theme.pattern')}</Label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {PATTERN_KEYS.map((key) => {
            const selected = state.themePattern === key
            const patternIcons: Record<string, LucideIcon> = {
              none: Square, dots: CircleDot, stripes: AlignJustify, floral: Flower2, geometric: Hexagon, stars: Star,
            }
            return (
              <Button
                key={key}
                variant={selected ? 'default' : 'outline'}
                className="flex-col h-auto py-3 gap-1"
                onClick={() => setState({ themePattern: key })}
              >
                <span className="flex justify-center">{(() => { const PIcon = patternIcons[key]; return <PIcon className="h-5 w-5" /> })()}</span>
                <span className="text-[11px]">{t(`builder.steps.theme.patterns.${key}`)}</span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Preview */}
      <div className="flex justify-center">
        <motion.div
          key={`${state.themePalette}-${state.themePattern}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl shadow-lg border-2 border-border flex items-center justify-center relative overflow-hidden"
          style={{ backgroundColor: PALETTE_COLORS[state.themePalette] || '#f5f5f5' }}
        >
          <Gift className="h-10 w-10 text-white/80 z-10" />
          {state.themePattern === 'dots' && (
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
                backgroundSize: '12px 12px',
              }}
            />
          )}
          {state.themePattern === 'stripes' && (
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 6px, white 6px, white 8px)',
              }}
            />
          )}
          {state.themePattern === 'stars' && (
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <Star className="h-5 w-5 text-white" />
              <Star className="h-5 w-5 text-white" />
              <Star className="h-5 w-5 text-white" />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

// ─── Step: Items (5) ─────────────────────────────────────────────────────────

function ItemsStep() {
  const { t } = useTranslation()
  const { state, addItem, removeItem } = useBuilderStore()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const maxItems = PRICE_CONFIG.BOX_SIZES[state.boxSize].maxItems

  const filtered = useMemo(() => {
    return catalogItems.filter((item) => {
      const matchesSearch =
        !search ||
        t(item.nameKey).toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
      const matchesCategory = category === 'all' || item.category === category
      return matchesSearch && matchesCategory
    })
  }, [search, category, t])

  const isSelected = useCallback(
    (id: string) => state.selectedItems.some((i) => i.id === id),
    [state.selectedItems]
  )

  const boxFull = state.selectedItems.length >= maxItems

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-2xl font-bold">{t('builder.steps.items.title')}</h2>
        <p className="text-muted-foreground">{t('builder.steps.items.description')}</p>
      </div>

      {/* Selected count indicator */}
      <div className="flex items-center justify-center gap-2">
        <Badge variant={boxFull ? 'destructive' : 'secondary'} className="text-sm px-3 py-1">
          <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
          {t('builder.steps.items.itemsSelected', { count: state.selectedItems.length })} / {maxItems}{' '}
          {t('builder.steps.items.maxItems')}
        </Badge>
        {boxFull && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-destructive font-medium"
          >
            {t('builder.steps.items.boxFull')}
          </motion.span>
        )}
      </div>

      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('builder.steps.items.search')}
          aria-label={t('builder.steps.items.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={t('catalog.clearFilters', 'Clear search')}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <Tabs value={category} onValueChange={setCategory}>
        <TabsList className="flex-wrap h-auto gap-1 bg-transparent justify-center">
          {CATALOG_CATEGORIES.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="capitalize text-xs">
              {cat === 'all' ? t('builder.steps.items.search').replace('...', '') || 'All' : cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Item Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {filtered.map((item) => {
          const selected = isSelected(item.id)
          return (
            <motion.div key={item.id} variants={staggerItem} layout>
              <Card
                className={cn(
                  'transition-all duration-200',
                  selected ? 'ring-2 ring-primary border-primary bg-primary/5' : ''
                )}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <ItemIcon name={item.icon} itemId={item.id} imgSize={36} className="h-7 w-7 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{t(item.nameKey)}</p>
                    <p className="text-xs text-muted-foreground truncate">{t(item.descriptionKey)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-semibold text-primary">{formatPrice(item.price)}</span>
                      {item.popular && <Badge variant="accent" className="text-[10px] py-0"><Sparkles className="h-3 w-3" /></Badge>}
                      {item.isNew && <Badge variant="success" className="text-[10px] py-0">NEW</Badge>}
                    </div>
                  </div>
                  <div className="shrink-0">
                    {selected ? (
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-8 w-8"
                        onClick={() => removeItem(item.id)}
                        aria-label={t('builder.steps.items.remove', 'Remove') + ': ' + t(item.nameKey)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        disabled={boxFull}
                        onClick={() => addItem(item)}
                        aria-label={t('builder.steps.items.add', 'Add') + ': ' + t(item.nameKey)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p>{t('builder.steps.items.search')} — 0 results</p>
        </div>
      )}
    </div>
  )
}

// ─── Step: Card (6) ──────────────────────────────────────────────────────────

function CardStep() {
  const { t } = useTranslation()
  const { state, setState } = useBuilderStore()

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-2xl font-bold">{t('builder.steps.card.title')}</h2>
        <p className="text-muted-foreground">{t('builder.steps.card.description')}</p>
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-center gap-3">
        <Switch
          checked={state.includeCard}
          onCheckedChange={(checked) => setState({ includeCard: checked })}
          id="include-card"
        />
        <Label htmlFor="include-card" className="cursor-pointer text-base">
          {t('builder.steps.card.includeCard')} (+{formatPrice(PRICE_CONFIG.CARD_PRICE)})
        </Label>
      </div>

      <AnimatePresence>
        {state.includeCard && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 overflow-hidden"
          >
            {/* Tone Presets */}
            <div className="space-y-2">
              <Label className="text-sm">{t('builder.steps.card.title')}</Label>
              <div className="flex flex-wrap gap-2 justify-center">
                {TONE_KEYS.map((tone) => (
                  <Button
                    key={tone}
                    size="sm"
                    variant={state.cardTone === tone ? 'default' : 'outline'}
                    onClick={() => {
                      setState({
                        cardTone: tone,
                        cardMessage: t(`builder.steps.card.tonePresets.${tone}`),
                      })
                    }}
                  >
                    {t(`builder.steps.card.tones.${tone}`)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2 max-w-lg mx-auto">
              <Label htmlFor="card-message">{t('builder.steps.card.message')}</Label>
              <Textarea
                id="card-message"
                placeholder={t('builder.steps.card.messagePlaceholder')}
                value={state.cardMessage}
                onChange={(e) => setState({ cardMessage: e.target.value })}
                rows={5}
                maxLength={300}
                className="resize-none"
              />
              <p className="text-xs text-right text-muted-foreground">
                {t('builder.steps.card.characters', { count: state.cardMessage.length, max: 300 })}
              </p>
            </div>

            {/* Live Preview */}
            <div className="flex justify-center">
              <motion.div
                layout
                className="bg-card border-2 border-dashed border-primary/30 rounded-xl p-6 max-w-sm w-full text-center space-y-2 shadow-sm"
              >
                <MessageSquare className="h-6 w-6 mx-auto text-primary/50" />
                <p className="text-sm italic text-muted-foreground whitespace-pre-wrap min-h-12">
                  {state.cardMessage || t('builder.steps.card.messagePlaceholder')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Step: Preview (7) ───────────────────────────────────────────────────────

function PreviewStep() {
  const { t } = useTranslation()
  const { state, setStep, getTotalPrice } = useBuilderStore()

  const sections = [
    {
      step: 0,
      label: t('builder.steps.preview.occasion'),
      value: state.occasion
        ? t(`builder.steps.occasion.options.${state.occasion}`)
        : '—',
    },
    {
      step: 1,
      label: t('builder.steps.preview.recipient'),
      value: [
        state.recipientName,
        state.recipientRelationship
          ? t(`builder.steps.recipient.relationships.${state.recipientRelationship}`)
          : '',
      ]
        .filter(Boolean)
        .join(' — ') || '—',
    },
    {
      step: 2,
      label: t('builder.steps.budget.title'),
      value: formatPrice(state.budget),
    },
    {
      step: 3,
      label: t('builder.steps.preview.packaging'),
      value: `${t(`builder.steps.packaging.sizes.${state.boxSize}.label`)} / ${t(
        `builder.steps.packaging.styles.${state.packagingStyle}.label`
      )}`,
    },
    {
      step: 4,
      label: t('builder.steps.preview.theme'),
      value: `${t(`builder.steps.theme.palettes.${state.themePalette}`)} + ${t(
        `builder.steps.theme.patterns.${state.themePattern}`
      )}`,
    },
    {
      step: 5,
      label: t('builder.steps.preview.items'),
      value:
        state.selectedItems.length > 0
          ? state.selectedItems.map((i) => t(i.nameKey)).join(', ')
          : '—',
    },
    {
      step: 6,
      label: t('builder.steps.preview.cardMessage'),
      value: state.includeCard ? state.cardMessage || '—' : '—',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-2xl font-bold">{t('builder.steps.preview.title')}</h2>
        <p className="text-muted-foreground">{t('builder.steps.preview.description')}</p>
      </div>

      <motion.div
        className="space-y-3 max-w-2xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {sections.map((section) => (
          <motion.div key={section.step} variants={staggerItem}>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    {section.label}
                  </p>
                  <p className="text-sm font-medium mt-0.5 truncate">{section.value}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => setStep(section.step)}>
                  <Pencil className="h-3.5 w-3.5 mr-1" />
                  {t('builder.steps.preview.editStep')}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Total */}
      <div className="text-center pt-4">
        <Separator className="mb-4" />
        <p className="text-muted-foreground text-sm">{t('builder.pricing.total')}</p>
        <p className="text-3xl font-bold font-serif text-gradient">{formatPrice(getTotalPrice())}</p>
      </div>
    </div>
  )
}

// ─── Step: Checkout (8) ──────────────────────────────────────────────────────

function CheckoutStep() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { state, setState, resetBuilder, getTotalPrice } = useBuilderStore()
  const [showConfetti, setShowConfetti] = useState(false)

  const handlePlaceOrder = () => {
    setState({ orderPlaced: true })
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }

  if (state.orderPlaced) {
    return (
      <div className="space-y-8">
        {showConfetti && <Confetti />}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-center space-y-6 py-12"
        >
          <motion.div
            className="flex justify-center"
            animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <PartyPopper className="h-16 w-16 text-primary" />
          </motion.div>
          <h2 className="font-serif text-3xl font-bold">{t('builder.steps.checkout.orderPlaced')}</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            {t('builder.steps.checkout.orderMessage')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button
              variant="default"
              onClick={() => {
                resetBuilder()
                navigate(ROUTES.HOME)
              }}
            >
              <Home className="mr-2 h-4 w-4" />
              {t('builder.steps.checkout.backToHome')}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                resetBuilder()
              }}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              {t('builder.steps.checkout.buildAnother')}
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  const isFormValid =
    state.deliveryName.trim() &&
    state.deliveryAddress.trim() &&
    state.deliveryCity.trim() &&
    state.deliveryZip.trim() &&
    state.deliveryCountry.trim()

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-2xl font-bold">{t('builder.steps.checkout.title')}</h2>
        <p className="text-muted-foreground">{t('builder.steps.checkout.description')}</p>
      </div>

      <Card variant="glass" className="max-w-xl mx-auto">
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="delivery-name">{t('builder.steps.checkout.recipientName')}</Label>
              <Input
                id="delivery-name"
                value={state.deliveryName}
                onChange={(e) => setState({ deliveryName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="delivery-country">{t('builder.steps.checkout.country')}</Label>
              <Input
                id="delivery-country"
                value={state.deliveryCountry}
                onChange={(e) => setState({ deliveryCountry: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="delivery-address">{t('builder.steps.checkout.address')}</Label>
            <Input
              id="delivery-address"
              value={state.deliveryAddress}
              onChange={(e) => setState({ deliveryAddress: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="delivery-city">{t('builder.steps.checkout.city')}</Label>
              <Input
                id="delivery-city"
                value={state.deliveryCity}
                onChange={(e) => setState({ deliveryCity: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="delivery-zip">{t('builder.steps.checkout.zipCode')}</Label>
              <Input
                id="delivery-zip"
                value={state.deliveryZip}
                onChange={(e) => setState({ deliveryZip: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="delivery-date">{t('builder.steps.checkout.deliveryDate')}</Label>
              <Input
                id="delivery-date"
                type="date"
                value={state.deliveryDate}
                onChange={(e) => setState({ deliveryDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="delivery-notes">{t('builder.steps.checkout.notes')}</Label>
            <Textarea
              id="delivery-notes"
              placeholder={t('builder.steps.checkout.notesPlaceholder')}
              value={state.deliveryNotes}
              onChange={(e) => setState({ deliveryNotes: e.target.value })}
              rows={3}
              className="resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Price Summary */}
      <Card variant="glass" className="max-w-xl mx-auto">
        <CardContent className="p-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t('builder.pricing.baseBox')}</span>
            <span>{formatPrice(PRICE_CONFIG.BOX_SIZES[state.boxSize].basePrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {t('builder.pricing.items')} ({state.selectedItems.length})
            </span>
            <span>{formatPrice(state.selectedItems.reduce((sum, i) => sum + i.price, 0))}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t('builder.pricing.packaging')}</span>
            <span>×{PRICE_CONFIG.PACKAGING[state.packagingStyle].multiplier}</span>
          </div>
          {state.includeCard && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t('builder.pricing.giftCard')}</span>
              <span>{formatPrice(PRICE_CONFIG.CARD_PRICE)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>{t('builder.pricing.total')}</span>
            <span className="text-gradient">{formatPrice(getTotalPrice())}</span>
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-3">
        <p className="text-xs text-muted-foreground">{t('builder.steps.checkout.demoNotice')}</p>
        <Button
          variant="glow"
          size="lg"
          disabled={!isFormValid}
          onClick={handlePlaceOrder}
          className="w-full sm:w-auto sm:min-w-50"
        >
          <PartyPopper className="mr-2 h-4 w-4" />
          {t('builder.steps.checkout.placeOrder')}
        </Button>
      </div>
    </div>
  )
}

// ─── Step Components Array ───────────────────────────────────────────────────

const STEP_COMPONENTS = [
  OccasionStep,
  RecipientStep,
  BudgetStep,
  PackagingStep,
  ThemeStep,
  ItemsStep,
  CardStep,
  PreviewStep,
  CheckoutStep,
]

// ─── Main Builder Page ───────────────────────────────────────────────────────

export default function BuilderPage() {
  const { t } = useTranslation()
  const { state, nextStep, prevStep, setStep, getTotalPrice, saveDesign, resetBuilder } =
    useBuilderStore()
  const [direction, setDirection] = useState(1)

  const handleNext = useCallback(() => {
    setDirection(1)
    nextStep()
  }, [nextStep])

  const handlePrev = useCallback(() => {
    setDirection(-1)
    prevStep()
  }, [prevStep])

  const handleSetStep = useCallback((idx: number) => {
    setDirection(idx > state.currentStep ? 1 : -1)
    setStep(idx)
  }, [state.currentStep, setStep])

  const progress = ((state.currentStep + 1) / TOTAL_STEPS) * 100

  const StepComponent = STEP_COMPONENTS[state.currentStep]

  const stepKeys = [
    'occasion', 'recipient', 'budget', 'packaging', 'theme', 'items', 'card', 'preview', 'checkout',
  ]

  return (
    <PageTransition>
      <SEO
        title={t('builder.title')}
        description={t('builder.subtitle')}
        path={ROUTES.BUILDER}
      />

      <div className="min-h-screen flex flex-col">
        {/* ─── Top Bar: Progress + Step Indicators ─── */}
        <div className="sticky top-16 z-40 glass-strong border-b border-white/10">
          <div className="mx-auto max-w-5xl px-4 py-3 space-y-3">
            {/* Title + Actions */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-lg font-bold">{t('builder.title')}</h1>
                <p className="text-xs text-muted-foreground">{t('builder.subtitle')}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => saveDesign()}
                  title={t('builder.saveDesign')}
                >
                  <Save className="h-4 w-4" />
                  <span className="hidden sm:inline ml-1">{t('builder.saveDesign')}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => resetBuilder()}
                  title={t('builder.resetBuilder')}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-primary via-secondary to-accent"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>

            {/* Step indicators — compact on mobile, full on larger screens */}
            <div className="flex sm:hidden items-center justify-center gap-2 py-1">
              <span className="text-xs font-medium text-muted-foreground">
                {t(`builder.steps.${stepKeys[state.currentStep]}.title`)}
              </span>
              <Badge variant="outline" className="text-xs px-2 py-0">
                {state.currentStep + 1}/{stepKeys.length}
              </Badge>
            </div>
            <div className="hidden sm:flex items-center justify-between overflow-x-auto gap-1 pb-1 scrollbar-hide">
              {stepKeys.map((key, idx) => {
                const Icon = STEP_ICONS[idx]
                const isActive = state.currentStep === idx
                const isCompleted = state.currentStep > idx
                return (
                  <button
                    key={key}
                    onClick={() => handleSetStep(idx)}
                    className={cn(
                      'flex flex-col items-center gap-0.5 min-w-18 py-1 px-1 rounded-lg transition-all duration-200 group',
                      isActive && 'bg-primary/10',
                      !isActive && 'hover:bg-muted'
                    )}
                  >
                    <div
                      className={cn(
                        'w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200',
                        isActive && 'bg-linear-to-br from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/30',
                        isCompleted && !isActive && 'bg-primary/20 text-primary',
                        !isActive && !isCompleted && 'bg-muted text-muted-foreground group-hover:bg-muted-foreground/20'
                      )}
                    >
                      {isCompleted && !isActive ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Icon className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-xs leading-tight text-center transition-colors max-w-18 truncate',
                        isActive ? 'font-semibold text-primary' : 'text-muted-foreground'
                      )}
                    >
                      {t(`builder.steps.${key}.title`)}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ─── Step Content ─── */}
        <ClickSpark sparkColor="#f43f5e" sparkSize={8} sparkRadius={20} sparkCount={6} duration={500}>
          <div className="flex-1 mx-auto max-w-5xl px-4 py-8 w-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={state.currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
              >
                <StepComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </ClickSpark>

        {/* ─── Bottom Navigation Bar ─── */}
        {!state.orderPlaced && (
          <div className="sticky bottom-0 z-40 glass-strong border-t border-white/10">
            <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-4">
              {/* Previous */}
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={state.currentStep === 0}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{t('builder.previous')}</span>
              </Button>

              {/* Price Summary */}
              <div className="text-center flex-1">
                <p className="text-xs text-muted-foreground">{t('builder.pricing.total')}</p>
                <motion.p
                  key={getTotalPrice()}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-lg font-bold text-gradient"
                >
                  {formatPrice(getTotalPrice())}
                </motion.p>
              </div>

              {/* Next / Finish */}
              {state.currentStep < TOTAL_STEPS - 1 ? (
                <Button onClick={handleNext} className="gap-1">
                  <span className="hidden sm:inline">{t('builder.next')}</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="shimmer" onClick={handleNext} className="gap-1" disabled>
                  <Sparkles className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('builder.finish')}</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
