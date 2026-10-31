export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string; // e.g. "per kg", "per dozen"
  stock: number;
  stockUnit: string; // e.g. "kg", "dozen"
  image: string;
  badge?: string; // "Best Seller", "Premium", etc.
  isAvailable: boolean;
  features: string[];
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  type: "general" | "wholesale" | "order";
  createdAt: string;
  status: "new" | "read" | "replied";
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "farm" | "fruits" | "harvest" | "packaging" | "village";
  caption?: string;
}

export interface FarmingStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface SiteSettings {
  whatsappPrimary: string;
  whatsappSecondary: string;
  phone1: string;
  phone2: string;
  adminPassword: string;
}
