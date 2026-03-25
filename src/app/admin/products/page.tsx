import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";
import ProductsPage from "@/admin/Products";

export const metadata: Metadata = buildMetadata({
  title: "Admin Products",
  description: "Product management for Cosmic Remedies by Sia.",
  path: "/admin/products",
  noIndex: true,
});

export default ProductsPage;
