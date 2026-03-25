import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description: "Get answers about guide delivery, refunds, PDF access, payment security, and more.",
  path: "/faq",
});

const faqs = [
  {
    q: "What format are the guides in?",
    a: "All our guides are delivered as high-quality PDF files that you can read on any device, including phone, tablet, or computer.",
  },
  {
    q: "How do I receive my purchase?",
    a: "Instantly. After payment, you'll receive an email with download links within seconds. No waiting and no shipping.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes. We offer a 100% money-back guarantee within 30 days of purchase. If you're not satisfied, email us and we'll refund you.",
  },
  {
    q: "Are these guides suitable for beginners?",
    a: "Absolutely. Every guide is written in clear language with step-by-step instructions. No prior spiritual knowledge is required.",
  },
  {
    q: "Can I print the PDFs?",
    a: "Yes. All guides are designed to look beautiful both on screen and printed. Many include printable worksheets and templates.",
  },
  {
    q: "Do you offer bundles or discounts?",
    a: "Yes, we frequently offer bundle deals and seasonal discounts. Sign up for our newsletter to hear about special offers first.",
  },
  {
    q: "Is my payment secure?",
    a: "Yes. Payments are processed through Paddle, a trusted global payment provider. We never see or store your card details.",
  },
  {
    q: "Can I share the guides with friends?",
    a: "Our guides are for personal use only. If you want to recommend them, please send friends to the shop so they can buy their own copies.",
  },
];

const FAQPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-4 text-center font-display text-3xl font-bold md:text-4xl">Frequently Asked Questions</h1>
      <p className="mb-12 text-center text-muted-foreground">Everything you need to know about our guides.</p>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <details key={faq.q} className="group rounded-lg border bg-card px-6 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-semibold">
              <span>{faq.q}</span>
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <p className="pt-4 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default FAQPage;
