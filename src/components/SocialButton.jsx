import React from "react";
import { Instagram } from "lucide-react";
import whatsappIcon from "../assets/images/WhatsApp.webp";

const SocialButton = () => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50 bg-[#e3bc9a] p-2 rounded-full">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/2348155085996"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition"
      >
        <img src={whatsappIcon} alt="Whatsapp" className="w-6 h-6" />
      </a>

      {/* Instagram Button */}
      <a
        href="https://instagram.com/bilmascents"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:opacity-90 text-white p-3 rounded-full shadow-lg transition"
      >
        <Instagram className="w-6 h-6" />
      </a>
    </div>
  );
};

export default SocialButton;
