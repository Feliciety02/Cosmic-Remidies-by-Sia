import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  badge?: string;
}

const ProductCard = ({ id, title, price, originalPrice, image, rating, badge }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const product = products.find((p) => p.id === id);
    if (product) addItem(product);
  };

  return (
    <Link to={`/product/${id}`} className="group block">
      <div className="bg-card rounded-lg border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          {badge && (
            <span className="absolute top-3 left-3 bg-gradient-gold text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full">{badge}</span>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-display text-base font-semibold leading-snug mb-2">{title}</h3>
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-3.5 w-3.5 ${i < rating ? "fill-accent text-accent" : "text-border"}`} />
            ))}
            <span className="text-sm text-muted-foreground ml-1">{rating}.0</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">${price}</span>
              {originalPrice && <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>}
            </div>
            <Button size="sm" className="text-sm h-9 px-4" onClick={handleAdd}>Add to Cart</Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
