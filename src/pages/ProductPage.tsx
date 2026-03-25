import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import { products, testimonials } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Star, Shield, Zap, Download, Check } from "lucide-react";

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/shop"><Button>Back to Shop</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Image */}
          <div>
            <div className="rounded-xl overflow-hidden border bg-card">
              <img src={product.image} alt={product.title} className="w-full aspect-[3/4] object-cover" />
            </div>
          </div>

          {/* Right: Buying panel */}
          <div>
            {product.badge && (
              <span className="inline-block bg-gradient-gold text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-4">{product.badge}</span>
            )}
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-3">{product.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < product.rating ? "fill-accent text-accent" : "text-border"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating}.0 • 100+ reviews</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="bg-destructive/10 text-destructive text-xs font-bold px-2 py-0.5 rounded">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <Button size="lg" className="w-full text-base mb-4 gap-2">
              Add to Cart
            </Button>

            <div className="flex gap-4 mb-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> 30-day guarantee</span>
              <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> Instant delivery</span>
              <span className="flex items-center gap-1"><Download className="h-3 w-3" /> PDF format</span>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">What's Inside:</h3>
              <ul className="space-y-2">
                {product.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-6 mt-6">
              <h3 className="font-semibold mb-3">About This Guide</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Sticky mobile CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-4 lg:hidden z-40">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold">${product.price}</span>
              {product.originalPrice && <span className="text-sm text-muted-foreground line-through ml-2">${product.originalPrice}</span>}
            </div>
            <Button className="gap-2">Add to Cart</Button>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-16">
          <h2 className="font-display text-xl font-bold mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="mt-16 pb-20 lg:pb-0">
          <h2 className="font-display text-xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </section>
      </div>
      <TrustBar />
      <Footer />
    </div>
  );
};

export default ProductPage;
