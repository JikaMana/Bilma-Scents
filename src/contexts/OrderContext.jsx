import { createContext, useContext } from "react";
import { useCart } from "../contexts/CartContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  return <OrderContext.Provider value={{}}>{children}</OrderContext.Provider>;
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
