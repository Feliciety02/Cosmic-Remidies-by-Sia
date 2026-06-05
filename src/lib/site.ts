import type { Metadata } from "next";

export const siteConfig = {
  name: "Cosmic Remedies by Sia",
  description:
    "Premium spiritual guides, Vedic remedies, and cosmic healing resources delivered instantly to your inbox.",
  supportEmail: "support@cosmicremediesbysia.com",
  storeUrl: "https://cosmicremediesbysia.com",
  location: "India",
  responseTime: "within 24 hours",
};

export const primaryNavLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export const authPanelId = "auth-panel";

export const buildAuthHref = (mode: "login" | "create" = "login") => `/?auth=${mode}#${authPanelId}`;

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteUrl = rawSiteUrl.startsWith("http") ? rawSiteUrl : `https://${rawSiteUrl}`;

export const absoluteUrl = (path = "/") => new URL(path, siteUrl).toString();

interface BuildMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  images?: string[];
  noIndex?: boolean;
}

export const buildMetadata = ({
  title,
  description = siteConfig.description,
  path = "/",
  images,
  noIndex = false,
}: BuildMetadataOptions): Metadata => ({
  title,
  description,
  alternates: {
    canonical: path,
  },
  openGraph: {
    title: title ?? siteConfig.name,
    description,
    siteName: siteConfig.name,
    type: "website",
    url: path,
    images,
  },
  twitter: {
    card: images?.length ? "summary_large_image" : "summary",
    title: title ?? siteConfig.name,
    description,
    images,
  },
  robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
});
