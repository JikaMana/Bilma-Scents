import React, { useEffect, useState } from "react";
import {
  Package,
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  ShoppingCart,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { toast } from "sonner";
import ImageUploadForm from "../components/admin/ImageUploadForm";
import { usePerfumes } from "../contexts/PerfumeContext";
import SideBar from "../components/admin/SideBar";

const AdminDashboard = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { perfumes, handleDeleteProduct } = usePerfumes();
  const numberOfPerfumes = perfumes.length;

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    size: "",
    flavour: "",
    description: "",
    imageUrl: "",
    topNotes: "",
    heartNotes: "",
    baseNotes: "",
    inStock: true,
  });

  const validateForm = () => {
    if (!newProduct.name.trim()) return "Product name is required";
    if (!newProduct.description.trim())
      return "Product description is required";
    if (!newProduct.flavour.trim()) return "Product flavour is required";
    if (!newProduct.category.trim()) return "Product category is required";
    if (!newProduct.size.trim()) return "Product size is required";
    if (!newProduct.imageUrl.trim()) return "Product image URL is required";
    if (!newProduct.topNotes.trim()) return "Top note is required";
    if (!newProduct.heartNotes.trim()) return "Heart note is required";
    if (!newProduct.baseNotes.trim()) return "Base note is required";
    if (!newProduct.price) return "Price is required";
    if (isNaN(newProduct.price)) return "Price must be a number";
    return "";
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const stats = [
    {
      title: "Total Products",
      value: numberOfPerfumes || "-",
      change: "+12%",
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Orders Today",
      value: "47",
      change: "+8%",
      icon: ShoppingCart,
      color: "bg-green-500",
    },
    {
      title: "Revenue",
      value: "₦12,847",
      change: "+23%",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
    {
      title: "Low Stock",
      value: "12",
      change: "-5%",
      icon: AlertCircle,
      color: "bg-orange-500",
    },
  ];

  const filteredProducts = perfumes.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" ||
      product.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const validateError = validateForm();
    if (validateError) {
      setError(validateError);
      console.log(error);
      return toast.error(validateError);
    }

    setLoading(true);
    setError("");

    console.log("I'm here");

    try {
      await addDoc(collection(db, "perfumes"), {
        ...newProduct,
        price: Number(newProduct.price),
        createdAt: serverTimestamp(),
      });

      console.log("New product added:", newProduct);
      setNewProduct({
        image: "",
        name: "",
        flavour: "",
        price: "",
        description: "",
        inStock: true,
        category: "",
        size: "",
        topNotes: "",
        heartNotes: "",
        baseNotes: "",
        imageUrl: "",
      });

      toast.success("Perfume added successfully");
    } catch (err) {
      toast.error("Failed to add perfume");
      setError("Failed to add perfume. Please try again.");
      console.log(err);
      throw Error;
    } finally {
      setLoading(false);
    }

    setActiveTab("products");
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button className="bg-[#9c6a24] w-max text-white px-4 py-2 rounded-lg hover:bg-[#c09d6c] cursor-pointer transition-colors">
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 font-medium">
                  {stat.change}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((order) => (
              <div
                key={order}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
              >
                <div>
                  <p className="font-medium">Order #00{order}23</p>
                  <p className="text-sm text-gray-600">Customer Name</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ₦{(Math.random() * 200 + 50).toFixed(2)}
                  </p>
                  <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    Completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {perfumes.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="flex items-center space-x-3 py-2"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
                <p className="font-medium">₦{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <button
          onClick={() => setActiveTab("add-product")}
          className="bg-[#9c6a24] w-max text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
            >
              <option value="all">All Categories</option>
              <option value="floral">Floral</option>
              <option value="fresh">Fresh</option>
              <option value="woody">Woody</option>
              <option value="oriental">Oriental</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full my-4">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.size}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₦{product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        product.inStock
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-[#9c6a24] hover:text-indigo-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAddProduct = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Flavour *
              </label>
              <input
                type="text"
                value={newProduct.flavour}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, flavour: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
                placeholder="e.g. Lemon"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
                required
              >
                <option value="">Select category</option>
                <option value="Floral">Floral</option>
                <option value="Fresh">Fresh</option>
                <option value="Woody">Woody</option>
                <option value="Oriental">Oriental</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <input
                type="number"
                step="0.01"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
                placeholder="₦0.00"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size *
              </label>
              <input
                type="text"
                value={newProduct.size}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, size: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
                placeholder="e.g. 100ml"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
              placeholder="Product description..."
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            <ImageUploadForm
              image={newProduct.imageUrl}
              setNewProduct={setNewProduct}
            />

            <div className="flex flex-col gap-6 w-full">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Top Notes
                </label>
                <input
                  type="text"
                  value={newProduct.topNotes}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, topNotes: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
                  placeholder="e.g. Bergamot, Lemon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heart Notes
                </label>
                <input
                  type="text"
                  value={newProduct.heartNotes}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, heartNotes: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
                  placeholder="e.g. Rose, Jasmine"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base Notes
                </label>
                <input
                  type="text"
                  value={newProduct.baseNotes}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, baseNotes: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
                  placeholder="e.g. Musk, Sandalwood"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="inStock"
              checked={newProduct.inStock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, inStock: e.target.checked })
              }
              className="accent-[#9c6a24] h-4 w-4 text-[#9c6a24] focus:ring-[#9c6a24] border-gray-300 rounded"
            />
            <label
              htmlFor="inStock"
              className="ml-2 block text-sm text-gray-900"
            >
              In Stock
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setActiveTab("products")}
              className="px-6 py-2 border border-gray-300 outline-none text-gray-700 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <ClipLoader
                  color="#9c6a24"
                  loading={loading}
                  size={80}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : (
              <button
                type="submit"
                onClick={handleAddProduct}
                className="px-6 py-2 bg-[#9c6a24] text-white rounded-lg cursor-pointer hover:opacity-70 transition-colors"
              >
                Add Product
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlaceholderPage = (title) => (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600">This section is coming soon...</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "products":
        return renderProducts();
      case "add-product":
        return renderAddProduct();
      case "orders":
        return renderPlaceholderPage("Orders");
      case "customers":
        return renderPlaceholderPage("Customers");
      case "analytics":
        return renderPlaceholderPage("Analytics");
      case "settings":
        return renderPlaceholderPage("Settings");
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
