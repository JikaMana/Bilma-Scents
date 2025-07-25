import React, { Fragment } from "react";
import { useNavigate, useParams } from "react-router";
import storeBanner from "../assets/images/background/storeBanner.webp";
import { perfumes } from "../constants";
import ProductNotFound from "../components/ProductNotFound";
import { Heart, ShoppingBag } from "lucide-react";
import Button from "../components/Button";
import { useCart } from "../contexts/CartContext";
import { useWish } from "../contexts/WishContext";

const ProductDetails = () => {
  const { id } = useParams();

  const item = perfumes.find((perfume) => perfume.id === id);
  const { addToCart } = useCart();
  const { addToWishlist } = useWish();

  if (!item) {
    return <ProductNotFound />;
  }

  return (
    <Fragment>
      <div
        className="min-h-[35vh] flex flex-col justify-center items-center text-5xl font-display italic text-center text-[#f1e7dd]"
        style={{
          backgroundImage: `url(${storeBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {location.pathname === `/store/${id}` && "/store/details"}
      </div>
      <section>
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 text-[#9c6a24]">
          <div className="w-full h-[400px]  p-4 overflow-hidden rounded-xl ">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <div className="flex  items-center justify-between ">
              <h2 className="text-3xl font-semibold font-display italic">
                {item.name}
              </h2>
              <p
                className={`text-base font-semibold w-max whitespace-nowrap py-1 px-2 rounded-full border-2  ${
                  item.inStock
                    ? "text-green-700 border-green-700"
                    : "text-red-600  border-red-600"
                }`}
              >
                {item.inStock ? "• In Stock" : "• Out of Stock"}
              </p>
            </div>
            <div className="flex  items-center justify-between ">
              <p className="text-xl font-bold font-manrope italic">
                ₦{item.price}
              </p>
              <p className="text-xl font-bold font-manrope italic">
                ₦{item.size}
              </p>
            </div>
            <div>
              <p className="text-base font-semibold">
                Category: {item.category}
              </p>
              <p className="text-base font-semibold">Flavour: {item.flavour}</p>
            </div>
            <div className="flex gap-2 items-center mt-4 mb-8">
              <Button
                disabled={!item.inStock}
                style={` ${!item.inStock && "cursor-not-allowed"}`}
                onClick={() => addToCart(item)}
              >
                {item.inStock ? (
                  <div className="flex justify-center gap-2">
                    <ShoppingBag />
                    <p>Add to Cart</p>
                  </div>
                ) : (
                  "Unavailable"
                )}
              </Button>
              <Button onClick={() => addToWishlist(item)}>
                <div className="flex justify-center gap-2">
                  <Heart />
                  <p> Add to Wishlist</p>
                </div>
              </Button>
            </div>
            <p>{item.description || "No description provided."}</p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ProductDetails;
