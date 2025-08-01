import { MoveLeft } from "lucide-react";
// import successful from "../assets/images/successful.webp";
import { useNavigate } from "react-router";
import Button from "../components/Button";

import { useEffect, useRef } from "react";
import { useOrder } from "../contexts/OrderContext";

const OrderSuccessful = () => {
  const navigate = useNavigate();
  const homeRef = useRef(null);
  const { orderNumber, cartItems, shippingFee, subtotal, total } = useOrder();

  useEffect(() => {
    if (!orderNumber) {
      navigate("/"); //if no order number take me home
    }
  }, [orderNumber]);

  return (
    <div className="max-w-3xl text-center py-32 mx-auto text-[#9c6a24]">
      <svg
        width="180"
        height="180"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto border-4 border-[#9c6a24] border-dashed rounded-full"
      >
        <defs>
          <linearGradient
            id="circleGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="var(--primary-0)"></stop>
            <stop offset="50%" stopColor="var(--primary-5)"></stop>
            <stop offset="100%" stopColor="var(--primary-7)"></stop>
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="80" fill="#00CC00" opacity="1">
          <animate
            attributeName="opacity"
            values="1;0.8;1"
            dur="1s"
            begin="0s;5s;10s;15s;20s;25s"
            fill="freeze"
          ></animate>
        </circle>
        <path
          d="M70 100L90 120L130 80"
          stroke="white"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="200"
            to="0"
            dur="1s"
            begin="0s;5s;10s;15s;20s;25s"
            fill="freeze"
          ></animate>
          <animate
            attributeName="strokeDasharray"
            from="0 200"
            to="200 0"
            dur="1s"
            begin="0s;5s;10s;15s;20s;25s"
            fill="freeze"
          ></animate>
        </path>
        <circle
          cx="100"
          cy="100"
          r="90"
          stroke="var(--neutrals-5)"
          strokeWidth="4"
          strokeDasharray="10 5"
        >
          <animate
            attributeName="r"
            values="85;90;85"
            dur="1s"
            begin="0s;5s;10s;15s;20s;25s"
            fill="freeze"
          ></animate>
        </circle>
      </svg>
      <h1 className="text-4xl font-bold  font-manrope">
        Thank you for your purchase!
      </h1>
      <p className="text-lg font-bold mt-4 md:mt-8 text-[#e3bc9a] font-manrope">
        We’ve received your order and will shipin 3-7 business days. <br /> Your
        order number is <span className="">#{orderNumber}</span>
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
              <span>Grand Total</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-50 text-[#e3bc9a] mt-6 flex gap-1 text-lg font-bold justify-center items-center mx-auto">
        <Button
          style="w-full py-3 flex justify-center items-center gap-2"
          onClick={() => navigate("/")}
          ref={homeRef}
        >
          <MoveLeft />
          <p>Back Home</p>
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccessful;
