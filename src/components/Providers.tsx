"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => (
  <SessionProvider>
    <AuthProvider>
      <CartProvider>
        {children}
        <Sonner />
      </CartProvider>
    </AuthProvider>
  </SessionProvider>
);

export default Providers;
