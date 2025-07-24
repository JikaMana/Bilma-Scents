import { Link } from "react-router-dom";

const ProductNotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-[#9c6a24] mb-4">
        Product Not Found
      </h1>
      <p className="text-gray-700 text-lg mb-6">
        Sorry, the product you're looking for doesn't exist or is no longer
        available.
      </p>
      <Link
        to="/shop"
        className="bg-[#9c6a24] text-white px-6 py-2 rounded-lg hover:bg-[#E3BC9A] transition"
      >
        Back to Shop
      </Link>
    </div>
  );
};

export default ProductNotFound;
