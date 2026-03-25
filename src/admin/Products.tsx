"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Edit, Eye, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import { ProductModal } from "@/components/admin/ProductModal";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const initialProducts = [
  { id: 1, title: "Vedic Astrology Guide", price: "$49.99", category: "Astrology", status: "Active", sales: 142, badge: "Best Seller" as string | null, image: "VA" },
  { id: 2, title: "Cosmic Healing Bundle", price: "$89.99", category: "Healing", status: "Active", sales: 98, badge: "New" as string | null, image: "CH" },
  { id: 3, title: "Chakra Meditation PDF", price: "$24.99", category: "Meditation", status: "Active", sales: 87, badge: null, image: "CM" },
  { id: 4, title: "Numerology Masterclass", price: "$59.99", category: "Numerology", status: "Active", sales: 64, badge: null, image: "NM" },
  { id: 5, title: "Crystal Healing Guide", price: "$34.99", category: "Healing", status: "Draft", sales: 0, badge: null, image: "CG" },
  { id: 6, title: "Vastu Shastra Essentials", price: "$39.99", category: "Vastu", status: "Active", sales: 45, badge: null, image: "VS" },
];

const Products = () => {
  const [products] = useState(initialProducts);
  const [addOpen, setAddOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<(typeof initialProducts)[number] | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<(typeof initialProducts)[number] | null>(null);

  return (
    <AdminLayout title="Products" subtitle="Manage your digital products">
      <div className="space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search products..." className="border-border bg-card pl-9" />
          </div>
          <Button onClick={() => setAddOpen(true)} className="gap-2 shrink-0 gradient-primary text-primary-foreground">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 md:gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group p-5 transition-shadow hover:shadow-md">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-base font-semibold text-primary">
                  {product.image}
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
              <p className="mb-3 text-sm text-muted-foreground">{product.category}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">{product.price}</span>
                <div className="flex items-center gap-2">
                  {product.badge ? <StatusBadge status={product.badge} /> : null}
                  <StatusBadge status={product.status} />
                </div>
              </div>
              <div className="mt-3 border-t pt-3 text-sm text-muted-foreground">{product.sales} sales</div>
            </Card>
          ))}
        </div>
      </div>

      <ProductModal open={addOpen} onOpenChange={setAddOpen} />

      <ProductModal
        open={!!editProduct}
        onOpenChange={(open) => {
          if (!open) {
            setEditProduct(null);
          }
        }}
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
          toast.success(`"${deleteTarget?.title}" has been removed.`);
          setDeleteTarget(null);
        }}
      />
    </AdminLayout>
  );
};

export default Products;
