"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();
  const currentPath = pathname ?? "/";
  const { user, isHydrated: isAuthHydrated, logout } = useAuth();
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

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-amber-900/10 bg-[rgba(251,246,237,0.9)] backdrop-blur-xl">
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
          {isAuthHydrated && user ? (
            <Button
              type="button"
              variant="outline"
              className="hidden rounded-full border-amber-900/10 bg-white/70 md:inline-flex"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : null}
          <Button
            asChild
            className="hidden rounded-full border-0 bg-[linear-gradient(135deg,#caa16f_0%,#8b6440_100%)] text-[#fff9f0] shadow-[0_10px_30px_rgba(131,94,55,0.24)] transition-all hover:brightness-105 md:inline-flex"
          >
            <Link href={user ? accountHref : buildAuthHref("login")}>
              {isAuthHydrated && user ? accountLabel : "Login"}
            </Link>
          </Button>
          {isCustomer ? (
            <Button asChild variant="ghost" size="icon" className="relative rounded-full border border-amber-900/10 bg-white/70">
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
            className="rounded-full border border-amber-900/10 bg-white/70 p-2 md:hidden"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-amber-900/10 bg-[rgba(251,246,237,0.96)] px-4 pb-4 md:hidden">
          {primaryNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block border-b border-amber-900/10 py-3 text-[15px] font-medium last:border-0",
                isActive(link.href) ? "text-accent" : "text-foreground/70 hover:text-primary",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            className="mt-4 w-full border-0 bg-[linear-gradient(135deg,#caa16f_0%,#8b6440_100%)] text-[#fff9f0] shadow-[0_10px_30px_rgba(131,94,55,0.22)] transition-all hover:brightness-105"
          >
            <Link href={user ? accountHref : buildAuthHref("login")}>
              {isAuthHydrated && user ? accountLabel : "Login"}
            </Link>
          </Button>
          {isAuthHydrated && user ? (
            <Button
              type="button"
              variant="outline"
              className="mt-3 w-full border-amber-900/10 bg-white/70"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : null}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
