import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { Trash2, Plus, Minus } from "lucide-react";

const CartPage = () => {
  // Static demo cart with first 2 products
  const cartItems = products.slice(0, 2).map((p) => ({ ...p, qty: 1 }));
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <h1 className="font-display text-2xl md:text-3xl font-bold mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">Your cart is empty.</p>
            <Link to="/shop"><Button>Browse Guides</Button></Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 bg-card border rounded-lg p-4">
                  <img src={item.image} alt={item.title} className="w-20 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">PDF Guide • Instant Delivery</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 border rounded-lg">
                        <button className="p-1.5 hover:bg-secondary rounded-l-lg"><Minus className="h-3 w-3" /></button>
                        <span className="text-sm font-medium px-1">{item.qty}</span>
                        <button className="p-1.5 hover:bg-secondary rounded-r-lg"><Plus className="h-3 w-3" /></button>
                      </div>
                      <span className="font-bold">${item.price}</span>
                    </div>
                  </div>
                  <button className="text-muted-foreground hover:text-destructive self-start">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <TrustBar />

            <div className="bg-card border rounded-lg p-6 mt-6">
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between mb-4 text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className="text-primary font-medium">Instant (Free)</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total}</span>
              </div>
              <Button size="lg" className="w-full mt-6 text-base">Proceed to Checkout</Button>
              <p className="text-xs text-center text-muted-foreground mt-3">Secure checkout powered by Paddle 🔒</p>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
