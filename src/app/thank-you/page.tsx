import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Download, Mail } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
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
    <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle className="h-8 w-8 text-primary" />
      </div>
      <h1 className="mb-3 font-display text-3xl font-bold">Thank You for Your Purchase!</h1>
      <p className="mb-8 text-muted-foreground">Your guides are on their way to your inbox. Check your email for the download links.</p>

      <div className="mb-8 rounded-lg border bg-card p-6 text-left">
        <div className="mb-4 flex items-center gap-3">
          <Mail className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-semibold">Check your email</p>
            <p className="text-xs text-muted-foreground">Download links sent to your inbox</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Download className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-semibold">Instant access</p>
            <p className="text-xs text-muted-foreground">Your PDFs are ready to download</p>
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-lg border bg-teal-light/30 p-6">
        <h2 className="mb-2 font-display text-lg font-bold">Special Offer Just for You</h2>
        <p className="mb-4 text-sm text-muted-foreground">Get 40% off any additional guide within the next 30 minutes.</p>
        <Button asChild className="gap-2">
          <Link href="/shop">Browse More Guides</Link>
        </Button>
      </div>

      <h2 className="mb-6 font-display text-xl font-bold">You Might Also Love</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {products.slice(2, 5).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default ThankYouPage;
