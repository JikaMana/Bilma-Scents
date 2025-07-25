import React from "react";

const Button = ({ children, style, disabled, onClick }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-6 py-2 rounded-full bg-[#9c6a24] text-white hover:bg-[#E3BC9A] font-semibold w-full cursor-pointer transition  ${style}`}
    >
      {children}
    </button>
  );
};

export default Button;
