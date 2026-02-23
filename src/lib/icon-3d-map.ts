/**
 * Maps catalog item IDs to their 3D icon PNG images.
 * Vite resolves these imports at build time to hashed asset URLs.
 */
import chocolateBox from '@/assets/icons3d/chocolate-box.png'
import chocolateTruffle from '@/assets/icons3d/chocolate-truffle.png'
import cookieSet from '@/assets/icons3d/cookie-set.png'
import scentedCandle from '@/assets/icons3d/scented-candle.png'
import flowerBouquet from '@/assets/icons3d/flower-bouquet.png'
import perfumeBottle from '@/assets/icons3d/perfume-bottle.png'
import silkScarf from '@/assets/icons3d/silk-scarf.png'
import keychain from '@/assets/icons3d/keychain.png'
import jewelryBox from '@/assets/icons3d/jewelry-box.png'
import bathBomb from '@/assets/icons3d/bath-bomb.png'
import handCream from '@/assets/icons3d/hand-cream.png'
import teaSet from '@/assets/icons3d/tea-set.png'
import coffeeMug from '@/assets/icons3d/coffee-mug.png'
import notebookJournal from '@/assets/icons3d/notebook-journal.png'
import artSupplies from '@/assets/icons3d/art-supplies.png'
import bookmarkSet from '@/assets/icons3d/bookmark-set.png'
import deskOrganizer from '@/assets/icons3d/desk-organizer.png'
import musicBox from '@/assets/icons3d/music-box.png'
import plantPot from '@/assets/icons3d/plant-pot.png'
import photoFrame from '@/assets/icons3d/photo-frame.png'
import snowGlobe from '@/assets/icons3d/snow-globe.png'
import sunglasses from '@/assets/icons3d/sunglasses.png'
import teddyBear from '@/assets/icons3d/teddy-bear.png'
import wineBottle from '@/assets/icons3d/wine-bottle.png'
import wristWatch from '@/assets/icons3d/wrist-watch.png'

/** Map catalog item ID → 3D icon PNG URL */
export const ICON_3D_MAP: Record<string, string> = {
  // Sweets & Treats
  'choc-truffle-box': chocolateTruffle,
  'macaron-set': cookieSet,
  'honey-jar': wineBottle,            // glass jar shape
  'cookie-tin': chocolateBox,          // box of treats

  // Home & Ambiance
  'soy-candle': scentedCandle,
  'reed-diffuser': flowerBouquet,
  'essential-oils': perfumeBottle,

  // Fashion & Accessories
  'silk-scarf': silkScarf,
  'leather-keychain': keychain,
  'jewelry-box': jewelryBox,

  // Bath & Body
  'bath-bomb-set': bathBomb,
  'face-mask-set': sunglasses,         // beauty/glam
  'hand-cream': handCream,

  // Beverages
  'tea-collection': teaSet,
  'coffee-beans': coffeeMug,
  'hot-chocolate': coffeeMug,

  // Stationery
  'journal': notebookJournal,
  'pen-set': artSupplies,
  'bookmark-set': bookmarkSet,

  // Tech Gadgets
  'wireless-charger': deskOrganizer,
  'bluetooth-speaker': musicBox,
  'phone-stand': wristWatch,           // tech accessory

  // Home & Living
  'succulent': plantPot,
  'coaster-set': snowGlobe,            // decorative object
  'photo-frame': photoFrame,
  'throw-blanket': teddyBear,          // cozy/soft
}

/** Get 3D icon URL by item ID, returns undefined if not mapped. */
export function get3DIcon(itemId: string): string | undefined {
  return ICON_3D_MAP[itemId]
}
