"use client";

import { useState, type MouseEvent } from "react";
import AuthRequiredDialog from "@/components/AuthRequiredDialog";
import { Button, type ButtonProps } from "@/components/ui/button";
import { products } from "@/data/products";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

interface AddToCartButtonProps extends ButtonProps {
  productId: string;
}

const AddToCartButton = ({ productId, onClick, children = "Add to Cart", ...props }: AddToCartButtonProps) => {
  const { addItem } = useCart();
  const { user, isHydrated } = useAuth();
  const [authPrompt, setAuthPrompt] = useState<"guest" | "admin" | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (!isHydrated) {
      return;
    }

    if (user?.role !== "customer") {
      setAuthPrompt(user?.role === "admin" ? "admin" : "guest");
      return;
    }

    const product = products.find((item) => item.id === productId);

    if (product) {
      addItem(product);
    }
  };

  return (
    <>
      <Button {...props} disabled={props.disabled || !isHydrated} onClick={handleClick}>
        {children}
      </Button>
      <AuthRequiredDialog
        open={authPrompt !== null}
        onOpenChange={(open) => {
          if (!open) {
            setAuthPrompt(null);
          }
        }}
        variant={authPrompt ?? "guest"}
      />
    </>
  );
};

export default AddToCartButton;
