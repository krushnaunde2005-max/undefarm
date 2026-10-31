// Site-wide configuration — change WhatsApp number and other details here
export const SITE_CONFIG = {
  businessName: "Unde Farm",
  tagline: "Nature's Sweetness, Straight From Our Farm.",
  description: "Fresh Sitafal Grown With Care in Karjule Harya, Maharashtra.",

  // Contact
  whatsappPrimary: "917710947898", // Country code + number (no spaces/dashes)
  whatsappSecondary: "919702554471",
  phone1: "7710947898",
  phone2: "9702554471",

  // Address
  village: "Karjule Harya",
  taluka: "Parner",
  district: "Ahilyanagar",
  state: "Maharashtra",
  country: "India",

  // WhatsApp order message (pre-filled)
  whatsappMessage:
    "Hello Unde Farm, I am interested in purchasing fresh Sitafal. Please share product details, price and availability.",

  // Admin
  adminUsername: "undeFarmAdmin",
  adminPasswordEnv: "ADMIN_PASSWORD", // Reads from process.env.ADMIN_PASSWORD
};

export const getWhatsAppLink = (number: string, message?: string) => {
  const msg = encodeURIComponent(message || SITE_CONFIG.whatsappMessage);
  return `https://wa.me/${number}?text=${msg}`;
};

export const WHATSAPP_LINK = getWhatsAppLink(SITE_CONFIG.whatsappPrimary);
