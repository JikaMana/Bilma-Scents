import React from "react";
import { usePaystackPayment } from "react-paystack";

const PayButton = ({
  amount,
  email,
  metadata = {},
  onSuccess,
  onClose,
  disabled = false,
}) => {
  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: amount * 100, // Paystack uses kobo
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    metadata,
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <button
      onClick={() => initializePayment({ onSuccess, onClose })}
      className={`px-4 py-2 rounded-full bg-[#9c6a24] text-white hover:opacity-80 font-semibold w-full cursor-pointer transition whitespace-nowrap   ${
        disabled ? "hover:cursor-not-allowed opacity-50" : ""
      } `}
    >
      Pay Now
    </button>
  );
};

export default PayButton;
