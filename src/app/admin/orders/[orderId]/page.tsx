import type { Metadata } from "next";
import { buildMetadata, siteConfig } from "@/lib/site";
import OrderDetailPage from "@/admin/OrderDetail";

export const metadata: Metadata = buildMetadata({
  title: "Admin Order",
  description: `Order detail view for ${siteConfig.name}.`,
  path: "/admin/orders/[orderId]",
  noIndex: true,
});

export default OrderDetailPage;
