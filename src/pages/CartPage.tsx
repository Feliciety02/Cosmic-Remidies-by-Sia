import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

const CartPage = () => {
  const { items, removeItem, updateQty, totalPrice } = useCart();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <h1 className="font-display text-2xl md:text-3xl font-bold mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-6">Your cart is empty.</p>
            <Link to="/shop"><Button size="lg">Browse Guides</Button></Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-card border rounded-lg p-4">
                  <img src={item.image} alt={item.title} className="w-20 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-[15px]">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">PDF Guide • Instant Delivery</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 border rounded-lg">
                        <button className="p-2 hover:bg-secondary rounded-l-lg" onClick={() => updateQty(item.id, item.qty - 1)}>
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-sm font-medium px-2">{item.qty}</span>
                        <button className="p-2 hover:bg-secondary rounded-r-lg" onClick={() => updateQty(item.id, item.qty + 1)}>
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-lg font-bold">${item.price * item.qty}</span>
                    </div>
                  </div>
                  <button className="text-muted-foreground hover:text-destructive self-start p-1" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <TrustBar />

            <div className="bg-card border rounded-lg p-6 mt-6">
              <div className="flex justify-between mb-2 text-[15px]">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between mb-4 text-[15px]">
                <span className="text-muted-foreground">Delivery</span>
                <span className="text-primary font-medium">Instant (Free)</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
              <Button size="lg" className="w-full mt-6 text-base">Proceed to Checkout</Button>
              <p className="text-sm text-center text-muted-foreground mt-3">Secure checkout powered by Paddle 🔒</p>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
