import React from "react";
import { Link } from "react-router-dom";
import heroBackground from "../assets/images/background/heroBackground.webp";

const Hero = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-center text-white"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold font-display italic mb-6 max-w-xl">
        Elevate everyday moments to extraordinary.
      </h1>
      <Link
        // to="/shop"
        to="#"
        className="bg-white text-black px-6 py-3 rounded-full font-semibold font-manrope hover:bg-opacity-90 transition"
      >
        SHOP OUR FRAGRANCES
      </Link>
    </div>
  );
};

export default Hero;
