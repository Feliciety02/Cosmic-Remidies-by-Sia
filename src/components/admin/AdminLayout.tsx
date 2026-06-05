"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, FileText, LayoutDashboard, LogOut, Menu, Package, Settings, ShoppingCart, Store, Users } from "lucide-react";
import logo from "@/assets/logo.svg";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Content", href: "/admin/content", icon: FileText },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const AdminNav = ({
  pathname,
  onNavigate,
  onSignOut,
}: {
  pathname: string;
  onNavigate?: () => void;
  onSignOut: () => void;
}) => (
  <div className="flex h-full flex-col bg-[linear-gradient(180deg,rgba(255,251,245,0.94)_0%,rgba(246,237,223,0.98)_100%)]">
    <div className="border-b border-white/70 px-5 py-6">
      <Link href="/admin" className="flex items-center gap-3" onClick={onNavigate}>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-200/70 bg-white shadow-[0_12px_30px_rgba(104,75,42,0.14)]">
          <Image src={logo} alt={siteConfig.name} className="h-8 w-auto" priority />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Admin Suite</p>
          <p className="text-sm text-muted-foreground">Store control panel</p>
        </div>
      </Link>
    </div>

    <nav className="flex-1 space-y-1 px-3 py-5">
      {adminNavItems.map((item) => {
        const isDashboard = item.href === "/admin";
        const isActive = isDashboard ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-medium transition-all",
              isActive
                ? "bg-[linear-gradient(135deg,hsl(35_48%_54%)_0%,hsl(28_37%_38%)_100%)] text-primary-foreground shadow-[0_18px_38px_rgba(104,75,42,0.22)]"
                : "text-foreground/70 hover:bg-white hover:text-foreground hover:shadow-sm",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>

    <div className="border-t border-white/70 px-4 py-4">
      <div className="space-y-2">
        <Button asChild variant="outline" className="w-full justify-start gap-2 rounded-xl border-white bg-white/80">
          <Link href="/" onClick={onNavigate}>
            <Store className="h-4 w-4" />
            View Storefront
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 rounded-xl" onClick={onSignOut}>
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  </div>
);

export const AdminLayout = ({ title, subtitle, children }: AdminLayoutProps) => {
  const pathname = usePathname() ?? "/admin";
  const router = useRouter();
  const { logout } = useAuth();
  const handleSignOut = async () => {
    await logout();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fdf7ee_0%,#f3e8d8_48%,#f9f2e8_100%)]">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,rgba(199,155,99,0.18),transparent_60%)]" />
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/70 bg-white/70 backdrop-blur-xl lg:block">
        <AdminNav pathname={pathname} onSignOut={handleSignOut} />
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-white/70 bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-4 px-4 py-3 md:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-xl border-white bg-white/80 lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                  <AdminNav pathname={pathname} onSignOut={handleSignOut} />
                </SheetContent>
              </Sheet>

              <div>
                <h1 className="font-display text-[1.85rem] font-bold leading-none md:text-[2.15rem]">{title}</h1>
                {subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p> : null}
              </div>
            </div>
          </div>
        </header>

        <main className="relative px-4 py-6 md:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
};
