import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ShoppingBag, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Store", path: "/store" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sm:flex justify-center fixed top-0 z-50 w-full">
      <div
        className={`max-w-[90%] w-full mx-auto flex justify-between items-center px-6 py-4 mt-4 shadow-md bg-white text-[#9c6a24] ${
          isOpen ? "rounded-t-4xl" : "rounded-full"
        }`}
      >
        <button
          className="sm:hidden focus:outline-none cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {/* Left Links */}
        <div className="hidden sm:flex gap-6 items-center text-sm font-semibold uppercase">
          <Link
            to="/shop"
            className="hover:text-[#E3BC9A] transition text-primary"
          >
            Shop
          </Link>
          <Link to="/about" className="hover:text-[#E3BC9A] transition">
            About
          </Link>
        </div>

        {/* Logo */}
        <div className="text-xl font-bold tracking-wide">
          <Link to="/">Bilma</Link>
        </div>

        {/* Right Links */}
        <div className="flex gap-6 items-center text-sm font-semibold uppercase">
          <Link
            to="/contact"
            className="hidden sm:block hover:text-[#E3BC9A] transition"
          >
            Contact
          </Link>
          <Link to="/cart" className="text-xl">
            <ShoppingBag />
          </Link>
        </div>
      </div>

      {/* mobile nav  */}
      <div
        className={`${
          isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        } transition-all duration-300 ease-in-out transform origin-top flex flex-col items-center sm:hidden px-4 pb-4 space-y-3 bg-white bgs-[#f1e7dd] max-w-[90%] w-full mx-auto`}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block text-lg font-medium ${
                isActive
                  ? "text-[#E3BC9A]"
                  : "text-[#9c6a24] hover:text-[#e3bc9a]"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
