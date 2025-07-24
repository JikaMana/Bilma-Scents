import { ShoppingBag } from "lucide-react";
import React, { Fragment } from "react";
import { Link } from "react-router";

const CartIcon = () => {
  const totalItems = 10;

  return (
    <div className="relative">
      <Link to="/cart" className="text-xl">
        <ShoppingBag size={32} />
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
