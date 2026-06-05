import type { Metadata } from "next";
import { buildMetadata, siteConfig } from "@/lib/site";
import OrdersPage from "@/admin/Orders";

export const metadata: Metadata = buildMetadata({
  title: "Admin Orders",
  description: `Order management for ${siteConfig.name}.`,
  path: "/admin/orders",
  noIndex: true,
});

export default OrdersPage;
