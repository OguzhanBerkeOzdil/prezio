import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS, PRICE_CONFIG } from '@/lib/constants'
import { generateId } from '@/lib/utils'
import type { CatalogItem } from '@/data/catalog-items'

export interface SavedDesign {
  id: string
  name: string
  savedAt: string
  state: BuilderState
}

export interface BuilderState {
  currentStep: number
  occasion: string
  recipientRelationship: string
  recipientName: string
  recipientInterests: string[]
  budget: number
  boxSize: 'S' | 'M' | 'L'
  packagingStyle: 'classic' | 'luxury' | 'eco'
  themePalette: string
  themePattern: string
  selectedItems: CatalogItem[]
  includeCard: boolean
  cardTone: string
  cardMessage: string
  deliveryName: string
  deliveryAddress: string
  deliveryCity: string
  deliveryZip: string
  deliveryCountry: string
  deliveryDate: string
  deliveryNotes: string
  orderPlaced: boolean
}

interface BuilderStore {
  state: BuilderState
  savedDesigns: SavedDesign[]
  setState: (partial: Partial<BuilderState>) => void
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  addItem: (item: CatalogItem) => void
  removeItem: (itemId: string) => void
  resetBuilder: () => void
  saveDesign: (name?: string) => string
  loadDesign: (id: string) => void
  deleteDesign: (id: string) => void
  renameDesign: (id: string, name: string) => void
  duplicateDesign: (id: string) => void
  getTotalPrice: () => number
}

const initialState: BuilderState = {
  currentStep: 0,
  occasion: '',
  recipientRelationship: '',
  recipientName: '',
  recipientInterests: [],
  budget: 50,
  boxSize: 'M',
  packagingStyle: 'classic',
  themePalette: 'rose',
  themePattern: 'none',
  selectedItems: [],
  includeCard: true,
  cardTone: '',
  cardMessage: '',
  deliveryName: '',
  deliveryAddress: '',
  deliveryCity: '',
  deliveryZip: '',
  deliveryCountry: '',
  deliveryDate: '',
  deliveryNotes: '',
  orderPlaced: false,
}

export const TOTAL_STEPS = 9

export const useBuilderStore = create<BuilderStore>()(
  persist(
    (set, get) => ({
      state: { ...initialState },
      savedDesigns: [],
      
      setState: (partial) => set(s => ({ state: { ...s.state, ...partial } })),
      
      setStep: (step) => set(s => ({ state: { ...s.state, currentStep: step } })),
      
      nextStep: () => set(s => ({
        state: { ...s.state, currentStep: Math.min(s.state.currentStep + 1, TOTAL_STEPS - 1) }
      })),
      
      prevStep: () => set(s => ({
        state: { ...s.state, currentStep: Math.max(s.state.currentStep - 1, 0) }
      })),
      
      addItem: (item) => set(s => {
        const maxItems = PRICE_CONFIG.BOX_SIZES[s.state.boxSize].maxItems
        if (s.state.selectedItems.length >= maxItems) return s
        if (s.state.selectedItems.find(i => i.id === item.id)) return s
        return { state: { ...s.state, selectedItems: [...s.state.selectedItems, item] } }
      }),
      
      removeItem: (itemId) => set(s => ({
        state: { ...s.state, selectedItems: s.state.selectedItems.filter(i => i.id !== itemId) }
      })),
      
      resetBuilder: () => set({ state: { ...initialState } }),
      
      saveDesign: (name) => {
        const id = generateId()
        const design: SavedDesign = {
          id,
          name: name || `Gift Box ${new Date().toLocaleDateString()}`,
          savedAt: new Date().toISOString(),
          state: { ...get().state },
        }
        set(s => ({ savedDesigns: [...s.savedDesigns, design] }))
        return id
      },
      
      loadDesign: (id) => {
        const design = get().savedDesigns.find(d => d.id === id)
        if (design) {
          set({ state: { ...design.state } })
        }
      },
      
      deleteDesign: (id) => set(s => ({
        savedDesigns: s.savedDesigns.filter(d => d.id !== id)
      })),
      
      renameDesign: (id, name) => set(s => ({
        savedDesigns: s.savedDesigns.map(d => d.id === id ? { ...d, name } : d)
      })),
      
      duplicateDesign: (id) => {
        const design = get().savedDesigns.find(d => d.id === id)
        if (design) {
          const newDesign: SavedDesign = {
            ...design,
            id: generateId(),
            name: `${design.name} (Copy)`,
            savedAt: new Date().toISOString(),
          }
          set(s => ({ savedDesigns: [...s.savedDesigns, newDesign] }))
        }
      },
      
      getTotalPrice: () => {
        const { state } = get()
        const boxPrice = PRICE_CONFIG.BOX_SIZES[state.boxSize].basePrice
        const itemsPrice = state.selectedItems.reduce((sum, item) => sum + item.price, 0)
        const packagingMultiplier = PRICE_CONFIG.PACKAGING[state.packagingStyle].multiplier
        const cardPrice = state.includeCard ? PRICE_CONFIG.CARD_PRICE : 0
        return Math.round((boxPrice + itemsPrice) * packagingMultiplier + cardPrice)
      },
    }),
    {
      name: STORAGE_KEYS.SAVED_DESIGNS,
      partialize: (state) => ({ savedDesigns: state.savedDesigns }),
    }
  )
)
