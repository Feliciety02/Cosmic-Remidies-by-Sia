import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, products } from "@/data/products";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Shop All Guides",
  description: "Browse premium spiritual guides for healing, astrology, remedies, meditation, and numerology.",
  path: "/shop",
});

interface ShopPageProps {
  searchParams?: {
    q?: string | string[];
    category?: string | string[];
  };
}

const getParam = (value?: string | string[]) => (Array.isArray(value) ? value[0] ?? "" : value ?? "");

const buildShopHref = (search: string, category: string) => {
  const params = new URLSearchParams();

  if (search) {
    params.set("q", search);
  }

  if (category !== "All") {
    params.set("category", category);
  }

  const queryString = params.toString();
  return queryString ? `/shop?${queryString}` : "/shop";
};

const ShopPage = ({ searchParams }: ShopPageProps) => {
  const search = getParam(searchParams?.q).trim();
  const requestedCategory = getParam(searchParams?.category);
  const category = categories.includes(requestedCategory) ? requestedCategory : "All";

  const filtered = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="mb-10 text-center">
          <h1 className="mb-3 font-display text-3xl font-bold md:text-4xl">Shop All Guides</h1>
          <p className="text-muted-foreground">Premium spiritual guides for every stage of your journey.</p>
        </div>

        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <form method="get" className="w-full md:w-80">
            {category !== "All" && <input type="hidden" name="category" value={category} />}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input name="q" defaultValue={search} placeholder="Search guides..." className="pl-10 pr-12" />
              <Button type="submit" size="icon" className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <Link
                key={item}
                href={buildShopHref(search, item)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  category === item
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                }`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">No guides found. Try a different search or category.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage;
