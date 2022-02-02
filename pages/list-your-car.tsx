import React, { FC } from "react";
import { HowItWorks } from "../components/ListYourCar/HowItWorks";
import { KickOff } from "../components/ListYourCar/KickOff";
import Head from "next/head";
import Layout from "../components/layouts/Layout";
import { CustomHead } from "../components/CustomHead";

interface IProps {}

const ListYourCar: FC<IProps> = (props) => {
  return (
    <>
      <CustomHead title="List Your Car" />
      <Layout>
        <div>
          <KickOff />
          <HowItWorks />
        </div>
      </Layout>
    </>
  );
};

export default ListYourCar;
