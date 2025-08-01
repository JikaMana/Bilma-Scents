import {
  BarChart3,
  Home,
  Menu,
  Package,
  Plus,
  Settings,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const SideBar = ({ activeTab, setActiveTab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", key: "dashboard" },
    { icon: Package, label: "Products", key: "products" },
    { icon: Plus, label: "Add Product", key: "add-product" },
    { icon: ShoppingCart, label: "Orders", key: "orders" },
    { icon: Users, label: "Customers", key: "customers" },
    { icon: BarChart3, label: "Analytics", key: "analytics" },
    { icon: Settings, label: "Settings", key: "settings" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSidebarOpen(false);
      }
    };

    handleResize(); // Run once on load
    window.addEventListener("resize", handleResize); // Run on resize

    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-16"
      } bg-white shadow-lg transition-all duration-300 ease-in-out sm:block`}
    >
      <div className="flex items-center justify-between p-4 pr-2 border-b border-gray-200">
        {sidebarOpen && (
          <h1 className="text-xl font-bold text-gray-900">Bilma Scents</h1>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors hidden sm:block cursor-pointer"
        >
          {sidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      <nav className="mt-6">
        {sidebarItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`relative group w-full flex items-center px-4 py-3 text-left hover:bg-[#f1e7dd] hover:text-[#9c6a24] transition-colors ${
              activeTab === item.key
                ? "bg-[#f1e7dd] text-[#9c6a24] border-r-2 border-[#9c6a24]"
                : "text-gray-700"
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {sidebarOpen && <span>{item.label}</span>}
            <span
              className={`flex items-center absolute left-full h-full p-2 text-xs text-[#9c6a24] bg-[#E3BC9A] rounded-r opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap ${
                sidebarOpen ? "hidden" : ""
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
