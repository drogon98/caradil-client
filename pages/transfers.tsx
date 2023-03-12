import React from "react";
import { BrowseByMake } from "../components/BrowseByMake";
import { CustomHead } from "../components/CustomHead";
// import Hero from '../components/Home/Hero'
import Layout from "../components/layouts/Layout";
// import Hero2 from '../components/Tours/Hero2'

type Props = {};

export default function Transfers({}: Props) {
  return (
    <div>
      <CustomHead title="Transfers" />
      <Layout>
        Transfers
        {/* <Hero /> <br /> */}
        {/* <BrowseByMake where="transfers" /> */}
        {/* <Hero2 /> */}
        {/* <br /> */}
      </Layout>
    </div>
  );
}
