import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";
import OrdersPage from "@/admin/Orders";

export const metadata: Metadata = buildMetadata({
  title: "Admin Orders",
  description: "Order management for Cosmic Remedies by Sia.",
  path: "/admin/orders",
  noIndex: true,
});

export default OrdersPage;
