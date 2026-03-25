import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";
import AdminPage from "@/admin/admin-page";

export const metadata: Metadata = buildMetadata({
  title: "Admin Dashboard",
  description: "Admin dashboard for Cosmic Remedies by Sia.",
  path: "/admin",
  noIndex: true,
});

export default AdminPage;
