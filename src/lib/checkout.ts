import { products } from "@/data/products";

export const CHECKOUT_ORDER_STORAGE_KEY = "cosmic-last-order";
export const CHECKOUT_ORDER_HISTORY_STORAGE_KEY = "cosmic-order-history";

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

export const readOrderHistory = (rawValue: string | null): CheckoutOrderSnapshot[] => {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue) as CheckoutOrderSnapshot[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (order) =>
        order &&
        typeof order.orderNumber === "string" &&
        typeof order.email === "string" &&
        typeof order.customerName === "string" &&
        typeof order.createdAt === "string" &&
        typeof order.subtotal === "number" &&
        typeof order.total === "number" &&
        (order.paymentMethod === "card" || order.paymentMethod === "paypal") &&
        Array.isArray(order.items),
    );
  } catch {
    return [];
  }
};

export const upsertOrderHistory = (orders: CheckoutOrderSnapshot[], nextOrder: CheckoutOrderSnapshot) => {
  const merged = [nextOrder, ...orders.filter((order) => order.orderNumber !== nextOrder.orderNumber)];
  return merged.sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());
};

export const getSuggestedProducts = (excludeIds: string[], limit = 3) =>
  products.filter((product) => !excludeIds.includes(product.id)).slice(0, limit);
