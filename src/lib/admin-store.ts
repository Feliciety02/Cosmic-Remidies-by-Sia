import { products as storefrontProducts, testimonials as storefrontTestimonials } from "@/data/products";
import type { EditableProduct } from "@/components/admin/ProductModal";
import type { CheckoutOrderSnapshot } from "@/lib/checkout";
import { siteConfig } from "@/lib/site";

export interface AdminDiscountCode {
  id: number;
  code: string;
  type: "percentage" | "fixed";
  amount: number;
  appliesTo: "all" | "specific";
  productIds: number[];
  usageLimit: number;
  expiryDate: string;
  status: "Active" | "Draft" | "Expired";
  redemptions: number;
}

export interface AdminBundleOffer {
  id: number;
  title: string;
  slug: string;
  productIds: number[];
  bundlePrice: number;
  compareAtPrice: number;
  status: "Active" | "Draft" | "Hidden";
  description: string;
}

export interface AdminTestimonial {
  name: string;
  text: string;
  rating: number;
  location?: string;
}

export interface AdminTrustBarItem {
  label: string;
  sub: string;
}

export interface AdminStoreSettings {
  paymentProviders: {
    paddleEnabled: boolean;
    paypalEnabled: boolean;
  };
  taxAndCurrency: {
    currency: "usd" | "eur" | "inr" | "gbp";
    autoTax: boolean;
  };
  general: {
    storeName: string;
    contactEmail: string;
    storeUrl: string;
    timezone: "ist" | "est" | "pst";
  };
  branding: {
    logoFileName: string;
    primaryColor: string;
    accentColor: string;
  };
}

export interface AdminUserRecord {
  name: string;
  email: string;
  role: string;
  status: "Active" | "Invited";
}

export interface AdminOrderEvent {
  event: string;
  date: string;
  icon: string;
}

export interface AdminOrderRecord {
  id: string;
  slug: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  items: { name: string; qty: number; price: string }[];
  subtotal: string;
  tax: string;
  total: string;
  status: string;
  payment: string;
  paymentId: string;
  date: string;
  timeline: AdminOrderEvent[];
}

export const ADMIN_PRODUCTS_STORAGE_KEY = "cosmic-admin-products";
export const ADMIN_DISCOUNTS_STORAGE_KEY = "cosmic-admin-discounts";
export const ADMIN_BUNDLES_STORAGE_KEY = "cosmic-admin-bundles";
export const ADMIN_ORDERS_STORAGE_KEY = "cosmic-admin-orders";
export const ADMIN_TESTIMONIALS_STORAGE_KEY = "cosmic-admin-testimonials";
export const ADMIN_TRUST_BAR_STORAGE_KEY = "cosmic-admin-trust-bar";
export const ADMIN_SETTINGS_STORAGE_KEY = "cosmic-admin-settings";
export const ADMIN_USERS_STORAGE_KEY = "cosmic-admin-users";

const mapBadgeToAdminLabel = (badge?: string) => {
  switch (badge) {
    case "Bestseller":
      return "Best Seller";
    case "Popular":
      return "Featured";
    case "Seasonal":
      return "New";
    default:
      return badge ?? null;
  }
};

export const createInitialAdminProducts = (): EditableProduct[] =>
  storefrontProducts.map((product, index) => {
    const visibility: EditableProduct["visibility"] = index < 14 ? "Active" : index < 18 ? "Draft" : "Hidden";
    const labels = [mapBadgeToAdminLabel(product.badge), index < 6 ? "Featured" : null].filter(Boolean) as string[];

    return {
      id: index + 1,
      title: product.title,
      slug: product.id,
      price: product.price,
      compareAtPrice: product.originalPrice ?? null,
      category: product.category,
      status: visibility,
      visibility,
      description: product.description,
      coverAsset: `${product.id}-cover.webp`,
      pdfAsset: `${product.id}.pdf`,
      labels,
      featured: index < 6,
      downloads: Math.max(18, 420 - index * 17),
      sales: Math.max(9, 160 - index * 6),
    };
  });

export const initialDiscounts: AdminDiscountCode[] = [
  {
    id: 1,
    code: "WELCOME10",
    type: "percentage",
    amount: 10,
    appliesTo: "all",
    productIds: [],
    usageLimit: 500,
    expiryDate: "2026-12-31",
    status: "Active",
    redemptions: 82,
  },
  {
    id: 2,
    code: "BUNDLE20",
    type: "fixed",
    amount: 20,
    appliesTo: "specific",
    productIds: [2],
    usageLimit: 100,
    expiryDate: "2026-06-30",
    status: "Draft",
    redemptions: 0,
  },
];

