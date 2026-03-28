import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Learn what data Cosmic Remedies by Sia collects, why it is collected, and how privacy requests are handled.",
  path: "/privacy-policy",
});

const PrivacyPolicyPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-4 font-display text-3xl font-bold md:text-4xl">Privacy Policy</h1>
      <p className="mb-10 text-muted-foreground">
        This policy explains what data we collect, how we use it, and how customers in the EU, UK, USA, Canada,
        and Australia can exercise their privacy rights.
      </p>

      <div className="space-y-8 text-sm leading-7 text-muted-foreground">
        <section>
          <h2 className="mb-2 font-display text-2xl text-foreground">What We Collect</h2>
          <p>
            We collect information you provide directly, including your name, email address, order details, support
            requests, and any details you enter into forms on this site. We also collect technical information such as
            IP address, browser type, device information, and cookie or consent preferences once those tools are fully
            configured.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-2xl text-foreground">Why We Collect It</h2>
          <p>
            We use personal data to deliver digital products, respond to support messages, process refunds, send
            requested lead magnets, improve the website, and measure marketing performance where consent has been
            granted.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-2xl text-foreground">Who We Share It With</h2>
          <p>
            Depending on the services connected at launch, data may be shared with payment providers such as Paddle,
            email platforms such as Klaviyo or MailerLite, analytics providers such as Google Analytics and Microsoft
            Clarity, and advertising platforms such as Meta and Google Ads. We only share data necessary to provide the
            service or measure campaign performance.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-2xl text-foreground">Retention</h2>
          <p>
            We keep customer and lead data only as long as needed to fulfill orders, provide support, meet tax and
            accounting obligations, comply with legal requirements, and maintain suppression records for opted-out
            users.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-2xl text-foreground">Your Rights</h2>
          <p>
            You may request access, correction, deletion, or export of your personal data. EU and UK visitors may also
            object to processing or request restriction. California residents may request disclosure of collected data
            categories and may opt out of sale or sharing under applicable law.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-2xl text-foreground">Contact</h2>
          <p>
            For privacy requests, email <a className="underline underline-offset-2" href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicyPage;
