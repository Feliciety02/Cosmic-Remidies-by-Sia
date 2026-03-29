import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PrivacyPreferencesPanel from "@/components/PrivacyPreferencesPanel";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Do Not Sell or Share My Personal Information",
  description: "California privacy disclosures and opt-out instructions for visitors to Cosmic Remedies by Sia.",
  path: "/do-not-sell",
});

const DoNotSellPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-4 font-display text-3xl font-bold md:text-4xl">Do Not Sell or Share My Personal Information</h1>
      <p className="mb-10 text-muted-foreground">
        California residents can use this page to opt out of sale or sharing signals in this browser and to submit a manual request if needed.
      </p>

      <PrivacyPreferencesPanel variant="do-not-sell" />

      <div className="mt-10 space-y-6 text-sm leading-7 text-muted-foreground">
        <p>
          Turning off sale or sharing keeps advertising-related sharing disabled in this browser. If you also want a manual
          request on file, email{" "}
          <a className="underline underline-offset-2" href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>{" "}
          with the subject line &quot;Do Not Sell or Share Request&quot;.
        </p>
        <p>
          You can review broader analytics and personalization settings at <a className="underline underline-offset-2" href="/cookie-settings">Cookie Settings</a>.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default DoNotSellPage;
