import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Reach out to ${siteConfig.name} for support, product questions, or partnership inquiries.`,
  path: "/contact",
});

const ContactPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-4 text-center font-display text-3xl font-bold md:text-4xl">Get in Touch</h1>
      <p className="mb-12 text-center text-muted-foreground">Have a question or need help? We&apos;d love to hear from you.</p>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 text-center">
          <Mail className="mx-auto mb-3 h-6 w-6 text-primary" />
          <h3 className="mb-1 text-sm font-semibold">Email Us</h3>
          <p className="text-sm text-muted-foreground">{siteConfig.supportEmail}</p>
        </div>
        <div className="rounded-lg border bg-card p-6 text-center">
          <MessageCircle className="mx-auto mb-3 h-6 w-6 text-primary" />
          <h3 className="mb-1 text-sm font-semibold">Response Time</h3>
          <p className="text-sm text-muted-foreground">Usually {siteConfig.responseTime}</p>
        </div>
      </div>

      <ContactForm />
    </div>
    <Footer />
  </div>
);

export default ContactPage;
