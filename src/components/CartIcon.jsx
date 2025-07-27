import { ShoppingBag } from "lucide-react";
import React, { Fragment } from "react";
import { Link } from "react-router";
import { useCart } from "../contexts/CartContext";

const CartIcon = () => {
  const { totalItems } = useCart();

  return (
    <div className="relative">
      <Link to="/cart" className="text-xl">
        <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8" />
      </Link>

      {totalItems > 0 && (
        <div className="absolute -top-2 -right-1 flex items-center justify-center size-5 bg-[#e3bc9a] rounded-full">
          <p className="small-bold text-white">{totalItems}</p>
        </div>
      )}
    </div>
  );
};

export default CartIcon;
