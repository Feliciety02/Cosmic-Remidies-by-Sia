import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";
import SettingsPage from "@/admin/Settings";

export const metadata: Metadata = buildMetadata({
  title: "Admin Settings",
  description: "Admin settings for Cosmic Remedies by Sia.",
  path: "/admin/settings",
  noIndex: true,
});

export default SettingsPage;
