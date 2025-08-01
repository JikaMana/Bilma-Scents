import React from "react";
import { Link } from "react-router-dom";
import bilmaLogo from "../assets/images/bilma-scents-logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#f5e4d3] text-gray-700">
      <div className="max-w-7xl mx-auto px-6 pt-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Logo and Quote */}
        <div>
          <img src={bilmaLogo} alt="Bilma Logo" className="h-32 mb-4" />
          <p className="text-sm italic text-gray-600 max-w-52">
            “A scent is a memory in motion – let Bilma tell your story.”
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/store" className="hover:underline">
                store
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:underline">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/terms" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/returns" className="hover:underline">
                Returns & Refunds
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h1 className="font-display italic text-5xl  sm:text-[100px] md:text-[136x] lg:text-[180px] xl:text-[224px] leading-tight underline text-[#E3BC9A] text-center">
          Bilma
        </h1>
      </div>
      <div className="text-center py-4 text-xs text-gray-500 border-t">
        © {new Date().getFullYear()} Bilma Scents. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
