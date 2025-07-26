import React, { useState } from "react";
import {
  brands,
  categories,
  priceRanges,
  availability,
} from "../constants/filter";

const ProductFilters = ({ perfumes }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [availability, setAvailability] = useState("");
  const [boxed, setBoxed] = useState("");

  return (
    <div className="hidden md:block">
      <aside className="w-64 hidden md:block space-y-6 px-4">
        {/* Category Filter */}
        <div>
          <h3 className="font-bold mb-2">Category</h3>
          {categories.map((cat) => (
            <div key={cat}>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                  className="mr-2"
                />
                {cat}
              </label>
            </div>
          ))}
        </div>

        {/* Brand Filter */}
        <div>
          <h3 className="font-bold mb-2">Brand</h3>
          {brands.map((brand) => (
            <div key={brand}>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={brand}
                  checked={selectedBrand === brand}
                  onChange={() => setSelectedBrand(brand)}
                  className="mr-2"
                />
                {brand}
              </label>
            </div>
          ))}
        </div>

        {/* Availability */}
        <div>
          <h3 className="font-bold mb-2">Availability</h3>
          <label className="block">
            <input
              type="radio"
              name="stock"
              value="in"
              checked={availability === "in"}
              onChange={() => setAvailability("in")}
              className="mr-2"
            />
            In Stock
          </label>
          <label className="block">
            <input
              type="radio"
              name="stock"
              value="out"
              checked={availability === "out"}
              onChange={() => setAvailability("out")}
              className="mr-2"
            />
            Out of Stock
          </label>
        </div>

        {/* Boxed */}
        <div>
          <h3 className="font-bold mb-2">Packaging</h3>
          <label className="block">
            <input
              type="checkbox"
              checked={boxed}
              onChange={() => setBoxed(!boxed)}
              className="mr-2"
            />
            Boxed
          </label>
        </div>
      </aside>
    </div>
  );
};

export default ProductFilters;