export const initialBundles: AdminBundleOffer[] = [
  {
    id: 1,
    title: "Healing Starter Bundle",
    slug: "healing-starter-bundle",
    productIds: [2, 5],
    bundlePrice: 99,
    compareAtPrice: 124,
    status: "Active",
    description: "Combine the core healing guides into one higher-value starter offer.",
  },
  {
    id: 2,
    title: "Mindfulness Essentials Pack",
    slug: "mindfulness-essentials-pack",
    productIds: [3, 4],
    bundlePrice: 69,
    compareAtPrice: 84,
    status: "Draft",
    description: "Draft bundle for meditation and numerology buyers.",
  },
];

export const initialTestimonials: AdminTestimonial[] = storefrontTestimonials.map((testimonial) => ({
  name: testimonial.name,
  text: testimonial.text,
  rating: testimonial.rating,
  location: testimonial.location,
}));

export const initialTrustBarItems: AdminTrustBarItem[] = [
  { label: "4.9/5 Rating", sub: "500+ reviews" },
  { label: "10,000+", sub: "Downloads" },
  { label: "100%", sub: "Money-back guarantee" },
  { label: "Instant", sub: "Digital delivery" },
];

export const initialSettings: AdminStoreSettings = {
  paymentProviders: {
    paddleEnabled: true,
    paypalEnabled: false,
  },
  taxAndCurrency: {
    currency: "usd",
    autoTax: false,
  },
  general: {
    storeName: siteConfig.name,
    contactEmail: siteConfig.supportEmail,
    storeUrl: siteConfig.storeUrl,
    timezone: "ist",
  },
  branding: {
    logoFileName: "brandmark-v2.svg",
    primaryColor: "#8b6440",
    accentColor: "#caa16f",
  },
};

export const initialAdminUsers: AdminUserRecord[] = [
  { name: "Sia", email: "sia@cosmicremediesbysia.com", role: "Owner", status: "Active" },
  { name: "Assistant", email: "assistant@cosmicremediesbysia.com", role: "Editor", status: "Active" },
];

export const initialAdminOrders: AdminOrderRecord[] = [
  {
    id: "#CR-1042",
    slug: "CR-1042",
    customer: "Priya Sharma",
    email: "priya@email.com",
    phone: "+91 98765 43210",
    address: "Mumbai, Maharashtra, India",
    items: [{ name: "Vedic Astrology Guide", qty: 1, price: "$49.99" }],
    subtotal: "$49.99",
    tax: "$0.00",
    total: "$49.99",
    status: "Completed",
    payment: "Paddle",
    paymentId: "txn_3a8f2k9x",
    date: "Mar 24, 2026",
    timeline: [
      { event: "Order placed", date: "Mar 24, 10:23 AM", icon: "cart" },
      { event: "Payment confirmed", date: "Mar 24, 10:24 AM", icon: "payment" },
      { event: "PDF delivered via email", date: "Mar 24, 10:25 AM", icon: "delivered" },
      { event: "Download link accessed", date: "Mar 24, 11:02 AM", icon: "download" },
    ],
  },
  {
    id: "#CR-1041",
    slug: "CR-1041",
    customer: "Amit Patel",
    email: "amit@email.com",
    phone: "+91 91234 56789",
    address: "Ahmedabad, Gujarat, India",
    items: [{ name: "Cosmic Healing Bundle", qty: 1, price: "$89.99" }],
    subtotal: "$89.99",
    tax: "$0.00",
    total: "$89.99",
    status: "Completed",
    payment: "PayPal",
    paymentId: "pp_9x2k4m1b",
    date: "Mar 24, 2026",
    timeline: [
      { event: "Order placed", date: "Mar 24, 09:15 AM", icon: "cart" },
      { event: "Payment confirmed", date: "Mar 24, 09:16 AM", icon: "payment" },
      { event: "PDF delivered via email", date: "Mar 24, 09:17 AM", icon: "delivered" },
    ],
  },
  {
    id: "#CR-1040",
    slug: "CR-1040",
    customer: "Sarah Johnson",
    email: "sarah@email.com",
    phone: "+1 555 234 5678",
    address: "Austin, TX, USA",
    items: [{ name: "Chakra Meditation PDF", qty: 1, price: "$24.99" }],
    subtotal: "$24.99",
    tax: "$0.00",
    total: "$24.99",
    status: "Pending",
    payment: "Paddle",
    paymentId: "txn_7b3d5f2a",
    date: "Mar 23, 2026",
    timeline: [
      { event: "Order placed", date: "Mar 23, 03:45 PM", icon: "cart" },
      { event: "Awaiting payment confirmation", date: "Mar 23, 03:45 PM", icon: "pending" },
    ],
  },
  {
    id: "#CR-1039",
    slug: "CR-1039",
    customer: "Ravi Kumar",
    email: "ravi@email.com",
    phone: "+91 90123 45678",
    address: "Delhi, India",
    items: [{ name: "Numerology Masterclass", qty: 1, price: "$59.99" }],
    subtotal: "$59.99",
    tax: "$0.00",
    total: "$59.99",
    status: "Completed",
    payment: "Paddle",
    paymentId: "txn_6a3x4n2q",
    date: "Mar 23, 2026",
    timeline: [
      { event: "Order placed", date: "Mar 23, 01:12 PM", icon: "cart" },
      { event: "Payment confirmed", date: "Mar 23, 01:13 PM", icon: "payment" },
      { event: "PDF delivered via email", date: "Mar 23, 01:14 PM", icon: "delivered" },
    ],
  },
  {
    id: "#CR-1038",
    slug: "CR-1038",
    customer: "Maya Chen",
    email: "maya@email.com",
    phone: "+1 555 876 5432",
    address: "San Francisco, CA, USA",
    items: [{ name: "Crystal Healing Guide", qty: 1, price: "$34.99" }],
    subtotal: "$34.99",
    tax: "$0.00",
    total: "$34.99",
    status: "Refunded",
    payment: "PayPal",
    paymentId: "pp_4n8m2x1c",
    date: "Mar 22, 2026",
    timeline: [
      { event: "Order placed", date: "Mar 22, 11:30 AM", icon: "cart" },
      { event: "Payment confirmed", date: "Mar 22, 11:31 AM", icon: "payment" },
      { event: "PDF delivered via email", date: "Mar 22, 11:32 AM", icon: "delivered" },
      { event: "Refund requested", date: "Mar 22, 04:15 PM", icon: "refund" },
      { event: "Refund processed", date: "Mar 23, 09:00 AM", icon: "refund-done" },
    ],
  },
];

