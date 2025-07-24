import React from "react";
import Button from "../components/Button";
import { Heart, Trash } from "lucide-react";

const cartItems = [
  {
    id: 1,
    name: "Bilma Rose Oud",
    price: 12000,
    image: "/images/rose-oud.png",
    quantity: 2,
  },
  {
    id: 2,
    name: "Bilma Musk Vanilla",
    price: 10000,
    image: "/images/musk-vanilla.png",
    quantity: 1,
  },
];

const CartPage = () => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-[#9c6a24]">
      <h2 className="text-3xl font-bold mb-6 my-8 md:my-12">Shopping Cart</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between border rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain bg-gray-100 rounded"
                />
                <div>
                  <h4 className="font-semibold text-lg">{item.name}</h4>
                  <p className="text-sm text-[#9c6a24]">
                    ₦{item.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <div className="flex items-center border rounded">
                  <button className="px-3 py-1 text-xl">-</button>
                  <span className="px-4">{item.quantity}</span>
                  <button className="px-3 py-1 text-xl">+</button>
                </div>
                <button className="text-red-500 hover:underline text-sm cursor-pointer">
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="w-full lg:w-1/3 border rounded-lg p-6 shadow-md bg-gray-50 space-y-4">
          <h3 className="text-xl font-bold mb-4">Summary</h3>
          <div className="flex justify-between text-[#9c6a24]">
            <span>Subtotal</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[#9c6a24]">
            <span>Shipping</span>
            <span>₦0</span>
          </div>
          <hr />
          <div className="flex justify-between text-lg font-bold mb-8">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
          <Button style="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition">
            Proceed to Checkout
          </Button>
          <a
            href="/store"
            className="block text-center text-sm text-[#9c6a24] hover:underline"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
