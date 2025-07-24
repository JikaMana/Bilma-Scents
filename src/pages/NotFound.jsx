import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
      <h1 className="text-6xl font-extrabold text-[#9c6a24] mb-4">404</h1>
      <p className="text-2xl text-[#9c6a24] mb-2">Oops! Page not found.</p>
      <p className="text-[#E3BC9A] mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 text-white bg-[#9c6a24] hover:bg-[E3BC9A] transition rounded-full"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
