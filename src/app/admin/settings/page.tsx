import type { Metadata } from "next";
import { buildMetadata, siteConfig } from "@/lib/site";
import SettingsPage from "@/admin/Settings";

export const metadata: Metadata = buildMetadata({
  title: "Admin Settings",
  description: `Admin settings for ${siteConfig.name}.`,
  path: "/admin/settings",
  noIndex: true,
});

export default SettingsPage;
