import React, { FC } from "react";
import { CustomHead } from "../components/CustomHead";
import { Faqs } from "../components/Faqs";
import Layout from "../components/Layouts/Layout";
import { HowItWorks } from "../components/ListYourCar/HowItWorks";
import { KickOff } from "../components/ListYourCar/KickOff";
import HostPlans from "../components/ListYourCar/HostPlans";
import { WhyUs } from "../components/ListYourCar/WhyUs";

interface IProps {}

const ListYourCar: FC<IProps> = (props) => {
  return (
    <>
      <CustomHead title="List Your Car" />
      <Layout>
        <div>
          <KickOff />
          <HowItWorks />
          <WhyUs />
          <HostPlans />
          <Faqs />
        </div>
      </Layout>
    </>
  );
};

export default ListYourCar;
