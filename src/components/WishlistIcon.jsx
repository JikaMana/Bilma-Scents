import { Heart } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { useWish } from "../contexts/WishContext";

const CartIcon = () => {
  const { wishlist } = useWish();

  return (
    <div className="relative">
      <Link to="/wishlist" className="text-xl">
        <Heart className="w-6 h-6 sm:w-8 sm:h-8" />
      </Link>

      {wishlist.length > 0 && (
        <div className="absolute -top-[1px] -right-[2px] size-2 bg-red-500 rounded-full"></div>
      )}
    </div>
  );
};

export default CartIcon;
