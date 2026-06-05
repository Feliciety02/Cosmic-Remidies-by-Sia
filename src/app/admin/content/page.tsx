import type { Metadata } from "next";
import { buildMetadata, siteConfig } from "@/lib/site";
import ContentPage from "@/admin/Content";

export const metadata: Metadata = buildMetadata({
  title: "Admin Content",
  description: `Content management for ${siteConfig.name}.`,
  path: "/admin/content",
  noIndex: true,
});

export default ContentPage;
