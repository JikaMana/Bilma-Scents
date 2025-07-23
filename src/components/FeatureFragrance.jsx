import React from "react";
import testPerfume from "../assets/images/perfumes/parfum.webp";
import { Link } from "react-router";

const FeatureFragrance = () => {
  const perfume = [
    {
      image: testPerfume,
      name: "Meadow",
      flavour: "BREEXY & JOYFUL",
      price: "N35,000",
    },
    {
      image: testPerfume,
      name: "Meadow",
      flavour: "BREEXY & JOYFUL",
      price: "N35,000",
    },
    {
      image: testPerfume,
      name: "Meadow",
      flavour: "BREEXY & JOYFUL",
      price: "N35,000",
    },
    {
      image: testPerfume,
      name: "Meadow",
      flavour: "BREEXY & JOYFUL",
      price: "N35,000",
    },
  ];

  return (
    <section className="py-12 px-6 bg-[--color-primary]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-medium font-display italic mb-8">
          Featured Fragrance
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {perfume.map((item, index) => (
            <Link
              to="#"
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="h-64 w-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain bg-[#E3BC9A]"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold font-manrope">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 font-merriweather">
                  {item.flavour}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-black font-bold">{item.price}</p>
                  <button className="bg-[#E3BC9A] text-white text-sm px-4 py-2 rounded hover:bg-[#f1e7dd] cursor-pointer transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureFragrance;
