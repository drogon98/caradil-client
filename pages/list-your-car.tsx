import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { CustomHead } from "../components/CustomHead";
import { Faqs } from "../components/Faqs";
import Layout from "../components/layouts/Layout";
import HostPlans from "../components/ListYourCar/HostPlans";
import { HowItWorks } from "../components/ListYourCar/HowItWorks";
import { KickOff } from "../components/ListYourCar/KickOff";
import { WhyUs } from "../components/ListYourCar/WhyUs";

interface IProps {}

const ListYourCar: FC<IProps> = (props) => {
  const router = useRouter();

  useEffect(() => {
    if (router.query && router.query.upgrade) {
      window.location.hash = "plans";
    }
  }, [router]);

  return (
    <>
      <CustomHead title="List Your Car" />
      <Layout>
        <div>
          <KickOff />
          <HowItWorks />
          <WhyUs />
          <HostPlans />
          {/* <Faqs /> */}
        </div>
      </Layout>
    </>
  );
};

export default ListYourCar;
