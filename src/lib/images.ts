/**
 * UNDE FARM – Image Registry
 * ─────────────────────────────────────────────────────────
 * All image paths are centralised here for easy updates.
 *
 * OWN FARM PHOTOS  → /images/own-farm/   (your real photos)
 * GENERATED IMAGES → /                   (AI-generated fallbacks)
 *
 * To add more of your own photos:
 *   1. Drop them in:  public/images/own-farm/
 *   2. Add an entry below with the correct filename.
 *   3. Reference it in any component via OWN_PHOTOS or SITE_IMAGES.
 */

/** ── Your real Unde Farm photographs ─────────────────── */
export const OWN_PHOTOS = {
  /** Wide panoramic view of Unde Farm rows with drip irrigation — Karjule Harya */
  farmWideView: "/images/own-farm/farm-wide-view.png",

  /** Close-up of lush sitafal tree rows between earthen paths */
  sitafalTreeRows: "/images/own-farm/sitafal-tree-rows.png",

  /** Hand holding a freshly harvested sitafal fruit from the farm */
  freshSitafalHand: "/images/own-farm/fresh-sitafal-hand.png",
} as const;

/** ── AI-generated / stock fallback images ────────────── */
export const GEN_PHOTOS = {
  heroFruits:    "/sitafal_hero.png",
  productSingle: "/sitafal_product.png",
  farmLandscape: "/farm_landscape.png",
  sitafalTree:   "/sitafal_tree.png",
  harvestScene:  "/harvest_scene.png",
  packaging:     "/sitafal_packaging.png",
} as const;

/** ── Merged image map used across the site ───────────── */
export const SITE_IMAGES = {
  // Hero section – main large fruit (real photo)
  heroMain:         OWN_PHOTOS.freshSitafalHand,
  // Hero background floating fruits – keep generated (transparent effect needed)
  heroFloat:        GEN_PHOTOS.productSingle,

  // About section – farm landscape (real photo takes priority)
  aboutFarm:        OWN_PHOTOS.farmWideView,

  // Products
  productFresh:     OWN_PHOTOS.freshSitafalHand,
  productPremium:   GEN_PHOTOS.heroFruits,
  productSelected:  OWN_PHOTOS.freshSitafalHand,
  productWholesale: GEN_PHOTOS.packaging,

  // Farming Process steps
  stepPlantation:   OWN_PHOTOS.farmWideView,
  stepGrowing:      OWN_PHOTOS.sitafalTreeRows,
  stepFarmCare:     OWN_PHOTOS.sitafalTreeRows,
  stepHarvesting:   OWN_PHOTOS.freshSitafalHand,
  stepQuality:      GEN_PHOTOS.heroFruits,
  stepPackaging:    GEN_PHOTOS.packaging,
} as const;

/** ── Gallery image list (all own photos listed first) ── */
export const GALLERY_DATA = [
  {
    id: "own-1",
    src: OWN_PHOTOS.freshSitafalHand,
    alt: "Fresh Sitafal hand-picked at Unde Farm",
    category: "fruits" as const,
    caption: "Freshly harvested Sitafal from Unde Farm, Karjule Harya",
    isOwn: true,
  },
  {
    id: "own-2",
    src: OWN_PHOTOS.farmWideView,
    alt: "Unde Farm wide view – Karjule Harya, Parner",
    category: "farm" as const,
    caption: "Our Sitafal orchard in Karjule Harya with drip irrigation",
    isOwn: true,
  },
  {
    id: "own-3",
    src: OWN_PHOTOS.sitafalTreeRows,
    alt: "Sitafal tree rows at Unde Farm",
    category: "farm" as const,
    caption: "Healthy Sitafal trees growing in organised rows",
    isOwn: true,
  },
  // Generated/stock supplements
  {
    id: "gen-1",
    src: GEN_PHOTOS.heroFruits,
    alt: "Fresh Sitafal fruits – premium quality",
    category: "fruits" as const,
    caption: "Premium quality Sitafal from our farm",
    isOwn: false,
  },
  {
    id: "gen-2",
    src: GEN_PHOTOS.farmLandscape,
    alt: "Sitafal orchard landscape",
    category: "farm" as const,
    caption: "Beautiful farm landscape",
    isOwn: false,
  },
  {
    id: "gen-3",
    src: GEN_PHOTOS.sitafalTree,
    alt: "Sitafal tree with fruits",
    category: "fruits" as const,
    caption: "Fruits growing on the tree",
    isOwn: false,
  },
  {
    id: "gen-4",
    src: GEN_PHOTOS.harvestScene,
    alt: "Harvest time at the farm",
    category: "harvest" as const,
    caption: "Careful hand-harvesting for best quality",
    isOwn: false,
  },
  {
    id: "gen-5",
    src: GEN_PHOTOS.packaging,
    alt: "Sitafal packaging",
    category: "packaging" as const,
    caption: "Packed and ready for delivery",
    isOwn: false,
  },
  {
    id: "own-2b",
    src: OWN_PHOTOS.farmWideView,
    alt: "Unde Farm – morning view",
    category: "farm" as const,
    caption: "Morning light over Unde Farm, Karjule Harya",
    isOwn: true,
  },
  {
    id: "own-3b",
    src: OWN_PHOTOS.sitafalTreeRows,
    alt: "Sitafal plantation rows",
    category: "farm" as const,
    caption: "Well-maintained tree rows in our orchard",
    isOwn: true,
  },
] as const;
