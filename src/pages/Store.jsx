import React, { Fragment, useState } from "react";
import storeBanner from "../assets/images/background/storeBanner.webp";
import { perfumes } from "../constants";
import CustomItem from "../components/CustomItem";
import { useLocation } from "react-router";
import ProductFilters from "../components/ProductFilters";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PER_PAGE = 8;

const store = () => {
  const location = useLocation();

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
        {location.pathname}
      </div>

      <section className="py-12 px-6 md:px-12 ">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-medium font-display italic mb-8">
            All perfumes
          </h2>

          <main className="flex ">
            <ProductFilters
              perfumes={perfumes}
              className="sm:flex-[0.3] w-full"
            />

            <div className="grid grid-cols-[repeat(auto-fit,_minmax(210px,_1fr))] gap-8 w-full">
              {perfumes.slice(0, PER_PAGE).map((item) => (
                <CustomItem item={item} key={item.id} />
              ))}
            </div>
          </main>
          <div className="flex gap-2 mt-8 justify-center">
            <button className="px-4 py-2 bg-[#9c6a24]">
              <ArrowLeft />
            </button>
            <button className="px-4 py-2 bg-[#9c6a24]">1</button>
            <button className="px-4 py-2 bg-[#9c6a24]">2</button>
            <button className="px-4 py-2 bg-[#9c6a24]">
              <ArrowRight />
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default store;
