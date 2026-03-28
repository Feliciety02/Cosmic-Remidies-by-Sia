import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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
        A consent management platform will appear here once the production CMP account is connected.
      </p>

      <div className="space-y-6 text-sm leading-7 text-muted-foreground">
        <p>
          The production storefront is intended to block analytics and advertising cookies until a visitor grants
          consent. That final behavior depends on the CMP provider account, such as Termly or Cookiebot, being
          connected in the deployment environment.
        </p>
        <p>
          Until that configuration is completed, use this page as the visible footer destination required by the PRD,
          and finish the live consent integration before launch.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default CookieSettingsPage;
