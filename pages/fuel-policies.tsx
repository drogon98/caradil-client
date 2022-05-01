import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CustomHead } from "../components/CustomHead";
import FuelPolicyBox from "../components/FuelPolicy/FuelPolicyBox";
import Layout from "../components/layouts/Layout";
import { fuelPoliciesData } from "../data";

export default function FuelPolicies() {
  const router = useRouter();
  const [data, setData] = useState<{ title: string; content: string }[]>();

  useEffect(() => {
    if (router?.query) {
      let user = router.query.user;

      const mappedPolicyData = fuelPoliciesData.map((fPD: any) => {
        let content;

        if (user === "host") {
          content = fPD.host;
        } else {
          content = fPD.guest;
        }

        return {
          title: fPD.title,
          content,
        };
      });

      setData([...mappedPolicyData]);
    }
  }, [router]);

  return (
    <div>
      <CustomHead title="Fuel Policies" />
      <Layout>
        <div className="customContainer my-5">
          {data?.map((fpd: any) => (
            <FuelPolicyBox data={fpd} />
          ))}
        </div>
      </Layout>
    </div>
  );
}
