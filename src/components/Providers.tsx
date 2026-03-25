"use client";

import type { ReactNode } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => (
  <AuthProvider>
    <CartProvider>
      {children}
      <Sonner />
    </CartProvider>
  </AuthProvider>
);

export default Providers;
