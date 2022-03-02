import React, { FC } from "react";
import { CustomHead } from "../components/CustomHead";
import { Faqs } from "../components/Faqs";
import Layout from "../components/layouts/Layout";
import { HowItWorks } from "../components/ListYourCar/HowItWorks";
import { KickOff } from "../components/ListYourCar/KickOff";

interface IProps {}

const ListYourCar: FC<IProps> = (props) => {
  return (
    <>
      <CustomHead title="List Your Car" />
      <Layout>
        <div>
          <KickOff />
          <HowItWorks />
          <Faqs />
        </div>
      </Layout>
    </>
  );
};

export default ListYourCar;
