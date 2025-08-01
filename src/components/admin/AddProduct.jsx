import { useState } from "react";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import ImageUploadForm from "./ImageUploadForm";
import { db } from "../../lib/firebase";

const AddProduct = ({ setActiveTab }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mt-4">Add New Product</h1>

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
              className="px-4 sm:px-6 py-2 text-xs sm:text-base border border-gray-300 outline-none text-gray-700 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors"
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
                className="px-4 sm:px-6 py-2 text-xs sm:text-base bg-[#9c6a24] text-white rounded-lg cursor-pointer hover:opacity-70 transition-colors"
              >
                Add Product
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
