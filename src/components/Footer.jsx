import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="text-center py-4 text-sm text-gray-500 border-t mt-10">
        © {new Date().getFullYear()} Bilma. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
