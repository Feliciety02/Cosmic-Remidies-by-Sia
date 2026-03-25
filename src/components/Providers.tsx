"use client";

import type { ReactNode } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { CartProvider } from "@/contexts/CartContext";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => (
  <CartProvider>
    {children}
    <Sonner />
  </CartProvider>
);

export default Providers;
