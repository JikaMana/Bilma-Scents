import { useCart } from "../contexts/CartContext";
import { useOrder } from "../contexts/OrderContext";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import PayButton from "../components/PayButton";
import { useState } from "react";

const Checkout = () => {
  const {
    formData,
    setFormData,
    handleSubmitContactInfo,
    contactInfo,
    setContactInfo,
    saveOrderToFireStore,
  } = useOrder();
  const { shippingFee, total, cartItems } = useCart();
  const { userId } = useAuth();
  const navigate = useNavigate();

  const [canPay, setCanPay] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.number || !formData.address) {
      return alert("Please fill all required fields");
    }

    setContactInfo(formData);
    setCanPay(true);
  };

  const handlePaymentSuccess = async (reference) => {
    await saveOrderToFireStore(cartItems, total + shippingFee); // Save order AFTER payment
    navigate("/order-successful");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-[#9c6a24]">
      <h2 className="text-3xl font-bold mb-4 mt-8 md:mb-4 md:mt-12">
        Checkout
      </h2>
      <div className="flex flex-col-reverse lg:flex-row gap-12">
        <form onSubmit={handleContactSubmit} className="flex-1 space-y-4">
          <h2 className="text-xl lg:text-2xl font-bold">
            Fill in your Contact Address
          </h2>

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
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
          <input
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            name="number"
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
            placeholder="Full Delivery Address"
            rows="3"
            required
          />
          <textarea
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Optional note (e.g. landmark, timing)"
            rows="2"
          />

          <button
            type="submit"
            className="px-4 py-3 rounded-full bg-[#9c6a24] text-white hover:opacity-80 font-semibold w-full cursor-pointer transition whitespace-nowrap"
          >
            Proceed to Payment
          </button>
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
            <span>₦{(total + shippingFee).toLocaleString()}</span>
          </div>
          <PayButton
            amount={total + shippingFee}
            email={formData.email}
            metadata={{
              fullName: formData.name,
              phone: formData.number,
            }}
            onSuccess={handlePaymentSuccess}
            onClose={() => console.log("Payment closed")}
            disabled={!canPay}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
