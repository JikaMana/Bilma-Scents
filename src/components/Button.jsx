import React from "react";

const Button = ({ children, style, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`px-6 py-2 rounded-full bg-[#9c6a24] text-white hover:bg-[#E3BC9A] font-semibold w-full cursor-pointer transition  `}
    >
      {children}
    </button>
  );
};

export default Button;
