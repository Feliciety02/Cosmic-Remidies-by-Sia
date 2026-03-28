"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Download, Edit, Eye, Layers3, MoreHorizontal, Percent, Plus, Search, SlidersHorizontal, Ticket, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import { PaginationControls } from "@/components/admin/PaginationControls";
import { ProductModal, type EditableProduct } from "@/components/admin/ProductModal";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { products as storefrontProducts } from "@/data/products";

const mapBadgeToAdminLabel = (badge?: string) => {
  switch (badge) {
    case "Bestseller":
      return "Best Seller";
    case "Popular":
      return "Featured";
    case "Seasonal":
      return "New";
    default:
      return badge ?? null;
  }
};

const initialProducts: EditableProduct[] = storefrontProducts.map((product, index) => {
  const visibility: EditableProduct["visibility"] = index < 14 ? "Active" : index < 18 ? "Draft" : "Hidden";
  const labels = [mapBadgeToAdminLabel(product.badge), index < 6 ? "Featured" : null].filter(Boolean) as string[];

  return {
    id: index + 1,
    title: product.title,
    slug: product.id,
    price: product.price,
    compareAtPrice: product.originalPrice ?? null,
    category: product.category,
    status: visibility,
    visibility,
    description: product.description,
    coverAsset: `${product.id}-cover.webp`,
    pdfAsset: `${product.id}.pdf`,
    labels,
    featured: index < 6,
    downloads: Math.max(18, 420 - index * 17),
    sales: Math.max(9, 160 - index * 6),
  };
});

interface DiscountCode {
  id: number;
  code: string;
  type: "percentage" | "fixed";
  amount: number;
  appliesTo: "all" | "specific";
  productIds: number[];
  usageLimit: number;
  expiryDate: string;
  status: "Active" | "Draft" | "Expired";
  redemptions: number;
}

interface BundleOffer {
  id: number;
  title: string;
  slug: string;
  productIds: number[];
  bundlePrice: number;
  compareAtPrice: number;
  status: "Active" | "Draft" | "Hidden";
  description: string;
}

const initialDiscounts: DiscountCode[] = [
  {
    id: 1,
    code: "WELCOME10",
    type: "percentage",
    amount: 10,
    appliesTo: "all",
    productIds: [],
    usageLimit: 500,
    expiryDate: "2026-12-31",
    status: "Active",
    redemptions: 82,
  },
  {
    id: 2,
    code: "BUNDLE20",
    type: "fixed",
    amount: 20,
    appliesTo: "specific",
    productIds: [2],
    usageLimit: 100,
    expiryDate: "2026-06-30",
    status: "Draft",
    redemptions: 0,
  },
];

