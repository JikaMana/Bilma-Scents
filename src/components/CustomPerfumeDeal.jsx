import React from 'react';
import CustomItem from './CustomItem';
// import { usePerfumes } from '../contexts/PerfumeContext';
// import { featuredPerfumes } from "../constants";

const CustomPerfumeDeal = ({ title, perfumes }) => {
  // const { perfumes } = usePerfumes();
  // let featuredPerfumes = perfumes; //change this with filtering through for thoose with cateofries featured

  return (
    <>
      {perfumes.length > 0 && (
        <section className="py-4 sm:py-8 md:py-12 px-6 mt-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl sm:text-3xl font-medium font-display italic mb-4 sm:mb-6 md:mb-8">
              {title}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 sm:gap-4 md:gap-8">
              {perfumes.slice(0, 4).map((item) => (
                <CustomItem
                  item={item}
                  key={item.id}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CustomPerfumeDeal;
