import React from "react";
import { BrowseByMake } from "../components/BrowseByMake";
import { CustomHead } from "../components/CustomHead";
import Layout from "../components/layouts/Layout";
import Hero from "../components/Tours/Hero";
import Hero2 from "../components/Tours/Hero2";

export default function Tours() {
  return (
    <div>
      <CustomHead title="Tours & Safaris" />
      <Layout>
        <Hero /> <br />
        <BrowseByMake where="tours" />
        <Hero2 />
        <br />
      </Layout>
    </div>
  );
}
