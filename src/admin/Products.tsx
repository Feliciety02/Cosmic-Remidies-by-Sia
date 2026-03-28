"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Download, Edit, Eye, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import { ProductModal, type EditableProduct } from "@/components/admin/ProductModal";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const initialProducts: EditableProduct[] = [
  {
    id: 1,
    title: "Vedic Astrology Guide",
    slug: "vedic-astrology-guide",
    price: 49.99,
    compareAtPrice: 79.99,
    category: "Astrology",
    status: "Active",
    visibility: "Active",
    description: "Comprehensive PDF guide with forecasts, charts, and buyer-friendly remedies.",
    coverAsset: "vedic-astrology-cover.webp",
    pdfAsset: "vedic-astrology-guide.pdf",
    labels: ["Best Seller", "Featured"],
    featured: true,
    downloads: 388,
    sales: 142,
  },
  {
    id: 2,
    title: "Cosmic Healing Bundle",
    slug: "cosmic-healing-bundle",
    price: 89.99,
    compareAtPrice: 129.99,
    category: "Healing",
    status: "Active",
    visibility: "Active",
    description: "Bundle offer combining the core healing PDFs for higher average order value.",
    coverAsset: "cosmic-healing-bundle.webp",
    pdfAsset: "cosmic-healing-bundle.zip",
    labels: ["New"],
    featured: true,
    downloads: 190,
    sales: 98,
  },
  {
    id: 3,
    title: "Chakra Meditation PDF",
    slug: "chakra-meditation-pdf",
    price: 24.99,
    compareAtPrice: null,
    category: "Meditation",
    status: "Active",
    visibility: "Active",
    description: "Beginner-friendly meditation guide designed for mobile-first buyers.",
    coverAsset: "chakra-meditation-cover.webp",
    pdfAsset: "chakra-meditation.pdf",
    labels: [],
    featured: false,
    downloads: 126,
    sales: 87,
  },
  {
    id: 4,
    title: "Numerology Masterclass",
    slug: "numerology-masterclass",
    price: 59.99,
    compareAtPrice: 79.99,
    category: "Numerology",
    status: "Active",
    visibility: "Active",
    description: "Advanced numerology digital guide with workbooks and follow-up templates.",
    coverAsset: "numerology-masterclass.webp",
    pdfAsset: "numerology-masterclass.pdf",
    labels: ["On Sale"],
    featured: false,
    downloads: 112,
    sales: 64,
  },
  {
    id: 5,
    title: "Crystal Healing Guide",
    slug: "crystal-healing-guide",
    price: 34.99,
    compareAtPrice: null,
    category: "Healing",
    status: "Draft",
    visibility: "Draft",
    description: "Draft product waiting on final cover and sales copy approval.",
    coverAsset: "crystal-healing-cover.webp",
    pdfAsset: "crystal-healing-guide.pdf",
    labels: [],
    featured: false,
    downloads: 0,
    sales: 0,
  },
  {
    id: 6,
    title: "Vastu Shastra Essentials",
    slug: "vastu-shastra-essentials",
    price: 39.99,
    compareAtPrice: null,
    category: "Vastu",
    status: "Hidden",
    visibility: "Hidden",
    description: "Hidden product reserved for a future funnel or order-bump offer.",
    coverAsset: "vastu-shastra-essentials.webp",
    pdfAsset: "vastu-shastra-essentials.pdf",
    labels: [],
    featured: false,
    downloads: 12,
    sales: 45,
  },
];

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"All" | "Active" | "Draft" | "Hidden">("All");
  const [addOpen, setAddOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<EditableProduct | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EditableProduct | null>(null);

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

  const upsertProduct = (product: EditableProduct) => {
    setProducts((current) => {
      const exists = current.some((currentProduct) => currentProduct.id === product.id);
      return exists
        ? current.map((currentProduct) => (currentProduct.id === product.id ? product : currentProduct))
        : [product, ...current];
    });
  };

  return (
    <AdminLayout title="Products" subtitle="Manage your digital products">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 md:gap-6">
          {[
            { label: "Total products", value: totalProducts, sub: "All storefront records" },
            { label: "Active", value: activeProducts, sub: "Visible to buyers now" },
            { label: "Drafts", value: draftProducts, sub: "Pending content or assets" },
            { label: "Featured", value: featuredProducts, sub: "Highlighted on storefront" },
          ].map((metric) => (
            <Card key={metric.label} className="p-5">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">{metric.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{metric.sub}</p>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="border-border bg-card pl-9"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button variant="outline" className="gap-2 shrink-0">
              <Download className="h-4 w-4" />
              Export Catalog
            </Button>
            <Button onClick={() => setAddOpen(true)} className="gap-2 shrink-0 gradient-primary text-primary-foreground">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(["All", "Active", "Draft", "Hidden"] as const).map((filter) => (
            <Button
              key={filter}
              variant={filter === activeFilter ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className={filter === activeFilter ? "gradient-primary text-primary-foreground" : ""}
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 md:gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group p-5 transition-shadow hover:shadow-md">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-base font-semibold text-primary">
                  {product.title
                    .split(" ")
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join("")}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button type="button" className="rounded-lg p-1.5 opacity-0 transition-colors group-hover:opacity-100 hover:bg-secondary">
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
      </div>

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
