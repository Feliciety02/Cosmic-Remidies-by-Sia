import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";
import AnalyticsPage from "@/admin/Analytics";

export const metadata: Metadata = buildMetadata({
  title: "Admin Analytics",
  description: "Analytics dashboard for Cosmic Remedies by Sia.",
  path: "/admin/analytics",
  noIndex: true,
});

export default AnalyticsPage;
