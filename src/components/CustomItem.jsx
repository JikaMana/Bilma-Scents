import React from "react";
import { Link } from "react-router";

const CustomItem = ({ item }) => {
  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    alert("Product added to cart succesfully");
  };

  return (
    <Link
      to={`/store/${item.id}`}
      key={item.id}
      className="bg-white rounded-xl shadow-md overflow-hidden w-full min-w-[13rem]"
    >
      <div className="h-64 w-full">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain bg-[#E3BC9A]"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold font-manrope">{item.name}</h3>
        <p className="text-sm text-gray-600 font-merriweather">
          {item.flavour}
        </p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <p className="text-black font-bold">₦{item.price}</p>
          <button
            onClick={handleButtonClick}
            className="bg-[#E3BC9A] text-white text-sm px-4 py-2 rounded hover:bg-[#f1e7dd] cursor-pointer transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CustomItem;
