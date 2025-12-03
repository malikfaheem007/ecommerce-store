"use client";
import {Product} from "@/sanity.types";
import {Button} from "./ui/button";
import {ShoppingBag} from "lucide-react";
import {cn} from "@/lib/utils";
import useStore from "@/store";
import toast from "react-hot-toast";

interface Props {
  product?: Product;
  className?: string;
}
const AddToCartButton = ({product, className}: Props) => {
  const {addItem, getItemCount} = useStore();
  const itemCount = getItemCount(product?._id as string);
  const isOutOfStock = product?.stock === 0;
  const handleAddToCart = () => {
    if ((product?.stock as number) > itemCount) {
      addItem(product as Product);
      toast.success(
        `${product?.name?.substring(0, 12)} ...added successfully!`
      );
    }
  };
  return (
    <div>
      <Button
        disabled={isOutOfStock}
        onClick={handleAddToCart}
        className={cn(
          "w-full bg-shop_dark_green/80 text-shop_light_bg shadow-none border border-shop_dark_green/80 font-semibold tracking-wide hover:text-white hover:bg-shop_dark_green hover:border-shop_dark_green hoverEffect",
          className
        )}>
        <ShoppingBag /> {isOutOfStock ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
};

export default AddToCartButton;
