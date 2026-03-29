import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ThankYouPageClient from "@/components/ThankYouPageClient";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Thank You",
  description: "Thank you for your purchase from Cosmic Remedies by Sia.",
  path: "/thank-you",
  noIndex: true,
});

const ThankYouPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <ThankYouPageClient />
    <Footer />
  </div>
);

export default ThankYouPage;
