import React from "react";
import testPerfume from "../assets/images/perfumes/parfum.webp";
import { Link } from "react-router";
import CustomItem from "./CustomItem";
import { featuredPerfumes } from "../constants";

const CustomPerfumeDeal = ({ title }) => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-medium font-display italic mb-8">
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {featuredPerfumes.map((item) => (
            <CustomItem item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomPerfumeDeal;
