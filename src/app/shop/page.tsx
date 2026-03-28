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
    page?: string | string[];
  };
}

const getParam = (value?: string | string[]) => (Array.isArray(value) ? value[0] ?? "" : value ?? "");

const PRODUCTS_PER_PAGE = 8;

const buildShopHref = (search: string, category: string, page = 1) => {
  const params = new URLSearchParams();

  if (search) {
    params.set("q", search);
  }

  if (category !== "All") {
    params.set("category", category);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const queryString = params.toString();
  return queryString ? `/shop?${queryString}` : "/shop";
};

const ShopPage = ({ searchParams }: ShopPageProps) => {
  const search = getParam(searchParams?.q).trim();
  const requestedCategory = getParam(searchParams?.category);
  const category = categories.includes(requestedCategory) ? requestedCategory : "All";
  const requestedPage = Number.parseInt(getParam(searchParams?.page), 10);

  const filtered = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? Math.min(requestedPage, totalPages) : 1;
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filtered.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  const visibleStart = filtered.length === 0 ? 0 : startIndex + 1;
  const visibleEnd = Math.min(startIndex + PRODUCTS_PER_PAGE, filtered.length);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="mb-10 text-center">
          <h1 className="mb-3 font-display text-3xl font-bold md:text-4xl">Shop All Guides</h1>
          <p className="text-muted-foreground">Premium spiritual guides for every stage of your journey.</p>
        </div>

        <div className="mb-10 rounded-[2rem] border border-sky-100/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.86)_0%,rgba(243,247,251,0.82)_100%)] p-4 shadow-[0_18px_50px_rgba(75,102,145,0.08)] backdrop-blur-sm sm:p-5 lg:p-6">
          <div className="grid gap-5 xl:grid-cols-[minmax(24rem,30rem)_1fr] xl:items-start">
            <div>
              <form method="get" className="w-full">
                {category !== "All" && <input type="hidden" name="category" value={category} />}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    name="q"
                    defaultValue={search}
                    placeholder="Search guides..."
                    className="h-12 rounded-full border-sky-200/70 bg-white/90 pl-11 pr-14 shadow-sm"
                  />
                  <Button type="submit" size="icon" className="absolute right-1.5 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap gap-2.5 xl:justify-start">
                {categories.map((item) => (
                  <Link
                    key={item}
                    href={buildShopHref(search, item)}
                    className={`inline-flex min-h-[2.7rem] items-center rounded-full px-4 py-2 text-sm font-medium leading-none transition-all ${
                      category === item
                        ? "bg-primary text-primary-foreground shadow-[0_10px_24px_rgba(48,95,170,0.18)]"
                        : "border border-sky-100 bg-white/80 text-secondary-foreground hover:border-sky-200 hover:bg-sky-50/70"
                    }`}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="mb-6 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing {visibleStart}-{visibleEnd} of {filtered.length} guides
            </p>
            <p>
              Page {currentPage} of {totalPages}
            </p>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">No guides found. Try a different search or category.</p>
        )}

        {filtered.length > PRODUCTS_PER_PAGE ? (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <Link
              href={buildShopHref(search, category, currentPage - 1)}
              aria-disabled={currentPage === 1}
              className={`inline-flex min-h-[2.75rem] items-center rounded-full px-4 text-sm font-medium transition-colors ${
                currentPage === 1
                  ? "pointer-events-none border border-slate-200 bg-slate-100 text-slate-400"
                  : "border border-sky-100 bg-white text-secondary-foreground hover:border-sky-200 hover:bg-sky-50/70"
              }`}
            >
              Previous
            </Link>

            {pageNumbers.map((pageNumber) => (
              <Link
                key={pageNumber}
                href={buildShopHref(search, category, pageNumber)}
                aria-current={pageNumber === currentPage ? "page" : undefined}
                className={`inline-flex h-11 min-w-[2.75rem] items-center justify-center rounded-full px-4 text-sm font-medium transition-colors ${
                  pageNumber === currentPage
                    ? "bg-primary text-primary-foreground shadow-[0_10px_24px_rgba(48,95,170,0.18)]"
                    : "border border-sky-100 bg-white text-secondary-foreground hover:border-sky-200 hover:bg-sky-50/70"
                }`}
              >
                {pageNumber}
              </Link>
            ))}

            <Link
              href={buildShopHref(search, category, currentPage + 1)}
              aria-disabled={currentPage === totalPages}
              className={`inline-flex min-h-[2.75rem] items-center rounded-full px-4 text-sm font-medium transition-colors ${
                currentPage === totalPages
                  ? "pointer-events-none border border-slate-200 bg-slate-100 text-slate-400"
                  : "border border-sky-100 bg-white text-secondary-foreground hover:border-sky-200 hover:bg-sky-50/70"
              }`}
            >
              Next
            </Link>
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage;
