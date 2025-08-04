import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import {
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useCart } from "./CartContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { userId } = useAuth();
  const { cartItems, setCartItems, shippingFee, subtotal, total } = useCart();
  const [contactInfo, setContactInfo] = useState({});
  const [orderNumber, setOrderNumber] = useState(null);
  const [orderSummary, setOrderSummary] = useState(null);
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

  const saveOrderToFireStore = async (cartItems, grandTotal) => {
    if (!cartItems || cartItems.length === 0) {
      console.warn("No items in cart to save.");
      return;
    }
    const newOrderNumber = generateOrderNumber();

    const orderData = {
      orderNumber: newOrderNumber,
      userId,
      items: cartItems,
      total: grandTotal,
      shippingFee,
      contactInfo,
      createdAt: serverTimestamp(),
    };
    const orderRef = doc(db, "orders", newOrderNumber);
    const userRef = doc(db, "customers", userId);
    const userSnap = await getDoc(userRef);
    try {
      await setDoc(orderRef, orderData);
      setCartItems([]);
      setOrderNumber(newOrderNumber);
      localStorage.setItem("orderNumber", newOrderNumber);

      await setDoc(
        userRef,
        {
          ...userSnap.data(),
          numberOfOrders: (userSnap.data().numberOfOrders || 0) + 1,
          lastActive: serverTimestamp(), // Update last active time
        },
        { merge: true }
      );
    } catch (error) {
      setError(error);
      toast.error("Failed to save order. Please try again later.");
    } finally {
      setContactInfo([]);
      await clearCartFromFirestore(userId);
    }
  };

  const clearCartFromFirestore = async (userId) => {
    const cartRef = doc(db, "carts", userId); // or whatever your path is
    await deleteDoc(cartRef);
  };

  const fetchOrderDetails = async (orderNumber) => {
    if (!orderNumber) {
      console.warn("No order number provided.");
      return null;
    }
    const orderRef = doc(db, "orders", orderNumber);
    try {
      const orderSnapshot = await getDoc(orderRef);
      if (orderSnapshot.exists()) {
        return orderSnapshot.data();
      } else {
        console.warn("Order not found.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      return null;
    }
  };

  useEffect(() => {
    const storedOrderNumber = localStorage.getItem("orderNumber");
    storedOrderNumber && setOrderNumber(storedOrderNumber);
  }, []);

  useEffect(() => {
    const checkOrder = async () => {
      const result = await fetchOrderDetails(orderNumber);
      setOrderSummary(result);
    };

    if (orderNumber) {
      checkOrder();
    }
  }, [orderNumber]);

  useEffect(() => {
    if (
      cartItems.length > 0 &&
      contactInfo &&
      contactInfo.name &&
      contactInfo.number &&
      contactInfo.address
    ) {
      saveOrderToFireStore(cartItems, subtotal);
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
        orderSummary,
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
