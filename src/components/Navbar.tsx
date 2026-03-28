"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, X } from "lucide-react";
import logo from "@/assets/logo.svg";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { buildAuthHref, primaryNavLinks } from "@/lib/site";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname ?? "/";
  const { user, isHydrated: isAuthHydrated } = useAuth();
  const { totalItems, isHydrated } = useCart();
  const isCustomer = user?.role === "customer";
  const accountHref = user?.role === "admin" ? "/admin" : "/account";
  const accountLabel = user?.role === "admin" ? "Dashboard" : "Account";

  useEffect(() => {
    setOpen(false);
  }, [currentPath]);

  const isActive = (href: string) => {
    if (href === "/") {
      return currentPath === href;
    }

    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-stone-800/10 bg-[rgba(250,247,241,0.9)] backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="Cosmic Remedies by Sia" className="h-10 w-auto md:h-12" priority />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {primaryNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[15px] font-medium tracking-[0.02em] transition-colors",
                isActive(link.href) ? "text-accent" : "text-foreground/70 hover:text-primary",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden rounded-full border-0 bg-[linear-gradient(135deg,#c38a43_0%,#a96d2c_100%)] text-white shadow-[0_10px_30px_rgba(169,109,44,0.25)] transition-all hover:brightness-105 md:inline-flex"
          >
            <Link href={user ? accountHref : buildAuthHref("login")}>
              {isAuthHydrated && user ? accountLabel : "Login"}
            </Link>
          </Button>
          {isCustomer ? (
            <Button asChild variant="ghost" size="icon" className="relative rounded-full border border-stone-800/10 bg-white/60">
              <Link href="/cart" aria-label="Open cart">
                <ShoppingCart className="h-5 w-5" />
                {isHydrated && totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>
          ) : null}
          <button
            type="button"
            className="rounded-full border border-stone-800/10 bg-white/60 p-2 md:hidden"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-stone-800/10 bg-[rgba(250,247,241,0.96)] px-4 pb-4 md:hidden">
          {primaryNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block border-b border-stone-800/10 py-3 text-[15px] font-medium last:border-0",
                isActive(link.href) ? "text-accent" : "text-foreground/70 hover:text-primary",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            className="mt-4 w-full border-0 bg-[linear-gradient(135deg,#c38a43_0%,#a96d2c_100%)] text-white shadow-[0_10px_30px_rgba(169,109,44,0.22)] transition-all hover:brightness-105"
          >
            <Link href={user ? accountHref : buildAuthHref("login")}>
              {isAuthHydrated && user ? accountLabel : "Login"}
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
