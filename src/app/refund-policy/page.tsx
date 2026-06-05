import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Refund Policy",
  description: `Understand the 30-day refund terms for digital products purchased from ${siteConfig.name}.`,
  path: "/refund-policy",
});

const RefundPolicyPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-4 font-display text-3xl font-bold md:text-4xl">Refund Policy</h1>
      <p className="mb-10 text-muted-foreground">
        We offer a 30-day customer-friendly refund policy designed to reduce purchase risk for first-time buyers.
      </p>

      <div className="space-y-8 text-sm leading-7 text-muted-foreground">
        <section>
          <h2 className="mb-2 font-display text-2xl text-foreground">30-Day Guarantee</h2>
          <p>
            If you are not satisfied with your purchase, contact us within 30 days of the transaction date and request
            a refund. Include the order email address and product name so we can find the order quickly.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-2xl text-foreground">How to Request a Refund</h2>
          <p>
            Send your request to <a className="underline underline-offset-2" href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.
            We aim to review refund requests within 24 hours on business days.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-2xl text-foreground">Processing</h2>
          <p>
            Refunds are returned to the original payment method through the payment provider used for the order. Timing
            depends on the payment processor and your bank or card issuer.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default RefundPolicyPage;
