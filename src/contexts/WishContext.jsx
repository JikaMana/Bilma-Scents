import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const WishContext = createContext();

export const WishProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user, userId } = useAuth();

  const saveWishToFirestore = async (currentUserId, wishToSave) => {
    if (!currentUserId) {
      console.warn("No user ID provided. Could not save Wishlist.");
      return;
    }
    try {
      const userWishlistRef = doc(db, "wishlist", currentUserId);

      await setDoc(
        userWishlistRef,
        {
          userId: currentUserId,
          items: wishToSave,
          updatedAt: serverTimestamp(),
        },
        { merge: true } // merge: true ensures only specified fields are updated, not overwriting the whole document
      );
    } catch (err) {
      console.error("Failed to save:", err);
      toast.error("Error saving wishlist");
    }
  };

  const loadWishFromFirestore = async (currentUserId) => {
    if (!currentUserId) {
      console.warn("No user ID provided. Cannot load wishlist.");
      return;
    }

    const userWishlistRef = doc(db, "wishlist", currentUserId);

    try {
      const wishlistSnap = await getDoc(userWishlistRef);

      if (wishlistSnap.exists()) {
        const wishlistData = wishlistSnap.data();

        setWishlist(wishlistData.items || []);

        return wishlistData || [];
      }
    } catch (err) {
      console.error("Failed to load wishlist:", err);
      return null;
    }
  };

  const addToWishlist = (wish) => {
    if (user) {
      toast.success("Perfume added to Wishlist");

      setWishlist((prev) => {
        let alreadyInWishlist = prev.find((item) => item.id === wish.id);

        if (alreadyInWishlist) {
          toast.info("Item already in wishlist");
          return prev;
        } else {
          return [...prev, wish];
        }
        // if (!alreadyInWishlist) return [...prev, wish];
      });
    } else {
      toast.error("Log in to add perfumes to wishlist");
    }
  };

  const removeFromWishlist = (id) => {
    try {
      setWishlist((prevItems) => prevItems.filter((item) => item.id !== id));
      toast.error("Perfume removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove perfume");
    }
  };

  useEffect(() => {
    if (userId) {
      loadWishFromFirestore(userId);
    } else {
      setWishlist([]);
    }
  }, [userId]);

  useEffect(() => {
    if (wishlist && userId !== null) {
      const handler = setTimeout(() => {
        //  if (wishlist.length !== 0)
        saveWishToFirestore(userId, wishlist);
      }, 500);
      return () => clearTimeout(handler);
    }
    console.log(wishlist);
  }, [wishlist, userId]);

  return (
    <WishContext.Provider
      value={{ wishlist, setWishlist, removeFromWishlist, addToWishlist }}
    >
      {children}
    </WishContext.Provider>
  );
};

export const useWish = () => useContext(WishContext);
