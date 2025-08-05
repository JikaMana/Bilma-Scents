import Button from "../components/Button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const CartPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    addQuantity,
    decreaseQuantity,
    shippingFee,
    total,
    subtotal,
  } = useCart();

  const proceedToCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/checkout");
    }
  };

  if (!cartItems) return <p>Loading cart...</p>;

  return (
    <div
      className="max-w-6xl mx-auto px-4 py-16 text-[#9c6a24]"
      data-aos="fade-up"
    >
      <div className="flex flex-col lg:flex-row gap-8 my-8 md:my-12">
        {/* Cart Items */}

        {cartItems.length !== 0 ? (
          <div className="flex-1 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col min400:flex-row items-center justify-between border rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 object-contain bg-gray-100 rounded"
                  />
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">
                      {item.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#9c6a24]">
                      ₦{item.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <div className="flex items-center border rounded-full p-1">
                    <button
                      className="p-2 rounded-full bg-[#f1e7dd]"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      <Minus className="w-4 h-4 text-[#9c6a24]" />
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      className="p-2 rounded-full bg-[#f1e7dd]"
                      onClick={() => addQuantity(item.id)}
                    >
                      <Plus className="w-4 h-4 text-[#9c6a24]" />
                    </button>
                  </div>
                  <button
                    className="text-red-500 hover:underline text-sm cursor-pointer"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="lg:flex-1 grid place-items-center">
            <h2 className=" text-2xl font-bold text-center">
              Cart is empty, <br /> Go shop some perfumes
            </h2>
          </div>
        )}
        {/* Summary */}
        <div className="w-full h-max lg:w-1/3 border rounded-lg p-6 shadow-md bg-gray-50 space-y-4">
          <h3 className="text-xl font-bold mb-4">Summary</h3>
          <div className="flex justify-between text-[#9c6a24]">
            <span>Subtotal</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[#9c6a24]">
            <span>Shipping</span>
            <span>₦{shippingFee}</span>
          </div>
          <hr />
          <div className="flex justify-between text-lg font-bold mb-8">
            <span>Total</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>
          {/* <Link to="/checkout"> */}
          <Button
            style="w-full text-white py-3 rounded transition"
            disabled={!user}
            onClick={proceedToCheckout}
          >
            Proceed to Checkout
          </Button>
          {/* </Link> */}
          <a
            href="/store"
            className="block text-center text-sm text-[#9c6a24] hover:underline mt-2"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
