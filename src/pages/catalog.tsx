import { useState, useMemo, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Plus, Check, ArrowUpDown,
  X, ShoppingBag, Grid3X3, List, Sparkles, Filter,
  Candy, Flame, Gem, Heart, Coffee, PenTool, Laptop, Home,
  type LucideIcon,
} from 'lucide-react'
import { ItemIcon } from '@/components/common/item-icon'
import emptyStateData from '@/assets/lottie/empty-state.json'

const Lottie = lazy(() => import('lottie-react'))
import { GradientOrb } from '@/components/common/gradient-orb'

import { catalogItems, type CatalogItem } from '@/data/catalog-items'
import { cn, formatPrice } from '@/lib/utils'
import { ROUTES } from '@/lib/constants'
import { SEO } from '@/components/common/seo'
import { PageTransition } from '@/components/common/page-transition'
import { useBuilderStore } from '@/features/builder/builder-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type SortOption = 'featured' | 'priceLow' | 'priceHigh' | 'nameAz' | 'newest'
type ViewMode = 'grid' | 'list'

const CATEGORIES = [
  'all', 'chocolates', 'candles', 'accessories', 'wellness',
  'drinks', 'stationery', 'tech', 'home',
] as const

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  all: Sparkles, chocolates: Candy, candles: Flame, accessories: Gem,
  wellness: Heart, drinks: Coffee, stationery: PenTool, tech: Laptop, home: Home,
}

const SORT_OPTIONS: SortOption[] = ['featured', 'priceLow', 'priceHigh', 'nameAz', 'newest']

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: Math.min(i * 0.03, 0.3), duration: 0.3, ease: 'easeOut' as const },
  }),
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

function sortItems(items: CatalogItem[], sort: SortOption): CatalogItem[] {
  const sorted = [...items]
  switch (sort) {
    case 'featured':
      return sorted.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
    case 'priceLow':
      return sorted.sort((a, b) => a.price - b.price)
    case 'priceHigh':
      return sorted.sort((a, b) => b.price - a.price)
    case 'nameAz':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'newest':
      return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    default:
      return sorted
  }
}

