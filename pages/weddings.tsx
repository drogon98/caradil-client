import Link from "next/link";
import React from "react";
import { CustomHead } from "../components/CustomHead";
import { BrowseByMake } from "../components/BrowseByMake";
import Layout from "../components/layouts/Layout";
import Hero from "../components/Weddings/Hero";
import Chariot from "../components/Weddings/Chariot";

export default function Weddings() {
  return (
    <div>
      <CustomHead title="Weddings" />
      <Layout>
        <Hero />
        <br />
        <BrowseByMake />
        <Chariot />
      </Layout>
    </div>
  );
}
