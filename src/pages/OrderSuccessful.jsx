import { MoveLeft } from "lucide-react";
import successful from "../assets/images/successful.webp";
import { Link, useNavigate } from "react-router";
import Button from "../components/Button";
import { useCart } from "../contexts/CartContext";

const OrderSuccessful = () => {
  const navigate = useNavigate();
  const { cartItems, total, shippingFee, subtotal } = useCart();
  console.log(cartItems);

  return (
    <div className="max-w-3xl text-center py-32 mx-auto text-[#9c6a24]">
      <img
        src={successful}
        alt="Order Successful"
        className="w-32 h-32 mx-auto"
      />
      <h1 className="text-4xl font-bold  font-manrope">
        Thank you for your purchase!
      </h1>
      <p className="text-lg font-bold mt-4 md:mt-8 text-[#e3bc9a] font-manrope">
        We’ve received your order and will shipin 3-7 business days. <br /> Your
        order number is <span className="">#BCFG3</span>
      </p>
      <div className="space-y-8 p-4 md:p-8 mb-6 my-8 md:my-12 bg-white shadow rounded-3xl text-left">
        <h2 className="text-3xl lg:text-4xl font-manrope font-bold">
          Order Summary
        </h2>

        <div>
          {cartItems.map((cart) => (
            <div
              key={cart.id}
              className="flex gap-4 justify-between border-b-1 border-[#9c6a24] py-4 items-center"
            >
              <div className="w-16 h-16">
                <img src={cart.image} alt="Image" className="w-full h-full" />
              </div>
              <div>
                <p className="text-lg">{cart.name}</p>
              </div>
              <p className="text-xl font-medium"> ₦{cart.price}</p>
            </div>
          ))}
          <div className="pt-4 space-y-1">
            <div className="flex justify-between ">
              <span>Subtotal</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between ">
              <span>Shipping</span>
              <span>₦{shippingFee.toLocaleString()}</span>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-50 text-[#e3bc9a] mt-6 flex gap-1 text-lg font-bold justify-center items-center mx-auto">
        <Button
          style="w-full py-3 flex justify-center items-center gap-2"
          onClick={() => navigate("/")}
        >
          <MoveLeft />
          <p>Back Home</p>
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccessful;
