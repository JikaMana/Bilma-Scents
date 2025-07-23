import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex justify-center shadow-2xl">
      <div className="max-w-[90%] w-full flex justify-between items-center px-6 py-4 my-4 shadow-md bg-white rounded-full fixed top-0 z-50 text-[#9c6a24]">
        {/* Left Links */}
        <div className="flex gap-6 items-center text-sm font-semibold uppercase">
          <Link
            to="/shop"
            className="hover:text-gray-500 transition text-primary"
          >
            Shop
          </Link>
          <Link to="/about" className="hover:text-gray-500 transition">
            About
          </Link>
        </div>

        {/* Logo */}
        <div className="text-xl font-bold tracking-wide">
          <Link to="/">Bilma</Link>
        </div>

        {/* Right Links */}
        <div className="flex gap-6 items-center text-sm font-semibold uppercase">
          <Link to="/contact" className="hover:text-gray-500 transition">
            Contact
          </Link>
          <Link to="/cart" className="text-xl">
            <ShoppingBag />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
