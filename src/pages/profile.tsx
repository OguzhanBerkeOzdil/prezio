import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Package, Edit, Copy, Trash2, Plus, Gift,
  Calendar, DollarSign, Pencil, AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card, CardContent, CardHeader, CardTitle,
  CardDescription, CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { SEO } from '@/components/common/seo'
import { PageTransition } from '@/components/common/page-transition'
import { formatPrice } from '@/lib/utils'
import { ROUTES, PRICE_CONFIG } from '@/lib/constants'
import { useBuilderStore, type SavedDesign } from '@/features/builder/builder-store'

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
}

function computeTotal(design: SavedDesign): number {
  const { state } = design
  const boxPrice = PRICE_CONFIG.BOX_SIZES[state.boxSize].basePrice
  const itemsPrice = state.selectedItems.reduce((sum, i) => sum + i.price, 0)
  const multiplier = PRICE_CONFIG.PACKAGING[state.packagingStyle].multiplier
  const cardPrice = state.includeCard ? PRICE_CONFIG.CARD_PRICE : 0
  return Math.round((boxPrice + itemsPrice) * multiplier + cardPrice)
}

function EmptyState() {
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-6 py-24 text-center"
    >
      <div className="rounded-full bg-linear-to-br from-primary/15 to-secondary/10 p-6 glass">
        <Gift className="h-12 w-12 text-primary/60" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{t('profile.noDesigns')}</h3>
      </div>
      <Button asChild variant="shimmer" size="default">
        <Link to={ROUTES.BUILDER}>
          <Plus className="mr-2 h-4 w-4" />
          {t('profile.startBuilding')}
        </Link>
      </Button>
    </motion.div>
  )
}

interface DesignCardProps {
  design: SavedDesign
  index: number
  onRename: (design: SavedDesign) => void
  onDelete: (design: SavedDesign) => void
  onDuplicate: (id: string) => void
  onEdit: (id: string) => void
}

function DesignCard({ design, index, onRename, onDelete, onDuplicate, onEdit }: DesignCardProps) {
  const { t } = useTranslation()
  const total = computeTotal(design)
  const date = new Date(design.savedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <Card variant="glass" className="group relative flex h-full flex-col overflow-hidden hover:shadow-lg hover:border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="line-clamp-1 text-lg">{design.name}</CardTitle>
            <Badge variant="secondary" className="shrink-0 capitalize">
              {design.state.boxSize}
            </Badge>
          </div>
          <CardDescription className="flex items-center gap-1.5 text-xs">
            <Calendar className="h-3.5 w-3.5" />
            {t('profile.savedOn', { date })}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {design.state.occasion && (
              <Badge variant="outline" className="text-xs capitalize">
                {design.state.occasion}
              </Badge>
            )}
            <Badge variant="outline" className="text-xs capitalize">
              {design.state.packagingStyle}
            </Badge>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Package className="h-3.5 w-3.5" />
              <span>
                {design.state.selectedItems.length}{' '}
                {design.state.selectedItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <DollarSign className="h-3.5 w-3.5 text-primary" />
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="grid grid-cols-4 gap-1.5 border-t pt-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRename(design)}
            title={t('profile.actions.rename')}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDuplicate(design.id)}
            title={t('profile.actions.duplicate')}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(design)}
            title={t('profile.actions.delete')}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(design.id)}
            className="col-span-1"
          >
            <Edit className="mr-1 h-3.5 w-3.5" />
            {t('profile.actions.edit')}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default function ProfilePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { savedDesigns, loadDesign, deleteDesign, renameDesign, duplicateDesign } = useBuilderStore()

  const [deleteTarget, setDeleteTarget] = useState<SavedDesign | null>(null)
  const [renameTarget, setRenameTarget] = useState<SavedDesign | null>(null)
  const [renameName, setRenameName] = useState('')

  const handleEdit = (id: string) => {
    loadDesign(id)
    navigate(ROUTES.BUILDER)
  }

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteDesign(deleteTarget.id)
      setDeleteTarget(null)
    }
  }

  const handleRenameConfirm = () => {
    if (renameTarget && renameName.trim()) {
      renameDesign(renameTarget.id, renameName.trim())
      setRenameTarget(null)
      setRenameName('')
    }
  }

  const openRenameDialog = (design: SavedDesign) => {
    setRenameTarget(design)
    setRenameName(design.name)
  }

  return (
    <>
      <SEO title={t('profile.title')} />
      <PageTransition>
        <div className="container mx-auto max-w-6xl px-4 py-12 sm:py-16">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t('profile.title')}
              </h1>
              <p className="text-muted-foreground">{t('profile.subtitle')}</p>
            </div>
            <Button asChild variant="shimmer">
              <Link to={ROUTES.BUILDER}>
                <Plus className="mr-2 h-4 w-4" />
                {t('profile.startBuilding')}
              </Link>
            </Button>
          </motion.div>

          {/* Content */}
          {savedDesigns.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {savedDesigns.map((design, i) => (
                  <DesignCard
                    key={design.id}
                    design={design}
                    index={i}
                    onRename={openRenameDialog}
                    onDelete={setDeleteTarget}
                    onDuplicate={duplicateDesign}
                    onEdit={handleEdit}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
          <DialogContent>
            <DialogHeader>
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <DialogTitle>{t('profile.deleteConfirm.title')}</DialogTitle>
              <DialogDescription>
                {t('profile.deleteConfirm.message', { name: deleteTarget?.name })}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setDeleteTarget(null)}>
                {t('profile.deleteConfirm.cancel')}
              </Button>
              <Button variant="destructive" onClick={handleDeleteConfirm}>
                <Trash2 className="mr-2 h-4 w-4" />
                {t('profile.deleteConfirm.confirm')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Rename Dialog */}
        <Dialog
          open={!!renameTarget}
          onOpenChange={() => {
            setRenameTarget(null)
            setRenameName('')
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('profile.renameDialog.title')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <Label htmlFor="rename-input">{t('profile.actions.rename')}</Label>
              <Input
                id="rename-input"
                value={renameName}
                onChange={(e) => setRenameName(e.target.value)}
                placeholder={t('profile.renameDialog.placeholder')}
                onKeyDown={(e) => e.key === 'Enter' && handleRenameConfirm()}
                autoFocus
              />
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => {
                  setRenameTarget(null)
                  setRenameName('')
                }}
              >
                {t('profile.renameDialog.cancel')}
              </Button>
              <Button onClick={handleRenameConfirm} disabled={!renameName.trim()}>
                <Pencil className="mr-2 h-4 w-4" />
                {t('profile.renameDialog.confirm')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageTransition>
    </>
  )
}
