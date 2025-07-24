import React, { Fragment } from "react";
import storeBanner from "../assets/images/background/storeBanner.webp";

const Shop = () => {
  return (
    <Fragment>
      <div
        className="min-h-[30vh] flex flex-col justify-center items-center text-center text-white"
        style={{
          backgroundImage: `url(${storeBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </Fragment>
  );
};

export default Shop;
