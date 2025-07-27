import React from "react";

const HomeCarousel = () => {
  return (
    <section className="my-10 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-6 text-center font-display italic">
        New Arrivals
      </h2>

      <div className="overflow-hidden">
        <div className="flex gap-4 transition-transform duration-300">
          {/* Slide 1 */}
          <div className="w-full bg-white rounded-2xl shadow-md p-4">
            <img
              src="https://via.placeholder.com/300x200"
              alt="New Arrival 1"
              className="rounded-xl w-full object-cover mb-3"
            />
            <h3 className="text-lg font-medium">Product Name</h3>
            <p className="text-gray-500 text-sm">Short description</p>
            <span className="block text-green-600 font-bold mt-2">₦12,000</span>
          </div>

          {/* Slide 2 */}
          <div className="w-full bg-white rounded-2xl shadow-md p-4">
            <img
              src="https://via.placeholder.com/300x200"
              alt="New Arrival 2"
              className="rounded-xl w-full object-cover mb-3"
            />
            <h3 className="text-lg font-medium">Another Product</h3>
            <p className="text-gray-500 text-sm">Nice and affordable</p>
            <span className="block text-green-600 font-bold mt-2">₦8,500</span>
          </div>

          {/* Slide 3 */}
          <div className="w-full bg-white rounded-2xl shadow-md p-4">
            <img
              src="https://via.placeholder.com/300x200"
              alt="New Arrival 3"
              className="rounded-xl w-full object-cover mb-3"
            />
            <h3 className="text-lg font-medium">Cool Product</h3>
            <p className="text-gray-500 text-sm">Bestseller item</p>
            <span className="block text-green-600 font-bold mt-2">₦15,000</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCarousel;
