import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PrivacyPreferencesPanel from "@/components/PrivacyPreferencesPanel";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Settings",
  description: "Review how cookie consent and privacy preferences are handled on Cosmic Remedies by Sia.",
  path: "/cookie-settings",
});

const CookieSettingsPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-4 font-display text-3xl font-bold md:text-4xl">Cookie Settings</h1>
      <p className="mb-10 text-muted-foreground">
        Manage analytics, personalization, and data-sharing preferences directly from this browser.
      </p>

      <PrivacyPreferencesPanel />

      <div className="mt-10 space-y-6 text-sm leading-7 text-muted-foreground">
        <p>
          Strictly necessary cookies remain active so the storefront, cart, and account features continue to work. Other
          categories can be turned on or off here.
        </p>
        <p>
          These controls are stored locally in your browser for this environment and act as the visible privacy center for
          the storefront.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default CookieSettingsPage;
