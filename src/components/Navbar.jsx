import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, Menu, User, X } from "lucide-react";
import bilmaLogo from "../assets/images/bilma-scents-logo.png";
import { motion } from "framer-motion";
import CartIcon from "./CartIcon";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Store", path: "/store" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      className="fixed top-0 left-0 w-full z-50 sm:flex justify-center "
    >
      <div
        className={`backdrop-blur bg-white/70  text-[#9c6a24] max-w-[90%] w-full mx-auto flex justify-between items-center px-6 py-4 mt-4 shadow-md ${
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
        <div className="hidden sm:flex gap-6 items-center text-sm font-bold uppercase">
          <Link to="/" className="hover:text-[#E3BC9A] transition">
            Home
          </Link>
          <Link to="/store" className="">
            store
          </Link>
        </div>

        {/* Logo */}
        <div>
          <Link
            to="/"
            className="flex items-center gap-1 sm:gap-2 text-lg sm:text-xl font-bold tracking-wide"
          >
            <p>Bilma </p>

            <img
              src={bilmaLogo}
              alt="Bilma Logo"
              className="h-8 w-8 md:h-10 md:w-10 hidden sm:block"
            />
            <p className="hidden sm:block">Scents</p>
          </Link>
        </div>

        {/* Right Links */}
        <div className="flex gap-3 sm:gap-6 items-center text-sm font-bold uppercase">
          <Link
            to="/contact"
            className="hidden sm:block hover:text-[#E3BC9A] transition"
          >
            Contact
          </Link>

          <div className="relative group">
            <Link to="/wishlist" className="text-xl">
              <Heart size={32} />
            </Link>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 p-2 text-xs text-[#9c6a24] bg-[#E3BC9A] rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Wishlist
            </span>
          </div>

          <div className="relative group">
            <CartIcon />

            <span className="absolute top-8 left-1/2 -translate-x-1/2 p-2 text-xs text-[#9c6a24] whitespace-nowrap bg-[#E3BC9A] rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Shopping Cart
            </span>
          </div>

          <div className="relative group">
            <Link to="/login" className="text-xl">
              <User size={32} />
            </Link>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 p-2 text-xs text-[#9c6a24] bg-[#E3BC9A] rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Account
            </span>
          </div>
        </div>
      </div>

      {/* mobile nav  */}
      <div
        className={`${
          isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        } transition-all duration-300 ease-in-out transform origin-top flex flex-col items-center sm:hidden px-4 py-4 space-y-3 bg-white/70  max-w-[90%] w-full mx-auto border-t-2 border-[#9c6a24] rounded-b-4xl`}
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
    </motion.nav>
  );
};

export default Navbar;
