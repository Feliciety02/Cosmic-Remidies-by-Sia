import type { Metadata } from "next";
import CheckoutPageClient from "@/components/CheckoutPageClient";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Checkout",
  description: "Complete your guide purchase and confirm your delivery details.",
  path: "/checkout",
  noIndex: true,
});

const CheckoutPage = () => (
  <div className="min-h-screen bg-transparent">
    <Navbar />
    <main className="container mx-auto px-4 py-10 md:py-14">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Checkout</p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-800 md:text-4xl">
          Complete your order
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Review your guides, confirm your details, and place the order in one streamlined flow.
        </p>
      </div>
      <CheckoutPageClient />
    </main>
    <Footer />
  </div>
);

export default CheckoutPage;
