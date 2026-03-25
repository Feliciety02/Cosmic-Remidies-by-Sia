import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What format are the guides in?", a: "All our guides are delivered as high-quality PDF files that you can read on any device — phone, tablet, or computer." },
  { q: "How do I receive my purchase?", a: "Instantly! After payment, you'll receive an email with download links within seconds. No waiting, no shipping." },
  { q: "Can I get a refund?", a: "Yes! We offer a 100% money-back guarantee within 30 days of purchase. If you're not satisfied, just email us and we'll refund you — no questions asked." },
  { q: "Are these guides suitable for beginners?", a: "Absolutely. Every guide is written in clear, simple language with step-by-step instructions. No prior spiritual knowledge is required." },
  { q: "Can I print the PDFs?", a: "Yes! All guides are designed to look beautiful both on screen and printed. Many include printable worksheets and templates." },
  { q: "Do you offer bundles or discounts?", a: "Yes, we frequently offer bundle deals and seasonal discounts. Sign up for our newsletter to be the first to know about special offers." },
  { q: "Is my payment secure?", a: "100%. All payments are processed through Paddle, a trusted global payment provider. We never see or store your card details." },
  { q: "Can I share the guides with friends?", a: "Our guides are for personal use only. However, we'd love it if you recommended us to friends — they can purchase their own copies at our affordable prices." },
];

const FAQPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">Frequently Asked Questions</h1>
      <p className="text-center text-muted-foreground mb-12">Everything you need to know about our guides.</p>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="bg-card border rounded-lg px-6">
            <AccordionTrigger className="text-left font-semibold text-sm hover:no-underline">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
    <Footer />
  </div>
);

export default FAQPage;
