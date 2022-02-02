import type { NextPage } from "next";
import Head from "next/head";
import { CustomHead } from "../components/CustomHead";
import { BrowseByMake } from "../components/Home/BrowseByMake";
import Hero from "../components/Home/Hero";
import { HeroBottom } from "../components/Home/HeroBottom";
// import HowItWorks from "../components/Home/HowItWorks";
import { PopularCars } from "../components/Home/PopularCars";
import Layout from "../components/layouts/Layout";

const Home: NextPage = () => {
  return (
    <>
      <CustomHead title="Home" />
      <Layout isHome>
        <Hero />
        <HeroBottom />
        {/* <HowItWorks /> */}
        <PopularCars />
        <BrowseByMake />
      </Layout>
    </>
  );
};

export default Home;