const parseStoredValue = <T,>(rawValue: string | null, fallback: T): T => {
  if (!rawValue) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
};

const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));

const checkoutOrderToAdminOrder = (order: CheckoutOrderSnapshot): AdminOrderRecord => {
  const payment = order.paymentMethod === "paypal" ? "PayPal" : "Paddle";

  return {
    id: `#${order.orderNumber}`,
    slug: order.orderNumber,
    customer: order.customerName,
    email: order.email,
    phone: "Not provided",
    address: "Saved during checkout",
    items: order.items.map((item) => ({
      name: item.title,
      qty: item.qty,
      price: formatCurrency(item.price),
    })),
    subtotal: formatCurrency(order.subtotal),
    tax: "$0.00",
    total: formatCurrency(order.total),
    status: "Completed",
    payment,
    paymentId: `${payment === "PayPal" ? "pp" : "txn"}_${order.orderNumber.toLowerCase()}`,
    date: formatDate(order.createdAt),
    timeline: [
      { event: "Order placed", date: formatDateTime(order.createdAt), icon: "cart" },
      { event: "Payment confirmed", date: formatDateTime(order.createdAt), icon: "payment" },
      { event: "PDF delivered via email", date: formatDateTime(order.createdAt), icon: "delivered" },
    ],
  };
};

export const mergeAdminOrders = (checkoutOrders: CheckoutOrderSnapshot[]) => {
  const checkoutMapped = checkoutOrders.map(checkoutOrderToAdminOrder);
  const merged = [...checkoutMapped, ...initialAdminOrders.filter((order) => !checkoutMapped.some((item) => item.slug === order.slug))];
  return merged.sort((left, right) => right.slug.localeCompare(left.slug));
};

export const readAdminProducts = (rawValue: string | null) => parseStoredValue(rawValue, createInitialAdminProducts());
export const readAdminDiscounts = (rawValue: string | null) => parseStoredValue(rawValue, initialDiscounts);
export const readAdminBundles = (rawValue: string | null) => parseStoredValue(rawValue, initialBundles);
export const readAdminTestimonials = (rawValue: string | null) => parseStoredValue(rawValue, initialTestimonials);
export const readAdminTrustBarItems = (rawValue: string | null) => parseStoredValue(rawValue, initialTrustBarItems);
export const readAdminSettings = (rawValue: string | null) => parseStoredValue(rawValue, initialSettings);
export const readAdminUsers = (rawValue: string | null) => parseStoredValue(rawValue, initialAdminUsers);
export const readAdminOrders = (rawValue: string | null, checkoutOrders: CheckoutOrderSnapshot[] = []) => {
  const storedOrders = parseStoredValue<AdminOrderRecord[]>(rawValue, []);
  const mergedDefaults = mergeAdminOrders(checkoutOrders);
  const mergedOrders = [...storedOrders, ...mergedDefaults.filter((order) => !storedOrders.some((item) => item.slug === order.slug))];
  return mergedOrders.sort((left, right) => right.slug.localeCompare(left.slug));
};
