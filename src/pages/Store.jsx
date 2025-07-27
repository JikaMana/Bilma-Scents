import React, { Fragment, useEffect, useState } from "react";
import storeBanner from "../assets/images/background/storeBanner.webp";
// import { perfumes } from "../constants";
import CustomItem from "../components/CustomItem";
import { useLocation } from "react-router";
import ProductFilters from "../components/ProductFilters";

import { usePerfumes } from "../contexts/PerfumeContext";
import { TailSpin } from "react-loader-spinner";

const PER_PAGE = 10000;

const Store = () => {
  const { perfumes, loading } = usePerfumes();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const [searchPerfume, setSearchPerfume] = useState(perfumes);

  useEffect(() => {
    if (!perfumes.length) return;
    setSearchPerfume(
      perfumes.filter((perfume) => {
        let perfumeName = perfume.name.toLowerCase();
        let perfumeFlavour = perfume.flavour.toLowerCase();
        return (
          perfumeName.includes(searchInput.toLowerCase()) ||
          perfumeFlavour.includes(searchInput.toLowerCase())
        );
      })
    );
  }, [searchInput, perfumes, loading]);

  return (
    <Fragment>
      <div
        className="min-h-[30vh] md:min-h-[35vh] flex flex-col justify-center items-center text-5xl font-display italic text-center text-[#f1e7dd]"
        style={{
          backgroundImage: `url(${storeBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {location.pathname}
      </div>

      <section className="py-6 sm:py-12 px-6 md:px-12 mb-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 sm:mb-8">
            <h2 className="text-3xl font-medium font-display italic mb-4">
              All perfumes
            </h2>

            <div>
              <input
                type="search"
                name="search"
                id="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search Perfume or Flavour"
                className="h-12 w-full md:w-[300px] focus:outline-[#e39f5f] px-4 border-2 border-[#e39f5f] rounded-lg"
              />
            </div>
          </div>

          <main className="flex">
            <ProductFilters perfumes={searchPerfume} />

            <div className="flex-1 max-h-[80vh] overflow-y-auto scrollbar-hide">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <TailSpin
                    height="75"
                    width="75"
                    color="#9c6a24"
                    ariaLabel="loading"
                  />
                </div>
              ) : searchPerfume.length === 1 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-2xl md:text-3xl font-bold text-[#9c6a24]">
                    No perfumes found.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 justify-between gap-x-2 gap-y-4 sm:gap-4 md:gap-8 relative">
                  {searchPerfume.slice(0, PER_PAGE).map((item) => (
                    <CustomItem item={item} key={item.id} />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </section>
    </Fragment>
  );
};

export default Store;