export default function CatalogPage() {
  const { t } = useTranslation()
  const { state, addItem } = useBuilderStore()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('all')
  const [sort, setSort] = useState<SortOption>('featured')
  const [view, setView] = useState<ViewMode>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [showSort, setShowSort] = useState(false)

  const filteredItems = useMemo(() => {
    let items = catalogItems

    if (category !== 'all') {
      items = items.filter(item => item.category === category)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(item => {
        const translatedName = t(item.nameKey).toLowerCase()
        const translatedDesc = t(item.descriptionKey).toLowerCase()
        return (
          translatedName.includes(q) ||
          translatedDesc.includes(q) ||
          item.name.toLowerCase().includes(q) ||
          item.tags.some(tag => tag.toLowerCase().includes(q)) ||
          item.category.toLowerCase().includes(q)
        )
      })
    }

    return sortItems(items, sort)
  }, [search, category, sort, t])

  const isItemAdded = (id: string) => state.selectedItems.some(i => i.id === id)

  const handleAdd = (item: CatalogItem) => {
    addItem(item)
  }

  const clearFilters = () => {
    setSearch('')
    setCategory('all')
    setSort('featured')
  }

  const hasActiveFilters = search.trim() !== '' || category !== 'all' || sort !== 'featured'

  return (
    <PageTransition>
      <SEO title={t('catalog.title')} path={ROUTES.CATALOG} />

      {/* Hero */}
      <section className="relative overflow-hidden mesh-gradient">
        <div className="absolute inset-0 noise-bg" />
        <GradientOrb color="primary" size="lg" className="absolute -top-20 right-[10%] opacity-30" />
        <GradientOrb color="secondary" size="md" className="absolute -bottom-10 left-[5%] opacity-20" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-medium glass text-foreground">
              <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
              {t('catalog.title')}
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              <span className="text-gradient">{t('catalog.title')}</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('catalog.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="flex flex-col gap-4 mb-6"
        >
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('catalog.searchPlaceholder')}
                aria-label={t('catalog.searchPlaceholder')}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 pr-10 glass-subtle"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={t('catalog.clearFilters')}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Sort */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSort(!showSort)}
                  className="gap-1.5"
                >
                  <ArrowUpDown className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{t('catalog.sortBy')}</span>
                </Button>

                <AnimatePresence>
                  {showSort && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 z-50 w-48 rounded-lg glass-strong p-1 shadow-lg"
                    >
                      {SORT_OPTIONS.map(opt => (
                        <button
                          key={opt}
                          onClick={() => { setSort(opt); setShowSort(false) }}
                          className={cn(
                            'w-full text-left text-sm px-3 py-2 rounded-md transition-colors',
                            sort === opt
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'hover:bg-muted'
                          )}
                        >
                          {t(`catalog.sortOptions.${opt}`)}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Filter toggle (mobile) */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden gap-1.5 relative"
              >
                <Filter className="h-3.5 w-3.5" />
                {category !== 'all' && (
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
                )}
              </Button>

              {/* View toggle */}
              <div className="flex items-center rounded-lg glass-subtle p-0.5" role="group" aria-label={t('catalog.view', 'View')}>
                <button
                  onClick={() => setView('grid')}
                  aria-label={t('catalog.gridView', 'Grid view')}
                  aria-pressed={view === 'grid'}
                  className={cn(
                    'rounded-md p-2.5 transition-all duration-200',
                    view === 'grid' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView('list')}
                  aria-label={t('catalog.listView', 'List view')}
                  aria-pressed={view === 'list'}
                  className={cn(
                    'rounded-md p-2.5 transition-all duration-200',
                    view === 'list' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Clear */}
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5 text-muted-foreground">
                  <X className="h-3.5 w-3.5" />
                  {t('catalog.clearFilters')}
                </Button>
              )}
            </div>
          </div>

          {/* Results count */}
          <div className="text-sm text-muted-foreground" aria-live="polite" role="status">
            {t('catalog.showing', { count: filteredItems.length })}
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className={cn('mb-8', !showFilters && 'hidden sm:block')}
        >
          <Tabs value={category} onValueChange={setCategory}>
            <TabsList className="flex overflow-x-auto h-auto gap-1 bg-transparent p-0 scrollbar-hide">
              {CATEGORIES.map(cat => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="whitespace-nowrap data-[state=active]:bg-linear-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-full px-4 py-1.5 text-sm transition-all shrink-0"
                >
                  {(() => { const CatIcon = CATEGORY_ICONS[cat]; return CatIcon ? <CatIcon className="mr-1.5 h-4 w-4" /> : null })()}
                  {t(`catalog.categories.${cat}`)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        <Separator className="mb-8" />

        {/* Items Grid / List */}
        <AnimatePresence mode="wait">
          {filteredItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative flex flex-col items-center justify-center py-24 text-center"
            >
              <GradientOrb color="primary" size="md" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
              <div className="relative z-10 glass-strong rounded-2xl p-12">
                <div className="mx-auto mb-4 w-32 h-32">
                  <Suspense fallback={<Search className="h-14 w-14 text-muted-foreground/40 mx-auto" />}>
                    <Lottie animationData={emptyStateData} loop autoplay className="w-full h-full" />
                  </Suspense>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('catalog.noResults')}</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  {t('catalog.subtitle')}
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  <X className="mr-2 h-4 w-4" />
                  {t('catalog.clearFilters')}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                view === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
                  : 'flex flex-col gap-4'
              )}
            >
              {filteredItems.map((item, i) => (
                <CatalogCard
                  key={item.id}
                  item={item}
                  index={i}
                  view={view}
                  isAdded={isItemAdded(item.id)}
                  onAdd={() => handleAdd(item)}
                  t={t}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}

interface CatalogCardProps {
  item: CatalogItem
  index: number
  view: ViewMode
  isAdded: boolean
  onAdd: () => void
  t: (key: string) => string
}

function CatalogCard({ item, index, view, isAdded, onAdd, t }: CatalogCardProps) {
  if (view === 'list') {
    return (
      <motion.div
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card variant="glass" className="group overflow-hidden transition-shadow hover:shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div
                className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary/15 to-secondary/10"
              >
                <ItemIcon name={item.icon} itemId={item.id} imgSize={48} className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-semibold truncate">{t(item.nameKey)}</h3>
                  {item.popular && (
                    <Badge variant="accent" className="shrink-0 text-xs animate-pulse-soft">
                      <Sparkles className="mr-1 h-3 w-3" />{t('catalog.popular')}
                    </Badge>
                  )}
                  {item.isNew && (
                    <Badge variant="success" className="shrink-0 text-xs">
                      {t('catalog.new')}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{t(item.descriptionKey)}</p>
                <Badge variant="outline" className="mt-1.5 text-xs">
                  {t(`catalog.categories.${item.category}`)}
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              <span className="text-lg font-bold text-gradient">{formatPrice(item.price)}</span>
              <div>
                <Button
                  size="sm"
                  variant={isAdded ? 'secondary' : 'default'}
                  onClick={onAdd}
                  disabled={isAdded}
                  className="gap-1.5"
                >
                  {isAdded ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  {isAdded ? t('catalog.added') : t('catalog.addToBox')}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
        <Card variant="glass" className="group h-full overflow-hidden hover:shadow-xl hover:border-primary/20">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary/15 to-secondary/10 shadow-sm group-hover:scale-110 transition-transform duration-200"
              >
                <ItemIcon name={item.icon} itemId={item.id} imgSize={48} className="h-8 w-8 text-primary" />
              </div>
              <div className="flex gap-1.5">
                {item.popular && (
                  <Badge variant="accent" className="text-xs glow-primary">
                    <Sparkles className="mr-1 h-3 w-3" />{t('catalog.popular')}
                  </Badge>
                )}
                {item.isNew && (
                  <Badge variant="success" className="text-xs">{t('catalog.new')}</Badge>
                )}
              </div>
            </div>

            <h3 className="font-semibold text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors">
              {t(item.nameKey)}
            </h3>

            <Badge variant="outline" className="text-xs mb-3">
              {t(`catalog.categories.${item.category}`)}
            </Badge>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-10">
              {t(item.descriptionKey)}
            </p>

            <Separator className="mb-4" />

            <div className="flex items-center justify-between">
              <span className="text-xl font-bold tracking-tight text-gradient">{formatPrice(item.price)}</span>
              <div>
                <Button
                  size="sm"
                  variant={isAdded ? 'secondary' : 'default'}
                  onClick={onAdd}
                  disabled={isAdded}
                  className="gap-1.5"
                >
                  {isAdded ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span className="sr-only">{t('catalog.addToBox')}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5" />
                      {t('catalog.addToBox')}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
