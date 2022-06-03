import type { NextPage } from "next";
import { CustomHead } from "../components/CustomHead";
import { BrowseByMake } from "../components/BrowseByMake";
import { Faqs } from "../components/Faqs";
import Hero from "../components/Home/Hero";
import { HeroBottom } from "../components/Home/HeroBottom";
import { ManageTravel } from "../components/Home/ManageTravel";
// import HowItWorks from "../components/Home/HowItWorks";
import { PopularCars } from "../components/Home/PopularCars";
import { Promise } from "../components/Home/Promise";
import Layout from "../components/layouts/Layout";
import { WhyUs } from "../components/Home/WhyUs";

const Home: NextPage = () => {
  return (
    <>
      <CustomHead title="Home" />
      <Layout isHome>
        <Hero />
        <HeroBottom />
        {/* <HowItWorks /> */}
        <PopularCars />
        <Promise />
        <BrowseByMake />
        <WhyUs />
        <ManageTravel />
        {/* <Faqs /> */}
      </Layout>
    </>
  );
};

export default Home;
