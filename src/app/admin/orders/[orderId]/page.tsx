import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";
import OrderDetailPage from "@/admin/OrderDetail";

export const metadata: Metadata = buildMetadata({
  title: "Admin Order",
  description: "Order detail view for Cosmic Remedies by Sia.",
  path: "/admin/orders/[orderId]",
  noIndex: true,
});

export default OrderDetailPage;
