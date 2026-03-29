"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import TrustBar from "@/components/TrustBar";

const CartPageClient = () => {
  const { items, isHydrated, removeItem, updateQty, totalPrice } = useCart();

  if (!isHydrated) {
    return <div className="py-20 text-center text-muted-foreground">Loading your cart...</div>;
  }

  return (
    <>
      {items.length === 0 ? (
        <div className="py-20 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-stone-800/10 bg-white/60 shadow-sm">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <p className="mb-6 text-lg text-muted-foreground">Your cart is empty.</p>
          <Button asChild size="lg" className="px-8">
            <Link href="/shop">Browse Guides</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-2xl border border-white/70 bg-white/72 p-4 shadow-[0_18px_50px_rgba(61,40,22,0.07)] backdrop-blur-sm"
              >
                <div className="overflow-hidden rounded-xl border border-stone-800/8 bg-stone-50">
                  <Image src={item.image} alt={item.title} className="h-24 w-20 object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-semibold text-stone-800">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">PDF Guide | Instant Delivery</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-xl border border-stone-800/10 bg-white/80">
                      <button
                        type="button"
                        className="rounded-l-xl p-2 transition-colors hover:bg-secondary"
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        aria-label={`Decrease quantity for ${item.title}`}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="px-2 text-sm font-medium">{item.qty}</span>
                      <button
                        type="button"
                        className="rounded-r-xl p-2 transition-colors hover:bg-secondary"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        aria-label={`Increase quantity for ${item.title}`}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="text-lg font-bold text-stone-800">${item.price * item.qty}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="self-start rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-stone-100 hover:text-destructive"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.title} from cart`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <TrustBar />

          <div className="mt-6 rounded-2xl border border-white/70 bg-white/78 p-6 shadow-[0_18px_50px_rgba(61,40,22,0.07)] backdrop-blur-sm">
            <div className="mb-2 flex justify-between text-[15px]">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-stone-800">${totalPrice}</span>
            </div>
            <div className="mb-4 flex justify-between text-[15px]">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-medium text-primary">Instant (Free)</span>
            </div>
            <div className="flex justify-between border-t border-stone-800/10 pt-4 text-xl font-bold text-stone-800">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
            <Button asChild type="button" size="lg" className="mt-6 w-full text-base">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Secure checkout flow with instant digital delivery.
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default CartPageClient;
