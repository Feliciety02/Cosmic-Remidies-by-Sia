import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Mail } from "lucide-react";

const ThankYouPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-8 w-8 text-primary" />
      </div>
      <h1 className="font-display text-3xl font-bold mb-3">Thank You for Your Purchase!</h1>
      <p className="text-muted-foreground mb-8">Your guides are on their way to your inbox. Check your email for the download links.</p>

      <div className="bg-card border rounded-lg p-6 mb-8 text-left">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="h-5 w-5 text-primary" />
          <div>
            <p className="font-semibold text-sm">Check your email</p>
            <p className="text-xs text-muted-foreground">Download links sent to your inbox</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Download className="h-5 w-5 text-primary" />
          <div>
            <p className="font-semibold text-sm">Instant access</p>
            <p className="text-xs text-muted-foreground">Your PDFs are ready to download</p>
          </div>
        </div>
      </div>

      {/* Upsell */}
      <div className="bg-teal-light/30 border rounded-lg p-6 mb-8">
        <h2 className="font-display text-lg font-bold mb-2">🎁 Special Offer — Just for You</h2>
        <p className="text-sm text-muted-foreground mb-4">Get 40% off any additional guide within the next 30 minutes!</p>
        <Link to="/shop">
          <Button className="gap-2">Browse More Guides</Button>
        </Link>
      </div>

      <h2 className="font-display text-xl font-bold mb-6">You Might Also Love</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {products.slice(2, 5).map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default ThankYouPage;
