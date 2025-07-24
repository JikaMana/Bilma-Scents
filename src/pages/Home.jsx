import React, { Fragment } from "react";
import Hero from "../components/Hero";
import CustomPerfumeDeal from "../components/CustomPerfumeDeal";

const Home = () => {
  return (
    <Fragment>
      <Hero />
      <CustomPerfumeDeal title="Featured Fragrance" />
      <CustomPerfumeDeal title="Discount Offers" />
    </Fragment>
  );
};

export default Home;
