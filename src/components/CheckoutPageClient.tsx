"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreditCard, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { buildOrderNumber, CHECKOUT_ORDER_STORAGE_KEY, type CheckoutOrderSnapshot } from "@/lib/checkout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const paymentLabels = {
  card: "Credit or debit card",
  paypal: "PayPal",
} as const;

const CheckoutPageClient = () => {
  const router = useRouter();
  const { user, isHydrated: authHydrated } = useAuth();
  const { items, totalPrice, totalItems, clearCart, isHydrated: cartHydrated } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");

  const initialEmail = user?.email ?? "";
  const initialName = user?.name ?? "";

  const summary = useMemo(
    () => ({
      subtotal: totalPrice,
      total: totalPrice,
    }),
    [totalPrice],
  );

  if (!authHydrated || !cartHydrated) {
    return <div className="py-20 text-center text-muted-foreground">Loading checkout...</div>;
  }

  if (user?.role !== "customer") {
    return (
      <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 text-center shadow-[0_18px_50px_rgba(61,40,22,0.07)] backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Customer Checkout</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-stone-800">Sign in to continue</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
          Checkout is reserved for customer accounts so your order confirmation and future downloads stay attached to the
          right profile.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/?auth=login">Open Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/cart">Back to Cart</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 text-center shadow-[0_18px_50px_rgba(61,40,22,0.07)] backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Checkout</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-stone-800">Your cart is empty</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
          Add at least one guide before opening checkout.
        </p>
        <Button asChild className="mt-6">
          <Link href="/shop">Browse Guides</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const country = String(data.get("country") ?? "").trim();
    const cardName = String(data.get("cardName") ?? "").trim();
    const cardNumber = String(data.get("cardNumber") ?? "").trim();
    const expiry = String(data.get("expiry") ?? "").trim();
    const cvc = String(data.get("cvc") ?? "").trim();

    if (!firstName || !lastName || !email || !country) {
      toast.error("Complete your billing name, email, and country before placing the order.");
      return;
    }

    if (paymentMethod === "card" && (!cardName || !cardNumber || !expiry || !cvc)) {
      toast.error("Enter your card details before placing the order.");
      return;
    }

    setIsSubmitting(true);

    try {
      const snapshot: CheckoutOrderSnapshot = {
        orderNumber: buildOrderNumber(),
        email,
        customerName: `${firstName} ${lastName}`.trim(),
        createdAt: new Date().toISOString(),
        subtotal: summary.subtotal,
        total: summary.total,
        paymentMethod,
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          qty: item.qty,
        })),
      };

      window.localStorage.setItem(CHECKOUT_ORDER_STORAGE_KEY, JSON.stringify(snapshot));
      clearCart();
      toast.success("Order placed. Your download details are ready.");
      router.push("/thank-you");
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-white/70 bg-white/78 p-6 shadow-[0_18px_50px_rgba(61,40,22,0.07)] backdrop-blur-sm md:p-8"
      >
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Secure Checkout</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-stone-800">Billing and payment</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Complete the frontend checkout flow and generate a real order summary for the confirmation page.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input name="firstName" defaultValue={initialName.split(" ")[0] ?? ""} placeholder="First name" autoComplete="given-name" required />
          <Input
            name="lastName"
            defaultValue={initialName.split(" ").slice(1).join(" ")}
            placeholder="Last name"
            autoComplete="family-name"
            required
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input name="email" type="email" defaultValue={initialEmail} placeholder="Email address" autoComplete="email" required />
          <Input name="country" placeholder="Country" autoComplete="country-name" required />
        </div>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">Payment Method</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(["card", "paypal"] as const).map((option) => {
              const selected = paymentMethod === option;

              return (
                <label
                  key={option}
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${
                    selected ? "border-primary bg-primary/5" : "border-stone-200 bg-stone-50/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={option}
                    checked={selected}
                    onChange={() => setPaymentMethod(option)}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-medium text-stone-800">{paymentLabels[option]}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {option === "card" ? "Enter card details below." : "Use the PayPal purchase path."}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {paymentMethod === "card" ? (
          <div className="mt-8 space-y-4">
            <Input name="cardName" placeholder="Name on card" autoComplete="cc-name" required={paymentMethod === "card"} />
            <Input name="cardNumber" placeholder="Card number" autoComplete="cc-number" inputMode="numeric" required={paymentMethod === "card"} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input name="expiry" placeholder="MM / YY" autoComplete="cc-exp" required={paymentMethod === "card"} />
              <Input name="cvc" placeholder="CVC" autoComplete="cc-csc" inputMode="numeric" required={paymentMethod === "card"} />
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-50/70 p-4 text-sm text-muted-foreground">
            You&apos;ll complete the same frontend confirmation flow using the PayPal option and receive a PayPal-labelled order summary.
          </div>
        )}

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 px-4 py-3 text-sm text-emerald-900">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
          <p>Your order summary, email, and selected payment method will be stored locally for the thank-you screen.</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button type="submit" size="lg" className="flex-1 gap-2 text-base" disabled={isSubmitting}>
            <LockKeyhole className="h-4 w-4" />
            {isSubmitting ? "Processing..." : `Place Order • $${summary.total}`}
          </Button>
          <Button asChild type="button" variant="outline" size="lg">
            <Link href="/cart">Back to Cart</Link>
          </Button>
        </div>
      </form>

      <aside className="space-y-6">
        <div className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_18px_50px_rgba(61,40,22,0.07)] backdrop-blur-sm">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            <CreditCard className="h-4 w-4" />
            Order Summary
          </div>
          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-stone-800">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Qty {item.qty} • ${item.price} each
                  </p>
                </div>
                <p className="font-semibold text-stone-800">${item.qty * item.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-3 border-t border-stone-200 pt-5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${summary.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-medium text-primary">Instant</span>
            </div>
            <div className="flex justify-between text-base font-semibold text-stone-800">
              <span>Total</span>
              <span>${summary.total}</span>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_18px_50px_rgba(61,40,22,0.07)] backdrop-blur-sm">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            <Mail className="h-4 w-4" />
            Delivery
          </div>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            The confirmation page will show the generated order number, purchased guides, customer email, and payment
            method so the flow feels complete end-to-end.
          </p>
        </div>
      </aside>
    </div>
  );
};

export default CheckoutPageClient;
