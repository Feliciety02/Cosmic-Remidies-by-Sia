import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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
        California residents can use this page to request that we stop selling or sharing personal information where
        applicable under California law.
      </p>

      <div className="space-y-6 text-sm leading-7 text-muted-foreground">
        <p>
          Advertising and analytics platforms may qualify as data sharing under some privacy laws. If you want to make
          a request, contact us at{" "}
          <a className="underline underline-offset-2" href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>{" "}
          with the subject line &quot;Do Not Sell or Share Request&quot;.
        </p>
        <p>
          Once a full consent management platform is connected, this page will also link directly to your privacy
          preference controls.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default DoNotSellPage;
