import type { Metadata } from "next";
import { buildMetadata, siteConfig } from "@/lib/site";
import AnalyticsPage from "@/admin/Analytics";

export const metadata: Metadata = buildMetadata({
  title: "Admin Analytics",
  description: `Analytics dashboard for ${siteConfig.name}.`,
  path: "/admin/analytics",
  noIndex: true,
});

export default AnalyticsPage;
