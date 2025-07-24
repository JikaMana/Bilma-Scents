import React, { Fragment } from "react";
import storeBanner from "../assets/images/background/storeBanner.webp";
import { perfumes } from "../constants";
import CustomItem from "../components/CustomItem";
import { useLocation } from "react-router";

const Shop = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <Fragment>
      <div
        className="min-h-[30vh] flex flex-col justify-center items-center text-5xl font-display italic text-center text-[#f1e7dd]"
        style={{
          backgroundImage: `url(${storeBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {location.pathname}
      </div>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-medium font-display italic mb-8">
            All perfumes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {perfumes.map((item) => (
              <CustomItem item={item} />
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Shop;
