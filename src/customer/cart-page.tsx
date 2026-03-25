import type { Metadata } from "next";
import CartPageClient from "@/components/CartPageClient";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Your Cart",
  description: "Review the spiritual guides in your cart before checkout.",
  path: "/cart",
  noIndex: true,
});

const CartPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-8 font-display text-2xl font-bold md:text-3xl">Your Cart</h1>
      <CartPageClient />
    </div>
    <Footer />
  </div>
);

export default CartPage;
