import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../lib/firebase";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [product, setProduct] = useState({
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

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  // console.log(product);

  const validateForm = () => {
    if (!product.name.trim()) return "Product name is required";
    if (!product.description.trim()) return "Product description is required";
    if (!product.flavour.trim()) return "Product flavour is required";
    if (!product.category.trim()) return "Product category is required";
    if (!product.size.trim()) return "Product size is required";
    if (!product.imageUrl.trim()) return "Product image URL is required";
    if (!product.topNotes.trim()) return "Top note is required";
    if (!product.heartNotes.trim()) return "Heart note is required";
    if (!product.baseNotes.trim()) return "Base note is required";
    if (!product.price) return "Price is required";
    if (isNaN(product.price)) return "Price must be a number";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateError = validateForm();
    if (validateError) {
      setError(validateError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await addDoc(collection(db, "perfumes"), {
        ...product,
        price: Number(product.price),
        createdAt: serverTimestamp(),
      });

      setProduct({
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
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 px-4 py-16"
    >
      <h2 className="text-2xl font-bold mt-8">Add New Product</h2>

      {error && <p className="text-red-500">{error}</p>}

      <label className="block">
        Product Name *
        <input
          name="name"
          value={product.name}
          placeholder="Product Name"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </label>

      <label className="block">
        Description
        <textarea
          name="description"
          value={product.description}
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={3}
        />
      </label>

      <label className="block">
        Flavour
        <input
          name="flavour"
          value={product.flavour}
          placeholder="Flavour"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block">
        Category
        <input
          name="category"
          value={product.category}
          placeholder="Category"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block">
        Size
        <input
          name="size"
          value={product.size}
          placeholder="Size (e.g. 100ml)"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block">
        Price *
        <input
          name="price"
          type="number"
          value={product.price}
          placeholder="Price"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </label>

      <label className="block">
        Image URL
        <input
          name="imageUrl"
          value={product.imageUrl}
          placeholder="Image URL"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block">
        Upload Image (optional for Firebase Storage later)
        <input
          name="image"
          value={product.image}
          placeholder="Image file name or path"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block">
        In Stock
        <input
          type="checkbox"
          name="inStock"
          checked={product.inStock}
          onChange={handleChange}
          className="ml-2"
        />
      </label>

      <div className="space-y-2">
        <label className="block">
          Top Note
          <input
            name="topNotes"
            value={product.topNotes}
            placeholder="Top Note"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          Heart Note
          <input
            name="heartNotes"
            value={product.heartNotes}
            placeholder="Heart Note"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          Base Note
          <input
            name="baseNotes"
            value={product.baseNotes}
            placeholder="Base Note"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default AdminDashboard;
