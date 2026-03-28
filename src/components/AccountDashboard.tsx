"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, Mail, ShoppingBag, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";

const AccountDashboard = () => {
  const router = useRouter();
  const { user, isHydrated, logout } = useAuth();

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
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="rounded-3xl border bg-card p-8 shadow-sm">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Customer Dashboard
        </span>
        <h1 className="mt-5 font-display text-3xl font-bold">Hello, {user.name}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          This dashboard is now backed by a signed server session. Order history and digital library features can plug
          into this account area once checkout/customer data is connected to a backend database.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border bg-background p-5">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Email</p>
                <p className="mt-1 font-medium">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border bg-background p-5">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Member Since</p>
                <p className="mt-1 font-medium">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
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
            onClick={() => {
              await logout();
              router.push("/");
              router.refresh();
            }}
          >
            Sign out
          </Button>
        </div>
      </section>

      <aside className="space-y-6">
        <div className="rounded-3xl border bg-card p-8 shadow-sm">
          <h2 className="font-display text-2xl font-bold">Next steps</h2>
          <div className="mt-5 space-y-4 text-sm text-muted-foreground">
            <p className="rounded-2xl border bg-background px-4 py-3">Browse the shop and add guides to your cart.</p>
            <p className="rounded-2xl border bg-background px-4 py-3">Use this account area as the base for future downloads.</p>
            <p className="rounded-2xl border bg-background px-4 py-3">
              Need help? Email <a className="font-medium text-primary" href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default AccountDashboard;
