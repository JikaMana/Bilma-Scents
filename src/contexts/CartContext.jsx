import { createContext, useContext, useState } from "react";
import { initialCartItems } from "../constants/cartItems";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(initialCartItems || []);
  const totalItems = cartItems.length;
  const shippingFee = cartItems.length === 0 ? 0 : 1000;

  const total = ([cartItems][0] ?? []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const subtotal = total + shippingFee;

  const addToCart = (product) => {
    toast.success("Perfume added to cart");

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
  };

  const removeFromCart = (id) => {
    toast.error("Perfume removed from cart");

    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const addQuantity = (productId) => {
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
