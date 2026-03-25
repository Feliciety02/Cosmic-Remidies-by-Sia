"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
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
          <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <p className="mb-6 text-lg text-muted-foreground">Your cart is empty.</p>
          <Button asChild size="lg">
            <Link href="/shop">Browse Guides</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-8 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-lg border bg-card p-4">
                <Image src={item.image} alt={item.title} className="h-24 w-20 rounded object-cover" />
                <div className="flex-1">
                  <h3 className="text-[15px] font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">PDF Guide | Instant Delivery</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-lg border">
                      <button
                        type="button"
                        className="rounded-l-lg p-2 hover:bg-secondary"
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        aria-label={`Decrease quantity for ${item.title}`}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="px-2 text-sm font-medium">{item.qty}</span>
                      <button
                        type="button"
                        className="rounded-r-lg p-2 hover:bg-secondary"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        aria-label={`Increase quantity for ${item.title}`}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="text-lg font-bold">${item.price * item.qty}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="self-start p-1 text-muted-foreground hover:text-destructive"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.title} from cart`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <TrustBar />

          <div className="mt-6 rounded-lg border bg-card p-6">
            <div className="mb-2 flex justify-between text-[15px]">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${totalPrice}</span>
            </div>
            <div className="mb-4 flex justify-between text-[15px]">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-medium text-primary">Instant (Free)</span>
            </div>
            <div className="flex justify-between border-t pt-4 text-xl font-bold">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
            <Button
              type="button"
              size="lg"
              className="mt-6 w-full text-base"
              onClick={() => toast.info("Connect your checkout provider here.")}
            >
              Proceed to Checkout
            </Button>
            <p className="mt-3 text-center text-sm text-muted-foreground">Secure checkout powered by Paddle.</p>
          </div>
        </>
      )}
    </>
  );
};

export default CartPageClient;