const initialBundles: BundleOffer[] = [
  {
    id: 1,
    title: "Healing Starter Bundle",
    slug: "healing-starter-bundle",
    productIds: [2, 5],
    bundlePrice: 99,
    compareAtPrice: 124,
    status: "Active",
    description: "Combine the core healing guides into one higher-value starter offer.",
  },
  {
    id: 2,
    title: "Mindfulness Essentials Pack",
    slug: "mindfulness-essentials-pack",
    productIds: [3, 4],
    bundlePrice: 69,
    compareAtPrice: 84,
    status: "Draft",
    description: "Draft bundle for meditation and numerology buyers.",
  },
];

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [discounts, setDiscounts] = useState(initialDiscounts);
  const [bundles, setBundles] = useState(initialBundles);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"All" | "Active" | "Draft" | "Hidden">("All");
  const [catalogPage, setCatalogPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<EditableProduct | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EditableProduct | null>(null);
  const [discountForm, setDiscountForm] = useState({
    code: "",
    type: "percentage" as DiscountCode["type"],
    amount: "",
    appliesTo: "all" as DiscountCode["appliesTo"],
    productIds: [] as number[],
    usageLimit: "",
    expiryDate: "",
    status: "Draft" as DiscountCode["status"],
  });
  const [bundleForm, setBundleForm] = useState({
    title: "",
    slug: "",
    productIds: [] as number[],
    bundlePrice: "",
    compareAtPrice: "",
    status: "Draft" as BundleOffer["status"],
    description: "",
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesFilter = activeFilter === "All" ? true : product.visibility === activeFilter;
      const normalizedQuery = query.trim().toLowerCase();
      const matchesQuery =
        !normalizedQuery ||
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.slug.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, products, query]);

  const totalProducts = products.length;
  const activeProducts = products.filter((product) => product.visibility === "Active").length;
  const draftProducts = products.filter((product) => product.visibility === "Draft").length;
  const featuredProducts = products.filter((product) => product.featured).length;
  const catalogPageSize = 6;
  const paginatedProducts = filteredProducts.slice((catalogPage - 1) * catalogPageSize, catalogPage * catalogPageSize);

  const upsertProduct = (product: EditableProduct) => {
    setProducts((current) => {
      const exists = current.some((currentProduct) => currentProduct.id === product.id);
      return exists
        ? current.map((currentProduct) => (currentProduct.id === product.id ? product : currentProduct))
        : [product, ...current];
    });
  };

  const toggleDiscountProduct = (productId: number) => {
    setDiscountForm((current) => ({
      ...current,
      productIds: current.productIds.includes(productId)
        ? current.productIds.filter((currentId) => currentId !== productId)
        : [...current.productIds, productId],
    }));
  };

  const toggleBundleProduct = (productId: number) => {
    setBundleForm((current) => ({
      ...current,
      productIds: current.productIds.includes(productId)
        ? current.productIds.filter((currentId) => currentId !== productId)
        : [...current.productIds, productId],
    }));
  };

  const createDiscount = () => {
    if (!discountForm.code.trim() || !discountForm.amount.trim() || !discountForm.usageLimit.trim() || !discountForm.expiryDate) {
      toast.error("Code, amount, usage limit, and expiry date are required.");
      return;
    }

    const nextDiscount: DiscountCode = {
      id: Date.now(),
      code: discountForm.code.trim().toUpperCase(),
      type: discountForm.type,
      amount: Number(discountForm.amount),
      appliesTo: discountForm.appliesTo,
      productIds: discountForm.productIds,
      usageLimit: Number(discountForm.usageLimit),
      expiryDate: discountForm.expiryDate,
      status: discountForm.status,
      redemptions: 0,
    };

    setDiscounts((current) => [nextDiscount, ...current]);
    setDiscountForm({
      code: "",
      type: "percentage",
      amount: "",
      appliesTo: "all",
      productIds: [],
      usageLimit: "",
      expiryDate: "",
      status: "Draft",
    });
    toast.success("Discount code created.");
  };

  const createBundle = () => {
    if (!bundleForm.title.trim() || !bundleForm.slug.trim() || bundleForm.productIds.length < 2 || !bundleForm.bundlePrice.trim()) {
      toast.error("Bundle title, slug, at least two products, and bundle price are required.");
      return;
    }

    const nextBundle: BundleOffer = {
      id: Date.now(),
      title: bundleForm.title.trim(),
      slug: bundleForm.slug.trim(),
      productIds: bundleForm.productIds,
      bundlePrice: Number(bundleForm.bundlePrice),
      compareAtPrice: Number(bundleForm.compareAtPrice) || 0,
      status: bundleForm.status,
      description: bundleForm.description.trim(),
    };

    setBundles((current) => [nextBundle, ...current]);
    setBundleForm({
      title: "",
      slug: "",
      productIds: [],
      bundlePrice: "",
      compareAtPrice: "",
      status: "Draft",
      description: "",
    });
    toast.success("Bundle draft created.");
  };

  const catalogContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 md:gap-6">
        {[
          { label: "Total products", value: totalProducts, sub: "All storefront records" },
          { label: "Active", value: activeProducts, sub: "Visible to buyers now" },
          { label: "Drafts", value: draftProducts, sub: "Pending content or assets" },
          { label: "Featured", value: featuredProducts, sub: "Highlighted on storefront" },
        ].map((metric) => (
          <Card key={metric.label} className="rounded-[1.5rem] border-white/70 bg-white/90 p-5 shadow-[0_18px_50px_rgba(66,97,129,0.08)]">
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="mt-2 text-3xl font-semibold text-foreground">{metric.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{metric.sub}</p>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden rounded-[1.75rem] border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.94)_0%,rgba(246,250,253,0.98)_100%)] p-5 shadow-[0_18px_52px_rgba(66,97,129,0.08)]">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <div className="w-full max-w-xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Catalog controls</p>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-800/55" />
                <Input
                  id="products-search"
                  name="productsSearch"
                  placeholder="Search products, slugs, or categories..."
                  className="h-14 rounded-2xl border border-white bg-white pl-11 pr-4 text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] placeholder:text-muted-foreground/80"
                  autoComplete="off"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setCatalogPage(1);
                  }}
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button variant="outline" className="h-12 shrink-0 gap-2 rounded-2xl border-white bg-white/90 px-5">
                <Download className="h-4 w-4" />
                Export Catalog
              </Button>
              <Button onClick={() => setAddOpen(true)} className="h-12 shrink-0 gap-2 rounded-2xl px-5 gradient-primary text-primary-foreground">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-11 items-center gap-2 rounded-full bg-sky-100/80 px-4 text-sm font-medium text-sky-800">
                <SlidersHorizontal className="h-4 w-4" />
                Filter by status
              </div>

              <div className="flex flex-wrap gap-2 rounded-[1.2rem] border border-white/80 bg-white/85 p-2 shadow-sm">
                {(["All", "Active", "Draft", "Hidden"] as const).map((filter) => {
                  const count =
                    filter === "All" ? totalProducts : products.filter((product) => product.visibility === filter).length;

                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => {
                        setActiveFilter(filter);
                        setCatalogPage(1);
                      }}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                        filter === activeFilter
                          ? "bg-[linear-gradient(135deg,#3f79b4_0%,#245f93_100%)] text-white shadow-[0_14px_30px_rgba(43,88,131,0.24)]"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>{filter}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] ${
                          filter === activeFilter ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-full border border-sky-200/70 bg-white/90 px-4 py-2 text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> matching products
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 md:gap-6">
        {paginatedProducts.map((product) => (
          <Card key={product.id} className="group rounded-[1.5rem] border-white/70 bg-white/90 p-5 shadow-[0_18px_50px_rgba(66,97,129,0.08)] transition-shadow hover:shadow-[0_22px_60px_rgba(66,97,129,0.12)]">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-base font-semibold text-primary">
                {product.title
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button type="button" className="rounded-xl p-1.5 opacity-0 transition-colors group-hover:opacity-100 hover:bg-slate-100">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setEditProduct(product)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive" onClick={() => setDeleteTarget(product)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h3 className="mb-1 font-semibold text-foreground">{product.title}</h3>
            <p className="mb-1 text-sm text-muted-foreground">/{product.slug}</p>
            <p className="mb-3 text-sm text-muted-foreground">{product.category}</p>
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                {product.compareAtPrice ? (
                  <span className="ml-2 text-sm text-muted-foreground line-through">${product.compareAtPrice.toFixed(2)}</span>
                ) : null}
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                {product.labels.map((label) => (
                  <StatusBadge key={label} status={label} />
                ))}
                <StatusBadge status={product.visibility} />
              </div>
            </div>
            <div className="mt-3 grid gap-3 border-t pt-3 text-sm text-muted-foreground sm:grid-cols-2">
              <div>
                <p className="font-medium text-foreground">{product.sales}</p>
                <p>Sales</p>
              </div>
              <div>
                <p className="font-medium text-foreground">{product.downloads}</p>
                <p>Downloads</p>
              </div>
            </div>
            <div className="mt-3 rounded-xl bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
              Cover: {product.coverAsset || "Not assigned"} | PDF: {product.pdfAsset || "Not assigned"}
            </div>
          </Card>
        ))}
      </div>
      <Card className="overflow-hidden rounded-[1.5rem] border-white/70 bg-white/90 shadow-[0_18px_50px_rgba(66,97,129,0.08)]">
        <PaginationControls
          page={catalogPage}
          pageSize={catalogPageSize}
          totalItems={filteredProducts.length}
          itemLabel="products"
          onPageChange={setCatalogPage}
        />
      </Card>
    </div>
  );

  return (
    <AdminLayout title="Products" subtitle="Manage your digital products">
      <Tabs defaultValue="catalog" className="space-y-6">
        <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0 text-foreground">
          <TabsTrigger value="catalog" className="gap-2 rounded-full border bg-background px-4 py-2 data-[state=active]:border-primary data-[state=active]:text-primary">
            <Layers3 className="h-4 w-4" />
            Catalog
          </TabsTrigger>
          <TabsTrigger value="discounts" className="gap-2 rounded-full border bg-background px-4 py-2 data-[state=active]:border-primary data-[state=active]:text-primary">
            <Percent className="h-4 w-4" />
            Discount Codes
          </TabsTrigger>
          <TabsTrigger value="bundles" className="gap-2 rounded-full border bg-background px-4 py-2 data-[state=active]:border-primary data-[state=active]:text-primary">
            <Ticket className="h-4 w-4" />
            Bundles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="catalog">{catalogContent}</TabsContent>

        <TabsContent value="discounts" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card className="rounded-[1.75rem] border-white/70 bg-white/90 p-6 shadow-[0_18px_52px_rgba(66,97,129,0.08)]">
              <div className="mb-5">
                <h3 className="text-lg font-semibold">Discount Codes</h3>
                <p className="text-sm text-muted-foreground">Create percentage or fixed discounts with expiry and usage controls.</p>
              </div>

              <div className="space-y-4">
                {discounts.map((discount) => (
                  <div key={discount.id} className="rounded-2xl border border-border/70 bg-slate-50/70 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-base font-semibold text-foreground">{discount.code}</p>
                        <p className="text-sm text-muted-foreground">
                          {discount.type === "percentage" ? `${discount.amount}% off` : `$${discount.amount} off`} |{" "}
                          {discount.appliesTo === "all"
                            ? "Applies to all products"
                            : `${discount.productIds.length} selected product${discount.productIds.length === 1 ? "" : "s"}`}
                        </p>
                      </div>
                      <StatusBadge status={discount.status} />
                    </div>

                    <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                      <div>
                        <p className="font-medium text-foreground">{discount.redemptions}</p>
                        <p>Redemptions</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{discount.usageLimit}</p>
                        <p>Usage limit</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{discount.expiryDate}</p>
                        <p>Expires</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="rounded-[1.75rem] border-white/70 bg-white/90 p-6 shadow-[0_18px_52px_rgba(66,97,129,0.08)]">
              <h3 className="mb-4 text-lg font-semibold">Create Discount</h3>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="discount-code">Code</Label>
                    <Input
                      id="discount-code"
                      value={discountForm.code}
                      onChange={(event) => setDiscountForm((current) => ({ ...current, code: event.target.value }))}
                      placeholder="WELCOME10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount-status">Status</Label>
                    <Select
                      value={discountForm.status}
                      onValueChange={(value) => setDiscountForm((current) => ({ ...current, status: value as DiscountCode["status"] }))}
                    >
                      <SelectTrigger id="discount-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="discount-type">Discount type</Label>
                    <Select
                      value={discountForm.type}
                      onValueChange={(value) => setDiscountForm((current) => ({ ...current, type: value as DiscountCode["type"] }))}
                    >
                      <SelectTrigger id="discount-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount-amount">Amount</Label>
                    <Input
                      id="discount-amount"
                      value={discountForm.amount}
                      onChange={(event) => setDiscountForm((current) => ({ ...current, amount: event.target.value }))}
                      placeholder={discountForm.type === "percentage" ? "10" : "20"}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="discount-applies-to">Applies to</Label>
                    <Select
                      value={discountForm.appliesTo}
                      onValueChange={(value) => setDiscountForm((current) => ({ ...current, appliesTo: value as DiscountCode["appliesTo"] }))}
                    >
                      <SelectTrigger id="discount-applies-to">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All products</SelectItem>
                        <SelectItem value="specific">Specific products</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount-usage-limit">Usage limit</Label>
                    <Input
                      id="discount-usage-limit"
                      value={discountForm.usageLimit}
                      onChange={(event) => setDiscountForm((current) => ({ ...current, usageLimit: event.target.value }))}
                      placeholder="500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount-expiry">Expiry date</Label>
                  <Input
                    id="discount-expiry"
                    type="date"
                    value={discountForm.expiryDate}
                    onChange={(event) => setDiscountForm((current) => ({ ...current, expiryDate: event.target.value }))}
                  />
                </div>

                {discountForm.appliesTo === "specific" ? (
                  <div className="space-y-2">
                    <Label>Select products</Label>
                    <div className="flex flex-wrap gap-2 rounded-2xl border p-3">
                      {products.map((product) => {
                        const selected = discountForm.productIds.includes(product.id);

                        return (
                          <button
                            key={product.id}
                            type="button"
                            onClick={() => toggleDiscountProduct(product.id)}
                            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                              selected ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground"
                            }`}
                          >
                            {product.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                <Button onClick={createDiscount} className="w-full gradient-primary text-primary-foreground">
                  Create Discount Code
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bundles" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <Card className="rounded-[1.75rem] border-white/70 bg-white/90 p-6 shadow-[0_18px_52px_rgba(66,97,129,0.08)]">
              <div className="mb-5">
                <h3 className="text-lg font-semibold">Bundle Offers</h3>
                <p className="text-sm text-muted-foreground">Group products together and present a combined savings offer.</p>
              </div>

              <div className="space-y-4">
                {bundles.map((bundle) => (
                  <div key={bundle.id} className="rounded-2xl border border-border/70 bg-slate-50/70 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-base font-semibold text-foreground">{bundle.title}</p>
                        <p className="text-sm text-muted-foreground">/{bundle.slug}</p>
                      </div>
                      <StatusBadge status={bundle.status} />
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground">{bundle.description}</p>

                    <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                      <div>
                        <p className="font-medium text-foreground">{bundle.productIds.length}</p>
                        <p>Products in bundle</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">${bundle.bundlePrice.toFixed(2)}</p>
                        <p>Bundle price</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">${bundle.compareAtPrice.toFixed(2)}</p>
                        <p>Compare-at price</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="rounded-[1.75rem] border-white/70 bg-white/90 p-6 shadow-[0_18px_52px_rgba(66,97,129,0.08)]">
              <h3 className="mb-4 text-lg font-semibold">Create Bundle</h3>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="bundle-title">Bundle title</Label>
                    <Input
                      id="bundle-title"
                      value={bundleForm.title}
                      onChange={(event) => setBundleForm((current) => ({ ...current, title: event.target.value }))}
                      placeholder="Healing Starter Bundle"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bundle-slug">Slug</Label>
                    <Input
                      id="bundle-slug"
                      value={bundleForm.slug}
                      onChange={(event) => setBundleForm((current) => ({ ...current, slug: event.target.value }))}
                      placeholder="healing-starter-bundle"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="bundle-price">Bundle price</Label>
                    <Input
                      id="bundle-price"
                      value={bundleForm.bundlePrice}
                      onChange={(event) => setBundleForm((current) => ({ ...current, bundlePrice: event.target.value }))}
                      placeholder="99"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bundle-compare-price">Compare-at price</Label>
                    <Input
                      id="bundle-compare-price"
                      value={bundleForm.compareAtPrice}
                      onChange={(event) => setBundleForm((current) => ({ ...current, compareAtPrice: event.target.value }))}
                      placeholder="124"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bundle-status">Status</Label>
                    <Select
                      value={bundleForm.status}
                      onValueChange={(value) => setBundleForm((current) => ({ ...current, status: value as BundleOffer["status"] }))}
                    >
                      <SelectTrigger id="bundle-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Hidden">Hidden</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Select products for this bundle</Label>
                  <div className="flex flex-wrap gap-2 rounded-2xl border p-3">
                    {products.map((product) => {
                      const selected = bundleForm.productIds.includes(product.id);

                      return (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => toggleBundleProduct(product.id)}
                          className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                            selected ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground"
                          }`}
                        >
                          {product.title}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bundle-description">Bundle description</Label>
                  <Textarea
                    id="bundle-description"
                    value={bundleForm.description}
                    onChange={(event) => setBundleForm((current) => ({ ...current, description: event.target.value }))}
                    placeholder="Explain what the bundle includes and why the combined offer is compelling."
                    rows={4}
                  />
                </div>

                <Button onClick={createBundle} className="w-full gradient-primary text-primary-foreground">
                  Create Bundle
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <ProductModal open={addOpen} onOpenChange={setAddOpen} onSave={upsertProduct} />

      <ProductModal
        open={!!editProduct}
        onOpenChange={(open) => {
          if (!open) {
            setEditProduct(null);
          }
        }}
        onSave={upsertProduct}
        editProduct={editProduct}
      />

      <DeleteConfirmModal
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        title="Delete Product"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone and will remove all associated data.`}
        onConfirm={() => {
          if (deleteTarget) {
            setProducts((current) => current.filter((product) => product.id !== deleteTarget.id));
          }
          toast.success(`"${deleteTarget?.title}" has been removed.`);
          setDeleteTarget(null);
        }}
      />
    </AdminLayout>
  );
};

export default Products;
