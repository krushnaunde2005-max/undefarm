import { Product, Enquiry, GalleryImage } from "./types";

// ============================================================
// DEFAULT PRODUCT DATA
// ============================================================
export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Fresh Sitafal",
    description:
      "Naturally grown custard apples from our Karjule Harya farm. Freshly harvested, sweet and aromatic. Perfect for daily consumption.",
    price: 80,
    unit: "per kg",
    stock: 100,
    stockUnit: "kg",
    image: "/sitafal_product.png",
    badge: "Farm Fresh",
    isAvailable: true,
    features: ["Freshly Harvested", "Natural Farming", "Sweet & Aromatic"],
  },
  {
    id: "2",
    name: "Premium Sitafal",
    description:
      "Handpicked, large-sized premium custard apples. Selected for their size, sweetness and perfect ripeness. Ideal for gifting.",
    price: 120,
    unit: "per kg",
    stock: 50,
    stockUnit: "kg",
    image: "/sitafal_hero.png",
    badge: "Best Seller",
    isAvailable: true,
    features: ["Handpicked Selection", "Large Size", "Gift Ready"],
  },
  {
    id: "3",
    name: "Selected Quality Sitafal",
    description:
      "Carefully selected Sitafal with consistent quality. Each fruit is checked for ripeness and sweetness before packing.",
    price: 100,
    unit: "per kg",
    stock: 75,
    stockUnit: "kg",
    image: "/sitafal_product.png",
    badge: "Quality Pick",
    isAvailable: true,
    features: ["Quality Checked", "Consistent Sweetness", "Family Pack"],
  },
  {
    id: "4",
    name: "Wholesale Sitafal",
    description:
      "Bulk orders for retailers, juice shops and businesses. Fresh farm-to-market Sitafal at wholesale rates. Minimum order applies.",
    price: 60,
    unit: "per kg",
    stock: 500,
    stockUnit: "kg",
    image: "/sitafal_packaging.png",
    badge: "Wholesale",
    isAvailable: true,
    features: ["Bulk Pricing", "Direct from Farm", "Retailer Friendly"],
  },
];

// ============================================================
// localStorage Data Layer
// ============================================================
const PRODUCTS_KEY = "undeFarm_products";
const ENQUIRIES_KEY = "undeFarm_enquiries";

export const getProducts = (): Product[] => {
  if (typeof window === "undefined") return DEFAULT_PRODUCTS;
  try {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_PRODUCTS;
  } catch {
    return DEFAULT_PRODUCTS;
  }
};

export const saveProducts = (products: Product[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const getEnquiries = (): Enquiry[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(ENQUIRIES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveEnquiry = (enquiry: Omit<Enquiry, "id" | "createdAt" | "status">): void => {
  if (typeof window === "undefined") return;
  const enquiries = getEnquiries();
  const newEnquiry: Enquiry = {
    ...enquiry,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: "new",
  };
  localStorage.setItem(ENQUIRIES_KEY, JSON.stringify([newEnquiry, ...enquiries]));
};

export const updateEnquiryStatus = (id: string, status: Enquiry["status"]): void => {
  if (typeof window === "undefined") return;
  const enquiries = getEnquiries();
  const updated = enquiries.map((e) => (e.id === id ? { ...e, status } : e));
  localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(updated));
};

// ============================================================
// GALLERY DATA
// ============================================================
export const GALLERY_IMAGES: GalleryImage[] = [
  { id: "g1", src: "/sitafal_hero.png", alt: "Fresh Sitafal fruits", category: "fruits", caption: "Fresh Sitafal from Unde Farm" },
  { id: "g2", src: "/sitafal_product.png", alt: "Premium Sitafal", category: "fruits", caption: "Premium quality custard apples" },
  { id: "g3", src: "/farm_landscape.png", alt: "Unde Farm orchard", category: "farm", caption: "Our Sitafal orchard in Karjule Harya" },
  { id: "g4", src: "/sitafal_tree.png", alt: "Sitafal growing on tree", category: "fruits", caption: "Fruits growing on our farm trees" },
  { id: "g5", src: "/harvest_scene.png", alt: "Harvest time at Unde Farm", category: "harvest", caption: "Careful harvest for best quality" },
  { id: "g6", src: "/sitafal_packaging.png", alt: "Sitafal packaging", category: "packaging", caption: "Ready for delivery" },
  { id: "g7", src: "/farm_landscape.png", alt: "Farm view", category: "farm", caption: "Beautiful farm landscape" },
  { id: "g8", src: "/sitafal_tree.png", alt: "Sitafal trees", category: "farm", caption: "Healthy custard apple trees" },
];
