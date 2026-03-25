import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";
import CustomersPage from "@/admin/Customers";

export const metadata: Metadata = buildMetadata({
  title: "Admin Customers",
  description: "Customer management for Cosmic Remedies by Sia.",
  path: "/admin/customers",
  noIndex: true,
});

export default CustomersPage;
