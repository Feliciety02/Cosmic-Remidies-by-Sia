import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "Read the customer terms for buying and using digital PDF guides from Cosmic Remedies by Sia.",
  path: "/terms-of-service",
});

const TermsOfServicePage = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-4 font-display text-3xl font-bold md:text-4xl">Terms of Service</h1>
      <p className="mb-10 text-muted-foreground">
        These terms govern the purchase and use of digital products sold through this site.
      </p>

      <div className="space-y-8 text-sm leading-7 text-muted-foreground">
        <section>
          <h2 className="mb-2 font-display text-2xl text-foreground">Digital Product Licence</h2>
          <p>
            When you buy a PDF or related download, you receive a personal, non-transferable licence to use that
            content for your own personal use. You may not resell, redistribute, sublicense, share public download
            links, or use the content to train AI systems.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-2xl text-foreground">Orders and Delivery</h2>
          <p>
            Digital products are delivered electronically after successful payment. Delivery may occur on the order
            confirmation page, by email, or both. You are responsible for providing a valid email address at checkout.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-2xl text-foreground">Payments and Taxes</h2>
          <p>
            Payments may be processed by a merchant of record such as Paddle, which may calculate and collect local
            sales tax, VAT, or GST based on the customer&apos;s location.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-2xl text-foreground">Refunds</h2>
          <p>
            Refund eligibility is governed by our Refund Policy. Where a 30-day guarantee is offered on the storefront,
            that guarantee controls over any conflicting wording elsewhere on the site.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-2xl text-foreground">Governing Rules</h2>
          <p>
            Use of this site must comply with applicable law. Any dispute arising from these terms will be handled in a
            commercially reasonable venue chosen by the business, subject to mandatory consumer protection laws that
            apply to your location.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default TermsOfServicePage;
