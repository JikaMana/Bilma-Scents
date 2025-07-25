import React from "react";
import { useWish } from "../contexts/WishContext";
import { Link } from "react-router";
import { Trash, Trash2 } from "lucide-react";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWish();

  let displayWishlist = [wishlist][0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-[#9c6a24]">
      <h2 className="text-3xl font-bold mb-6 my-8 md:my-12 text-center">
        Wishlist
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {displayWishlist.length !== 0 ? (
          <div className="flex-1 space-y-6">
            {displayWishlist.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between border rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-contain bg-gray-100 rounded"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{item.name}</h4>
                    <p className="text-base text-[#9c6a24]">₦{item.price}</p>
                  </div>
                </div>

                <button
                  className="text-red-500 hover:underline text-sm cursor-pointer mt-4 "
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 size={36} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="lg:flex-1 grid place-items-center">
            <h2 className=" text-2xl font-bold">
              Wishlist is empty <br /> Add Items you love
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
