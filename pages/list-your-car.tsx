import React, { FC } from "react";
import { HowItWorks } from "../components/ListYourCar/HowItWorks";
import { KickOff } from "../components/ListYourCar/KickOff";
import Head from "next/head";
import Layout from "../components/layouts/Layout";

interface IProps {}

/**
 * @author
 * @function @ListYourCar
 **/

const ListYourCar: FC<IProps> = (props) => {
  return (
    <>
      <Head>
        <title>List your car</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
