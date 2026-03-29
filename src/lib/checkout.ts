import { products } from "@/data/products";

export const CHECKOUT_ORDER_STORAGE_KEY = "cosmic-last-order";

export interface CheckoutOrderItem {
  id: string;
  title: string;
  price: number;
  qty: number;
}

export interface CheckoutOrderSnapshot {
  orderNumber: string;
  email: string;
  customerName: string;
  createdAt: string;
  subtotal: number;
  total: number;
  paymentMethod: "card" | "paypal";
  items: CheckoutOrderItem[];
}

export const buildOrderNumber = () => `CR-${Math.floor(100000 + Math.random() * 900000)}`;

export const getSuggestedProducts = (excludeIds: string[], limit = 3) =>
  products.filter((product) => !excludeIds.includes(product.id)).slice(0, limit);
