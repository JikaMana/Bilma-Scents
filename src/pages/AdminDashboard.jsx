import { useEffect, useState } from "react";

import { usePerfumes } from "../contexts/PerfumeContext";
import SideBar from "../components/admin/SideBar";
import Dashboard from "../components/admin/Dahboard";
import RenderProducts from "../components/admin/RenderProducts";
import AddProduct from "../components/admin/AddProduct";
import Orders from "../components/admin/Orders";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "sonner";
import { db } from "../lib/firebase";
import Customers from "../components/admin/Customers";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { perfumes } = usePerfumes();
  const [recentOrders, setRecentOrder] = useState([]);

  const renderPlaceholderPage = (title) => (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600">This section is coming soon...</p>
      </div>
    </div>
  );

  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push(doc.data());
      });
    } catch (error) {
      console.log("Error fetching orders:", error);
      toast.error("Failed to fetch orders. Please try again later.");
      setRecentOrder([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard perfumes={perfumes} recentOrders={recentOrders} />;
      case "products":
        return (
          <RenderProducts perfumes={perfumes} setActiveTab={setActiveTab} />
        );
      case "add-product":
        return <AddProduct setActiveTab={setActiveTab} />;
      case "orders":
        return <Orders recentOrders={recentOrders} />;
      case "customers":
        return <Customers />;
      case "analytics":
        return renderPlaceholderPage("Analytics");
      case "settings":
        return renderPlaceholderPage("Settings");
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="px-4 md:p-8">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
