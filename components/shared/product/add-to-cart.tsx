"use client";

import { CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { addItemToCart } from "@/lib/actions/cart-actions";

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();

  const handleAddToCart = async () => {
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
  };

  return (
    <Button
      className="w-full hover:cursor-pointer"
      type="button"
      onClick={handleAddToCart}
    >
      Add To Cart
    </Button>
  );
};

export default AddToCart;
