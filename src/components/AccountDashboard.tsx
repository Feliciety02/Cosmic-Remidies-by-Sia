"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, Download, Library, Mail, Receipt, ShoppingBag, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import {
  CHECKOUT_ORDER_HISTORY_STORAGE_KEY,
  readOrderHistory,
  type CheckoutOrderSnapshot,
} from "@/lib/checkout";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const AccountDashboard = () => {
  const router = useRouter();
  const { user, isHydrated, logout } = useAuth();
  const [orders, setOrders] = useState<CheckoutOrderSnapshot[]>([]);

  useEffect(() => {
    const syncOrders = () => {
      setOrders(readOrderHistory(window.localStorage.getItem(CHECKOUT_ORDER_HISTORY_STORAGE_KEY)));
    };

    syncOrders();
    window.addEventListener("storage", syncOrders);

    return () => {
      window.removeEventListener("storage", syncOrders);
    };
  }, []);

  const libraryItems = useMemo(
    () =>
      orders.flatMap((order) =>
        order.items.map((item) => ({
          ...item,
          orderNumber: order.orderNumber,
          purchasedAt: order.createdAt,
          paymentMethod: order.paymentMethod,
        })),
      ),
    [orders],
  );

  const totalSpent = useMemo(() => orders.reduce((sum, order) => sum + order.total, 0), [orders]);

  if (!isHydrated) {
    return (
      <div className="rounded-3xl border bg-card p-8 shadow-sm">
        <div className="space-y-3">
          <div className="h-4 w-40 rounded-full bg-muted" />
          <div className="h-10 w-full rounded-xl bg-muted" />
          <div className="h-10 w-full rounded-xl bg-muted" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-3xl border bg-card p-8 shadow-sm">
        <h2 className="font-display text-2xl font-bold">Sign in required</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Your secure customer session is missing. Return to the homepage to sign in again.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border bg-card p-8 shadow-sm">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Customer Dashboard
          </span>
          <h1 className="mt-5 font-display text-3xl font-bold">Hello, {user.name}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Your account now keeps a local purchase history and digital library so completed checkouts immediately appear
            here for return visits.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border bg-background p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Email</p>
              <p className="mt-2 font-medium">{user.email}</p>
            </div>
            <div className="rounded-2xl border bg-background p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Member Since</p>
              <p className="mt-2 font-medium">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="rounded-2xl border bg-background p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Orders</p>
              <p className="mt-2 text-2xl font-bold">{orders.length}</p>
            </div>
            <div className="rounded-2xl border bg-background p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Library Value</p>
              <p className="mt-2 text-2xl font-bold">{currency.format(totalSpent)}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="gap-2">
              <Link href="/shop">
                Continue Shopping <ShoppingBag className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/cart">Open Cart</Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={async () => {
                await logout();
                router.push("/");
                router.refresh();
              }}
            >
              Sign out
            </Button>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border bg-card p-8 shadow-sm">
            <h2 className="font-display text-2xl font-bold">Account Snapshot</h2>
            <div className="mt-5 space-y-4 text-sm text-muted-foreground">
              <p className="rounded-2xl border bg-background px-4 py-3">
                {libraryItems.length > 0
                  ? `${libraryItems.length} digital guide${libraryItems.length === 1 ? "" : "s"} ready in your library.`
                  : "Your library will populate here after checkout."}
              </p>
              <p className="rounded-2xl border bg-background px-4 py-3">
                {orders.length > 0
                  ? `Latest order ${orders[0].orderNumber} placed ${new Date(orders[0].createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}.`
                  : "No completed orders yet."}
              </p>
              <p className="rounded-2xl border bg-background px-4 py-3">
                Need help? Email{" "}
                <a className="font-medium text-primary" href={`mailto:${siteConfig.supportEmail}`}>
                  {siteConfig.supportEmail}
                </a>
                .
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-3xl border bg-card p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <Library className="h-5 w-5 text-primary" />
            <h2 className="font-display text-2xl font-bold">Your Library</h2>
          </div>

          {libraryItems.length === 0 ? (
            <div className="mt-6 rounded-2xl border bg-background p-6 text-sm text-muted-foreground">
              Complete your first checkout to unlock guide access here.
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {libraryItems.map((item) => (
                <div key={`${item.orderNumber}-${item.id}`} className="rounded-2xl border bg-background p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{item.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Purchased in {item.orderNumber} on{" "}
                        {new Date(item.purchasedAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Qty {item.qty} | {currency.format(item.price)} each
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2"
                      onClick={() => toast.success(`Download ready for "${item.title}" from ${item.orderNumber}.`)}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-3xl border bg-card p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <Receipt className="h-5 w-5 text-primary" />
            <h2 className="font-display text-2xl font-bold">Order History</h2>
          </div>

          {orders.length === 0 ? (
            <div className="mt-6 rounded-2xl border bg-background p-6 text-sm text-muted-foreground">
              Your completed checkouts will appear here once you place an order.
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {orders.map((order) => (
                <div key={order.orderNumber} className="rounded-2xl border bg-background p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{order.orderNumber}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        | {order.paymentMethod === "paypal" ? "PayPal" : "Credit or debit card"}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {order.items.length} item{order.items.length === 1 ? "" : "s"} | {currency.format(order.total)}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      className="justify-start gap-2 sm:justify-center"
                      onClick={() => toast.success(`Receipt viewed for ${order.orderNumber}.`)}
                    >
                      <CalendarDays className="h-4 w-4" />
                      View Receipt
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AccountDashboard;
