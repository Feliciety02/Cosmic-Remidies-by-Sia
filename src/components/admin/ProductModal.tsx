"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EditableProduct {
  title: string;
  price: string;
  category: string;
  status: string;
}

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editProduct?: EditableProduct | null;
}

const getInitialFormState = (product?: EditableProduct | null) => ({
  title: product?.title ?? "",
  price: product?.price ?? "",
  category: product?.category ?? "",
  status: product?.status ?? "Active",
  description: "",
});

export const ProductModal = ({ open, onOpenChange, editProduct }: ProductModalProps) => {
  const [form, setForm] = useState(getInitialFormState(editProduct));

  useEffect(() => {
    setForm(getInitialFormState(editProduct));
  }, [editProduct, open]);

  const handleSave = () => {
    toast.success(editProduct ? "Product changes saved." : "Product draft created.");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{editProduct ? "Edit product" : "Add product"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="product-title">Title</Label>
            <Input
              id="product-title"
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              placeholder="Product name"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="product-price">Price</Label>
              <Input
                id="product-price"
                value={form.price}
                onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                placeholder="$49.99"
              />
            </div>
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="product-category">Category</Label>
              <Input
                id="product-category"
                value={form.category}
                onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                placeholder="Astrology"
              />
            </div>
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="product-status">Status</Label>
              <Input
                id="product-status"
                value={form.status}
                onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
                placeholder="Active"
              />
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
