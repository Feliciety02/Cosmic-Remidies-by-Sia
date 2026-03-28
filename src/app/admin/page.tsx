import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";
import Dashboard from "@/admin/Index";

export const metadata: Metadata = buildMetadata({
  title: "Admin Dashboard",
  description: "Admin dashboard for Cosmic Remedies by Sia.",
  path: "/admin",
  noIndex: true,
});

export default Dashboard;
