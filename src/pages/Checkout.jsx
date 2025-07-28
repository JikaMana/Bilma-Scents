import React, { useState } from "react";
import Button from "../components/Button";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router";

const Checkout = () => {
  const navigate = useNavigate();
  const { shippingFee, cartItems, setCartItems, subtotal, total } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log("Order Submitted: ", { ...formData, cartItems, total });
    // setCartItems([]);
    navigate("/order-successful");
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-[#9c6a24]">
      <h2 className="text-3xl font-bold mb-8 my-8 md:my-12">Checkout</h2>
      <div className="flex flex-col lg:flex-row gap-12">
        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <input
            className="w-full border p-3 rounded"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <input
            className="w-full border p-3 rounded"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <textarea
            className="w-full border p-3 rounded"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Shipping Address"
            rows="4"
            required
          />
          <Button
            type="submit"
            style="w-full text-white py-3 rounded transition"
          >
            Place Order
          </Button>
        </form>

        {/* Summary */}
        <div className="w-full lg:w-1/3 border p-6 rounded bg-gray-50 space-y-4">
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
