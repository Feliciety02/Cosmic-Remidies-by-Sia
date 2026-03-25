"use client";

import type { MouseEvent } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

interface AddToCartButtonProps extends ButtonProps {
  productId: string;
}

const AddToCartButton = ({ productId, onClick, children = "Add to Cart", ...props }: AddToCartButtonProps) => {
  const { addItem } = useCart();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    const product = products.find((item) => item.id === productId);

    if (product) {
      addItem(product);
    }
  };

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  );
};

export default AddToCartButton;
