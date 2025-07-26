import React from "react";
import { Link } from "react-router";
import { useCart } from "../contexts/CartContext";
import { Heart } from "lucide-react";
import { useWish } from "../contexts/WishContext";

const CustomItem = ({ item }) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWish();

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(item);
  };

  return (
    <Link
      to={`/store/${item.id}`}
      key={item.id}
      className="bg-white rounded-xl shadow-md overflow-hidden w-full sm:min-w-[13rem]"
    >
      <div className="h-36 sm:h-50 md:h-64 w-full p-2">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain bg-white"
        />
      </div>
      <div className="p-2 sm:p-4 border-t-2 border-[#9c6a24] bg-[#f5e4d3]">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-[14px] min-w-[360px]:text-base sm:text-lg font-semibold font-manrope">
              {item.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-merriweather">
              {item.flavour}
            </p>
          </div>
          {/* <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToWishlist(item);
            }}
          >
            <Heart size={32} color="#9c6a24" className="" />
          </button> */}
        </div>
        <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-black font-bold text-[14px] min-w-[360px]:text-base">
            ₦{item.price}
          </p>
          <button
            onClick={handleButtonClick}
            className="bg-[#e39f5f] text-white text-xs min-w-[360px]:text-sm font-semibold px-4 py-2 rounded hover:bg-[#eab685] cursor-pointer transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CustomItem;
