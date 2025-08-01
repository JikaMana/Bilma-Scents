import Button from "../components/Button";
import { useCart } from "../contexts/CartContext";
import { useOrder } from "../contexts/OrderContext";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const Checkout = () => {
  const { formData, setFormData, handleSubmitContactInfo } = useOrder();
  const navigate = useNavigate();
  const { userId } = useAuth();

  const { shippingFee, subtotal, total } = useCart();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    handleSubmitContactInfo(e);
    if (userId && formData.name && formData.number && formData.address) {
      navigate("/order-successful");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-[#9c6a24]">
      <h2 className="text-3xl font-bold mb-4 mt-8 md:mb-4 md:mt-12">
        Checkout
      </h2>
      <div className="flex flex-col-reverse lg:flex-row gap-12">
        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <h2 className="text-xl lg:text-2xl font-bold">
            Fill in your Contact Adress for delivery
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
            maxLength="200"
            placeholder="Shipping Address(Provide adress as on Google map)"
            rows="2"
            required
          />
          <textarea
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Additional note (Optional*)(e.g More explantion about adress)"
            rows="4"
          />
          <Button
            type="submit"
            // onClick={() => placeOrderBtn}
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
