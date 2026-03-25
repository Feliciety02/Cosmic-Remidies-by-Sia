"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  Store,
  Users,
} from "lucide-react";
import logo from "@/assets/logo.svg";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

const AdminNav = ({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) => (
  <div className="flex h-full flex-col bg-card">
    <div className="border-b px-5 py-5">
      <Link href="/admin" className="flex items-center gap-3" onClick={onNavigate}>
        <Image src={logo} alt="Cosmic Remedies by Sia" className="h-10 w-auto" priority />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Admin</p>
          <p className="text-sm text-muted-foreground">Store control panel</p>
        </div>
      </Link>
    </div>

    <nav className="flex-1 space-y-1 px-3 py-4">
      {adminNavItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              isActive ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-muted hover:text-foreground",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>

    <div className="border-t px-4 py-4">
      <Button asChild variant="outline" className="w-full justify-start gap-2">
        <Link href="/">
          <Store className="h-4 w-4" />
          View Storefront
        </Link>
      </Button>
    </div>
  </div>
);

export const AdminLayout = ({ title, subtitle, children }: AdminLayoutProps) => {
  const pathname = usePathname() ?? "/admin";
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-secondary/35">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r lg:block">
        <AdminNav pathname={pathname} />
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                  <AdminNav pathname={pathname} />
                </SheetContent>
              </Sheet>

              <div>
                <h1 className="font-display text-2xl font-bold md:text-3xl">{title}</h1>
                {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
              </div>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <Button asChild variant="outline">
                <Link href="/">Open Storefront</Link>
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="gap-2"
                onClick={() => {
                  logout();
                  router.push("/");
                  router.refresh();
                }}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 md:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
};
