"use client";

import { Cart, CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart-actions";
import { useTransition } from "react";

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);

      if (!res.success) {
        toast.error(res.message || "Failed to add item to cart");
      } else {
        toast.success(res.message, {
          action: (
            <button
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-3 py-1 text-white hover:bg-gray-600"
              onClick={() => router.push("/cart")}
            >
              <Plus className="h-5 w-5" />
              Go To Cart
            </button>
          ),
        });
      }
    });
  };

  //Handle remove from cart
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      if (!res.success) {
        toast.error(res.message || "Failed to remove item to cart");
      } else {
        toast.success(res.message, {
          action: (
            <button
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-3 py-1 text-white hover:bg-gray-600"
              onClick={() => router.push("/cart")}
            >
              <Plus className="h-5 w-5" />
              Go To Cart
            </button>
          ),
        });
      }
    });
  };

  // Check if item is in cart
  const existItem =
    cart && cart.items.find(x => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button
      className="w-full hover:cursor-pointer"
      type="button"
      onClick={handleAddToCart}
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
      Add To Cart
    </Button>
  );
};

export default AddToCart;
