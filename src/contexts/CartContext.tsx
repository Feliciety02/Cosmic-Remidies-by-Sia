"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/products";
import { toast } from "sonner";

interface CartItem extends Product {
  qty: number;
}

interface CartEntry {
  id: string;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  isHydrated: boolean;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = "cosmic-cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [entries, setEntries] = useState<CartEntry[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartEntry[];
        const validEntries = parsed.filter(
          (entry) => entry && typeof entry.id === "string" && typeof entry.qty === "number" && entry.qty > 0,
        );

        setEntries((current) => (current.length > 0 ? current : validEntries));
      }
    } catch {
      setEntries([]);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries, isHydrated]);

  const items = entries.flatMap((entry) => {
    const product = products.find((item) => item.id === entry.id);
    return product ? [{ ...product, qty: entry.qty }] : [];
  });

  const addItem = (product: Product) => {
    setEntries((prev) => {
      const existing = prev.find((entry) => entry.id === product.id);
      if (existing) {
        toast.info(`${product.title} is already in your cart`);
        return prev;
      }

      toast.success(`Added "${product.title}" to cart`);
      return [...prev, { id: product.id, qty: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    toast.success("Item removed from cart");
  };

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) {
      return removeItem(id);
    }

    setEntries((prev) => prev.map((entry) => (entry.id === id ? { ...entry, qty } : entry)));
  };

  const clearCart = () => setEntries([]);

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart, isHydrated, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
