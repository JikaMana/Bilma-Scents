import { createContext, useContext, useState } from "react";
import { initialCartItems } from "../constants/cartItems";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(initialCartItems || []);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((items) => items.id === product.id);

      if (existing) {
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
        // I'm using flatMap over map so i can remove item when quanitty is Zero
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
