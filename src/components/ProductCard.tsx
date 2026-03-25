import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import type { Product } from "@/data/products";

type ProductCardProps = Pick<Product, "id" | "title" | "price" | "originalPrice" | "image" | "rating" | "badge">;

const ProductCard = ({ id, title, price, originalPrice, image, rating, badge }: ProductCardProps) => (
  <div className="overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <Link href={`/product/${id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-gold px-3 py-1.5 text-xs font-bold text-primary-foreground">
            {badge}
          </span>
        )}
      </div>
    </Link>
    <div className="p-5">
      <Link href={`/product/${id}`} className="block">
        <h3 className="mb-2 font-display text-base font-semibold leading-snug">{title}</h3>
      </Link>
      <div className="mb-3 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className={`h-3.5 w-3.5 ${index < rating ? "fill-accent text-accent" : "text-border"}`} />
        ))}
        <span className="ml-1 text-sm text-muted-foreground">{rating}.0</span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">${price}</span>
          {originalPrice && <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>}
        </div>
        <AddToCartButton productId={id} size="sm" className="h-9 px-4 text-sm">
          Add to Cart
        </AddToCartButton>
      </div>
    </div>
  </div>
);

export default ProductCard;
