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
import { primaryNavLinks } from "@/lib/site";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname ?? "/";
  const { user, isHydrated: isAuthHydrated } = useAuth();
  const { totalItems, isHydrated } = useCart();
  const accountHref = user?.role === "admin" ? "/admin" : "/account";
  const accountLabel = user?.role === "admin" ? "Admin" : "Account";

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
    <nav className="sticky top-0 z-50 border-b bg-card/90 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Cosmic Remedies by Sia" className="h-10 w-auto md:h-12" priority />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {primaryNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[15px] font-medium transition-colors",
                isActive(link.href) ? "text-primary" : "text-foreground/70 hover:text-primary",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant={user ? "default" : "outline"} className="hidden md:inline-flex">
            <Link href={user ? accountHref : "/"}>{isAuthHydrated && user ? accountLabel : "Sign In"}</Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link href="/cart" aria-label="Open cart">
              <ShoppingCart className="h-5 w-5" />
              {isHydrated && totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>
          <button
            type="button"
            className="md:hidden"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t bg-card px-4 pb-4 md:hidden">
          {primaryNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block border-b py-3 text-[15px] font-medium last:border-0",
                isActive(link.href) ? "text-primary" : "text-foreground/70 hover:text-primary",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild variant={user ? "default" : "outline"} className="mt-4 w-full">
            <Link href={user ? accountHref : "/"}>{isAuthHydrated && user ? `Open ${accountLabel}` : "Sign In"}</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
