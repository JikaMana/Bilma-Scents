import { createContext, useContext, useState } from "react";
import { initialWishlist } from "../constants/wishlist";
import { toast } from "sonner";

const WishContext = createContext();

export const WishProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(initialWishlist || []);

  const addToWishlist = (wish) => {
    toast("Perfume added to Wishlist");

    setWishlist((prev) => {
      let alreadyInWishlist = prev.find((item) => item.id === wish.id);

      if (alreadyInWishlist) {
        return;
      } else {
        return [...prev, wish];
      }
    });
  };

  const removeFromWishlist = (id) => {
    toast.error("Perfume removed from wishlist");

    setWishlist((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <WishContext.Provider
      value={{ wishlist, setWishlist, removeFromWishlist, addToWishlist }}
    >
      {children}
    </WishContext.Provider>
  );
};

export const useWish = () => useContext(WishContext);
