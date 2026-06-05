import type { Metadata } from "next";
import { buildMetadata, siteConfig } from "@/lib/site";
import CustomersPage from "@/admin/Customers";

export const metadata: Metadata = buildMetadata({
  title: "Admin Customers",
  description: `Customer management for ${siteConfig.name}.`,
  path: "/admin/customers",
  noIndex: true,
});

export default CustomersPage;
