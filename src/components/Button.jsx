import React from "react";

const Button = ({ children, style, disabled, onClick }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 rounded-full bg-[#9c6a24] text-white hover:bg-[#E3BC9A] font-semibold w-full cursor-pointer transition whitespace-nowrap  ${style} ${
        disabled ? "hover:cursor-not-allowed" : ""
      } `}
    >
      {children}
    </button>
  );
};

export default Button;
