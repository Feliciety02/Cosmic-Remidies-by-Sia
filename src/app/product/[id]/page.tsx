import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Download, Shield, Star, Zap } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import TrustBar from "@/components/TrustBar";
import { Button } from "@/components/ui/button";
import { getProductById, products, testimonials } from "@/data/products";
import { buildMetadata } from "@/lib/site";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export const dynamicParams = false;

export const generateStaticParams = () => products.map((product) => ({ id: product.id }));

export const generateMetadata = ({ params }: ProductPageProps): Metadata => {
  const product = getProductById(params.id);

  if (!product) {
    return buildMetadata({
      title: "Product Not Found",
      path: `/product/${params.id}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: product.title,
    description: product.description,
    path: `/product/${product.id}`,
    images: [product.image.src],
  });
};

const ProductPage = ({ params }: ProductPageProps) => {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const related = products.filter((item) => item.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-10 lg:h-[calc(100vh-7rem)] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:flex lg:h-[calc(100vh-7rem)] lg:items-center">
            <Image
              src={product.image}
              alt={product.title}
              priority
              className="mx-auto aspect-[3/4] max-h-[72vh] w-full object-contain lg:max-h-[calc(100vh-9rem)]"
              sizes="(min-width: 1024px) 32vw, (min-width: 768px) 52vw, 92vw"
            />
          </div>

          <div className="lg:h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-3">
            {product.badge && (
              <span className="mb-4 inline-block rounded-full bg-gradient-gold px-4 py-1.5 text-sm font-bold text-primary-foreground">
                {product.badge}
              </span>
            )}
            <h1 className="mb-3 font-display text-2xl font-bold md:text-3xl">{product.title}</h1>
            <div className="mb-5 flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${index < product.rating ? "fill-accent text-accent" : "text-border"}`}
                  />
                ))}
              </div>
              <span className="text-[15px] text-muted-foreground">{product.rating}.0 | 100+ reviews</span>
            </div>

            <div className="mb-8 flex items-baseline gap-3">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice && <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>}
              {product.originalPrice && (
                <span className="rounded bg-destructive/10 px-2.5 py-1 text-sm font-bold text-destructive">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <AddToCartButton productId={product.id} size="lg" className="mb-5 h-12 w-full gap-2 text-base">
              Add to Cart
            </AddToCartButton>

            <div className="mb-8 flex flex-wrap gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4" /> 30-day guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4" /> Instant delivery
              </span>
              <span className="flex items-center gap-1.5">
                <Download className="h-4 w-4" /> PDF format
              </span>
            </div>

            <div className="border-t pt-6">
              <h3 className="mb-4 text-lg font-semibold">What&apos;s Inside</h3>
              <ul className="space-y-3">
                {product.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-[15px]">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t pt-6">
              <h3 className="mb-3 text-lg font-semibold">About This Guide</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">{product.description}</p>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-card p-4 lg:hidden">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="ml-2 text-sm text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
            <AddToCartButton productId={product.id} className="h-11 px-6">
              Add to Cart
            </AddToCartButton>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="mb-6 font-display text-xl font-bold">Customer Reviews</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </section>

        <section className="mt-16 pb-20 lg:pb-0">
          <h2 className="mb-6 font-display text-xl font-bold">You May Also Like</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href="/shop">Back to Shop</Link>
            </Button>
          </div>
        </section>
      </div>
      <TrustBar />
      <Footer />
    </div>
  );
};

export default ProductPage;
