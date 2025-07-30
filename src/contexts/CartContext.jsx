import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userId } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const totalItems = cartItems.length;
  const shippingFee = cartItems.length === 0 ? 0 : 1000;
  // const total = ([cartItems][0] ?? []).reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const subtotal = total + shippingFee;

  const saveCartToFirestore = async (currentUserId, cartToSave) => {
    if (!currentUserId) {
      console.warn("No user ID provided. Cart not saved.");
      return;
    }

    try {
      const userCartRef = doc(db, "carts", currentUserId);

      await setDoc(
        userCartRef,
        {
          userId: currentUserId,
          items: cartToSave,
          updatedAt: serverTimestamp(),
        },
        { merge: true } // merge: true ensures only specified fields are updated, not overwriting the whole document
      );
    } catch (err) {
      console.error("Failed to save:", err);
      toast.error("Error saving cart");
    }
  };

  const loadCartFromFirestore = async (currentUserId) => {
    if (!currentUserId) {
      console.warn("No user ID provided. Cannot load cart.");
      return;
    }

    const cartRef = doc(db, "carts", currentUserId);

    try {
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const cartData = cartSnap.data();
        setCartItems(cartData.items || []);
        return cartData.items || []; // Return items array, or empty array if 'items' field is missing
      } else {
        setCartItems([]);

        console.log("No cart found for user:", currentUserId);
        return []; // Return an empty array if no cart document exists
      }
    } catch (err) {
      console.error("Error loading cart:", err);
      return null;
    }
  };

  const addToCart = (product) => {
    toast.success("Perfume added to cart");
    if (userId) {
      try {
        setCartItems((prevItems) => {
          const alreadyInCartItems = prevItems.find(
            (items) => items.id === product.id
          );

          if (alreadyInCartItems) {
            return prevItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            return [...prevItems, { ...product, quantity: 1 }];
          }
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      toast.error("Log in to add perfumes to wishlist");
    }
  };

  const removeFromCart = (id) => {
    toast.error("Perfume removed from cart");

    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const addQuantity = async (productId) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) => {
      return prevItems.flatMap((item) => {
        // I'm using flatMap over map so i can remove item when quantity is Zero
        if (item.id === productId) {
          if (item.quantity === 1) {
            return [];
          } else if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      });
    });
  };

  useEffect(() => {
    if (userId) {
      loadCartFromFirestore(userId);
    } else {
      setCartItems([]);
    }
  }, [userId]);

  useEffect(() => {
    if (userId && cartItems !== null) {
      // Small debounce to prevent excessive writes if user rapidly clicks
      const handler = setTimeout(() => {
        if (cartItems.length !== 0) saveCartToFirestore(userId, cartItems);
      }, 500); // Save after 500ms of no changes
      return () => clearTimeout(handler); // Cleanup timeout if cartItems changes again
    }
  }, [cartItems, userId]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        addQuantity,
        decreaseQuantity,
        totalItems,
        shippingFee,
        total,
        subtotal,
        saveCartToFirestore,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
