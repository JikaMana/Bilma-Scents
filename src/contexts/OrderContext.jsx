import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useCart } from "./CartContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { userId } = useAuth();
  const { cartItems, setCartItems, shippingFee, subtotal, total } = useCart();
  const [contactInfo, setContactInfo] = useState({});
  const [orderNumber, setOrderNumber] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    address: "",
    note: "",
  });
  const [error, setError] = useState(null);
  const handleSubmitContactInfo = (e) => {
    e.preventDefault();

    if (userId) {
      setContactInfo(formData);
    } else {
      toast.info("Log in to continue");
    }
  };

  const generateOrderNumber = () => {
    return (
      Math.random().toString(36).substring(2, 10).toUpperCase() +
      Math.floor(Math.random() * 1000).toString()
    );
  };

  const saveOrderToFireStore = async (cartItems, orderNumber, grandTotal) => {
    if (!cartItems || cartItems.length === 0) {
      console.warn("No items in cart to save.");
      return;
    }
    const orderData = {
      orderNumber,
      userId,
      items: cartItems,
      total: grandTotal,
      shippingFee,
      contactInfo,
      createdAt: serverTimestamp(),
    };
    const orderRef = doc(db, "orders", orderNumber);
    try {
      await setDoc(orderRef, orderData);
      setCartItems([]); // add loagic to clear this users cart from firestore
    } catch (error) {
      setError(error);
      toast.error("Failed to save order. Please try again later.");
    } finally {
      setContactInfo([]);
    }
  };

  useEffect(() => {
    if (
      cartItems.length > 0 &&
      contactInfo &&
      contactInfo.name &&
      contactInfo.number &&
      contactInfo.address
    ) {
      setOrderNumber(generateOrderNumber());
      saveOrderToFireStore(cartItems, orderNumber, subtotal);
    }
  }, [contactInfo]);

  return (
    <OrderContext.Provider
      value={{
        formData,
        setFormData,
        handleSubmitContactInfo,
        contactInfo,
        setContactInfo,
        saveOrderToFireStore,
        orderNumber,
        cartItems,
        shippingFee,
        subtotal,
        total,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
