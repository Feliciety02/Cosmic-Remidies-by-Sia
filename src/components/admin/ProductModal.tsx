"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export interface EditableProduct {
  id: number;
  title: string;
  slug: string;
  price: number;
  compareAtPrice: number | null;
  category: string;
  status: string;
  visibility: "Active" | "Draft" | "Hidden";
  description: string;
  coverAsset: string;
  pdfAsset: string;
  labels: string[];
  featured: boolean;
  downloads: number;
  sales: number;
}

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (product: EditableProduct) => void;
  editProduct?: EditableProduct | null;
}

const getInitialFormState = (product?: EditableProduct | null) => ({
  id: product?.id ?? Date.now(),
  title: product?.title ?? "",
  slug: product?.slug ?? "",
  price: product?.price ? String(product.price) : "",
  compareAtPrice: product?.compareAtPrice ? String(product.compareAtPrice) : "",
  category: product?.category ?? "",
  status: product?.status ?? "Active",
  visibility: product?.visibility ?? "Draft",
  description: product?.description ?? "",
  coverAsset: product?.coverAsset ?? "",
  pdfAsset: product?.pdfAsset ?? "",
  labels: product?.labels ?? [],
  featured: product?.featured ?? false,
  downloads: product?.downloads ? String(product.downloads) : "0",
  sales: product?.sales ? String(product.sales) : "0",
});

const labelOptions = ["Featured", "Best Seller", "On Sale", "New"];
const categories = ["Astrology", "Healing", "Meditation", "Numerology", "Vastu", "Bundles"];

export const ProductModal = ({ open, onOpenChange, onSave, editProduct }: ProductModalProps) => {
  const [form, setForm] = useState(getInitialFormState(editProduct));

  useEffect(() => {
    setForm(getInitialFormState(editProduct));
  }, [editProduct, open]);

  const handleSave = () => {
    if (!form.title.trim() || !form.slug.trim() || !form.price.trim() || !form.category.trim()) {
      toast.error("Title, slug, price, and category are required.");
      return;
    }

    const price = Number(form.price);
    const compareAtPrice = form.compareAtPrice.trim() ? Number(form.compareAtPrice) : null;

    onSave({
      id: form.id,
      title: form.title.trim(),
      slug: form.slug.trim(),
      price,
      compareAtPrice,
      category: form.category,
      status: form.visibility,
      visibility: form.visibility as EditableProduct["visibility"],
      description: form.description.trim(),
      coverAsset: form.coverAsset.trim(),
      pdfAsset: form.pdfAsset.trim(),
      labels: form.labels,
      featured: form.featured,
      downloads: Number(form.downloads) || 0,
      sales: Number(form.sales) || 0,
    });

    toast.success(editProduct ? "Product changes saved." : "Product draft created.");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{editProduct ? "Edit product" : "Add product"}</DialogTitle>
        </DialogHeader>

        <div className="grid max-h-[75vh] gap-5 overflow-y-auto py-2 pr-1">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="product-title">Title</Label>
              <Input
                id="product-title"
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                placeholder="Product name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-slug">Slug</Label>
              <Input
                id="product-slug"
                value={form.slug}
                onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
                placeholder="vedic-astrology-guide"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="product-price">Price</Label>
              <Input
                id="product-price"
                value={form.price}
                onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                placeholder="49"
              />
            </div>
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="product-compare-price">Compare-at price</Label>
              <Input
                id="product-compare-price"
                value={form.compareAtPrice}
                onChange={(event) => setForm((current) => ({ ...current, compareAtPrice: event.target.value }))}
                placeholder="79"
              />
            </div>
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="product-category">Category</Label>
              <Select value={form.category} onValueChange={(value) => setForm((current) => ({ ...current, category: value }))}>
                <SelectTrigger id="product-category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="product-visibility">Visibility</Label>
              <Select
                value={form.visibility}
                onValueChange={(value) => setForm((current) => ({ ...current, visibility: value }))}
              >
                <SelectTrigger id="product-visibility">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Hidden">Hidden</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-description">Description</Label>
            <Textarea
              id="product-description"
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              placeholder="Short admin-only note or summary"
              rows={5}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="product-cover-asset">Cover asset</Label>
              <Input
                id="product-cover-asset"
                value={form.coverAsset}
                onChange={(event) => setForm((current) => ({ ...current, coverAsset: event.target.value }))}
                placeholder="vedic-astrology-cover.webp"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-pdf-asset">PDF asset</Label>
              <Input
                id="product-pdf-asset"
                value={form.pdfAsset}
                onChange={(event) => setForm((current) => ({ ...current, pdfAsset: event.target.value }))}
                placeholder="vedic-astrology-guide.pdf"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Store labels</Label>
            <div className="flex flex-wrap gap-2">
              {labelOptions.map((label) => {
                const isActive = form.labels.includes(label);

                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        labels: isActive
                          ? current.labels.filter((currentLabel) => currentLabel !== label)
                          : [...current.labels, label],
                      }))
                    }
                    className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      isActive ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border bg-muted/20 p-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="product-downloads">Downloads</Label>
              <Input
                id="product-downloads"
                value={form.downloads}
                onChange={(event) => setForm((current) => ({ ...current, downloads: event.target.value }))}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-sales">Sales</Label>
              <Input
                id="product-sales"
                value={form.sales}
                onChange={(event) => setForm((current) => ({ ...current, sales: event.target.value }))}
                placeholder="0"
              />
            </div>
            <div className="flex items-center justify-between rounded-xl border bg-background px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">Feature on storefront</p>
                <p className="text-xs text-muted-foreground">Use for homepage or highlighted placements</p>
              </div>
              <Switch
                checked={form.featured}
                onCheckedChange={(checked) => setForm((current) => ({ ...current, featured: checked }))}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>{editProduct ? "Save Changes" : "Create Product"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
