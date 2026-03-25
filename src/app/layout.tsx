import type { Metadata } from "next";
import type { ReactNode } from "react";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import { siteConfig, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    locale: "en_US",
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en" suppressHydrationWarning>
    <body className={cn("min-h-screen bg-background font-sans text-foreground antialiased")}>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
