import type { Metadata } from "next";
import { buildMetadata, siteConfig } from "@/lib/site";
import ProductsPage from "@/admin/Products";

export const metadata: Metadata = buildMetadata({
  title: "Admin Products",
  description: `Product management for ${siteConfig.name}.`,
  path: "/admin/products",
  noIndex: true,
});

export default ProductsPage;
