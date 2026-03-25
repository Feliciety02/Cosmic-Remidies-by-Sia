import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";
import ContentPage from "@/admin/Content";

export const metadata: Metadata = buildMetadata({
  title: "Admin Content",
  description: "Content management for Cosmic Remedies by Sia.",
  path: "/admin/content",
  noIndex: true,
});

export default ContentPage;
