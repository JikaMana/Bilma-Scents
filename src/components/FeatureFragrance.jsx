import React from "react";
import testPerfume from "../assets/images/perfumes/parfum.webp";
import { Link } from "react-router";
import CustomItem from "./CustomItem";

const FeatureFragrance = () => {
  const perfume = [
    {
      id: 1,
      image: testPerfume,
      name: "Meadow",
      flavour: "BREEXY & JOYFUL",
      price: "N35,000",
    },
    {
      id: 2,
      image: testPerfume,
      name: "Meadow",
      flavour: "BREEXY & JOYFUL",
      price: "N35,000",
    },
    {
      id: 3,
      image: testPerfume,
      name: "Meadow",
      flavour: "BREEXY & JOYFUL",
      price: "N35,000",
    },
    {
      id: 4,
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
          {perfume.map((item) => (
            <CustomItem item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureFragrance;
