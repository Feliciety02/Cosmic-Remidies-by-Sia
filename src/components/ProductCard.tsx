import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import type { Product } from "@/data/products";

type ProductCardProps = Pick<Product, "id" | "title" | "price" | "originalPrice" | "image" | "rating" | "badge">;

const ProductCard = ({ id, title, price, originalPrice, image, rating, badge }: ProductCardProps) => (
  <div className="mx-auto flex h-full w-full max-w-[18rem] flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <Link href={`/product/${id}`} className="group block">
      <div className="relative border-b bg-[linear-gradient(180deg,rgba(248,247,244,1)_0%,rgba(244,242,236,0.85)_100%)] px-5 py-6">
        {badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-[linear-gradient(135deg,#c89446_0%,#a86c2b_100%)] px-3 py-1.5 text-xs font-bold text-white shadow-[0_8px_24px_rgba(168,108,43,0.28)]">
            {badge}
          </span>
        )}
        <div className="mx-auto flex min-h-[16rem] items-center justify-center">
          <div className="relative aspect-[2/3] w-full max-w-[9.25rem] overflow-hidden rounded-md border border-border/60 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.12)] transition-transform duration-500 group-hover:scale-[1.03]">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(min-width: 1280px) 12vw, (min-width: 1024px) 16vw, (min-width: 640px) 24vw, 40vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Link>
    <div className="flex flex-1 flex-col p-4">
      <Link href={`/product/${id}`} className="block">
        <h3 className="mb-2 line-clamp-2 font-display text-[15px] font-semibold leading-snug">{title}</h3>
      </Link>
      <div className="mb-3 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className={`h-3.5 w-3.5 ${index < rating ? "fill-amber-400 text-amber-400" : "text-border"}`} />
        ))}
        <span className="ml-1 text-sm text-muted-foreground">{rating}.0</span>
      </div>
      <div className="mt-auto flex items-center justify-between gap-3">
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
