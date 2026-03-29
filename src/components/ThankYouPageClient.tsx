"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle, Download, Mail } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { CHECKOUT_ORDER_STORAGE_KEY, getSuggestedProducts, type CheckoutOrderSnapshot } from "@/lib/checkout";

const ThankYouPageClient = () => {
  const [order, setOrder] = useState<CheckoutOrderSnapshot | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CHECKOUT_ORDER_STORAGE_KEY);

      if (stored) {
        setOrder(JSON.parse(stored) as CheckoutOrderSnapshot);
      }
    } catch {
      setOrder(null);
    }
  }, []);

  const recommendations = useMemo(
    () => getSuggestedProducts(order?.items.map((item) => item.id) ?? [], 3),
    [order],
  );

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle className="h-8 w-8 text-primary" />
      </div>
      <h1 className="mb-3 text-center font-display text-3xl font-bold">Thank You for Your Purchase!</h1>
      <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
        {order
          ? `Order ${order.orderNumber} is complete. Your guides are ready for delivery to ${order.email}.`
          : "Your latest completed checkout will appear here once an order has been placed."}
      </p>

      {order ? (
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.75rem] border bg-card p-6 shadow-sm">
            <h2 className="mb-5 font-display text-2xl font-bold">Order Summary</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-4 border-b border-border/70 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty {item.qty} • ${item.price} each
                    </p>
                  </div>
                  <p className="font-semibold">${item.qty * item.price}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2 border-t border-border/70 pt-5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customer</span>
                <span>{order.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span>{order.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment method</span>
                <span>{order.paymentMethod === "paypal" ? "PayPal" : "Credit or debit card"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Placed</span>
                <span>{new Date(order.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</span>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>${order.total}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[1.75rem] border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold">Check your email</p>
                  <p className="text-xs text-muted-foreground">Receipt and download notice sent to your inbox</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Download className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold">Instant access</p>
                  <p className="text-xs text-muted-foreground">Digital guides are ready immediately after checkout</p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border bg-teal-light/30 p-6">
              <h2 className="mb-2 font-display text-lg font-bold">Continue Your Journey</h2>
              <p className="mb-4 text-sm text-muted-foreground">Browse more guides or return to the shop for another order.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="gap-2">
                  <Link href="/shop">Browse More Guides</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/cart">Open Cart</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-10 rounded-[1.75rem] border bg-card p-8 text-center shadow-sm">
          <p className="text-sm leading-7 text-muted-foreground">
            Complete checkout first to generate a confirmation summary here.
          </p>
          <Button asChild className="mt-5">
            <Link href="/shop">Go to Shop</Link>
          </Button>
        </div>
      )}

      <h2 className="mb-6 font-display text-xl font-bold">You Might Also Love</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ThankYouPageClient;
