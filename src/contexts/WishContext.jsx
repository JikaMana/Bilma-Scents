import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const WishContext = createContext();

export const WishProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user, userId } = useAuth();
  const [wishlistLoaded, setWishlistLoaded] = useState(false);

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
        { merge: true }
      );
    } catch (err) {
      console.error("Failed to save:", err);
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
        setWishlistLoaded(true);
      } else {
        console.warn("No wishlist found for this user");
      }
    } catch (err) {
      console.error("Failed to load wishlist:", err);
      return null;
    }
  };

  const addToWishlist = (wish) => {
    setWishlist((prev) => {
      let alreadyInWishlist = prev.find((item) => item.id === wish.id);

      if (alreadyInWishlist) {
        toast.info("Item already in wishlist");
        return prev;
      } else {
        const updatedWishlist = [...prev, wish];
        saveWishToFirestore(userId, updatedWishlist);
        toast.success("Perfume added to Wishlist");
        return updatedWishlist;
      }
      // if (!alreadyInWishlist) return [...prev, wish];
    });
  };

  const removeFromWishlist = (id) => {
    try {
      const updatedWishlist = wishlist.filter((item) => item.id !== id);

      saveWishToFirestore(userId, updatedWishlist);

      setWishlist(updatedWishlist);

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
    if (wishlistLoaded && userId !== null) {
      const handler = setTimeout(() => {
        saveWishToFirestore(userId, wishlist);
      }, 500);
      return () => clearTimeout(handler);
    }
  }, [wishlist, userId, wishlistLoaded]);

  return (
    <WishContext.Provider
      value={{ wishlist, setWishlist, removeFromWishlist, addToWishlist }}
    >
      {children}
    </WishContext.Provider>
  );
};

export const useWish = () => useContext(WishContext);
