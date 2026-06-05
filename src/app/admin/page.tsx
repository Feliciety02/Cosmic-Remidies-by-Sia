import type { Metadata } from "next";
import { buildMetadata, siteConfig } from "@/lib/site";
import Dashboard from "@/admin/Index";

export const metadata: Metadata = buildMetadata({
  title: "Admin Dashboard",
  description: `Admin dashboard for ${siteConfig.name}.`,
  path: "/admin",
  noIndex: true,
});

export default Dashboard;
