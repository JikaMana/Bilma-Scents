import React, { Fragment } from "react";
import Hero from "../components/Hero";
import CustomPerfumeDeal from "../components/CustomPerfumeDeal";
import FAQ from "../components/FAQ";
import bilmaLogo from "../assets/images/bilma-scents-logo.png";
import HomeCarousel from "../components/HomeCarousel";

const Home = () => {
  return (
    <Fragment>
      <div
        style={{
          backgroundColor: "#f1e7dd",
          backgroundImage: `url(${bilmaLogo})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "40vw",
        }}
      >
        <Hero />
        {/* <HomeCarousel /> */}
        <CustomPerfumeDeal title="Featured Fragrance" />
        <CustomPerfumeDeal title="Discount Offers" />
        <FAQ />
      </div>
    </Fragment>
  );
};

export default Home;
