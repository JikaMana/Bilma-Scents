import React, { useState } from "react";
import Button from "../components/Button";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();

  const { shippingFee, cartItems, setCartItems, subtotal, total } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    address: "",
    note: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userId) {
      saveContactInfo(userId, formData);
    } else {
      toast.info("Log in to continue");
    }
  };

  const saveContactInfo = async (currentUserId, contactInfo) => {
    const contactInfoRef = doc(db, "contactInfo", userId);

    try {
      await setDoc(contactInfoRef, {
        userId: currentUserId,
        userContactInfo: contactInfo,
        submittedAt: serverTimestamp(),
      });
      toast.success("Contact Adress Sent");
      setCartItems([]);
      navigate("/order-successful");
    } catch (error) {
      toast.error("Failed to save Contact Info");
      console.log("Failed to save Contact Info: ", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-[#9c6a24]">
      <h2 className="text-3xl font-bold mb-8 my-8 md:my-12">Checkout</h2>
      <div className="flex flex-col lg:flex-row gap-12">
        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <input
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <input
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            name="number"
            type="text"
            value={formData.number}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          <textarea
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Shipping Address"
            rows="2"
            required
          />
          <textarea
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Additional note (Optional*)"
            rows="4"
          />
          <Button
            type="submit"
            style="w-full text-white py-3 rounded transition"
          >
            Place Order
          </Button>
        </form>

        {/* Summary */}
        <div className="w-full lg:w-1/3 h-max border p-6 rounded bg-gray-50 space-y-4">
          <h3 className="text-xl font-bold">Order Summary</h3>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₦{shippingFee}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
