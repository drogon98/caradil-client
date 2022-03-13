import React, { FC, useEffect, useState } from "react";
import { AuthWrapper } from "../../../components/AuthWrapper";
import { CustomHead } from "../../../components/CustomHead";
import AccountLayout from "../../../components/layouts/AccountLayout";
import HostPlanBox from "../../../components/ListYourCar/HostPlanBox";
import { hostPlansData } from "../../../data";
import { HostPlansData } from "../../../utils/interfaces";

interface UpgradeAccountProps {}

const UpgradeAccount: FC<UpgradeAccountProps> = (props) => {
  const [planPeriod, setPlanPeriod] = useState("monthly");
  const [plansData, setPlansData] = useState<HostPlansData[]>();

  useEffect(() => {
    if (hostPlansData) {
      let tempPlansData = hostPlansData.map((hpd, idx) => {
        if (idx === 1) {
          hpd.isPopular = true;
        }
        return hpd;
      });
      setPlansData(tempPlansData);
    }
  }, [hostPlansData]);

  useEffect(() => {
    if (planPeriod === "annually") {
      let tempPlansData = hostPlansData.map((hpd, idx) => {
        hpd.price = hpd.annuallyPrice;
        return hpd;
      });
      setPlansData(tempPlansData);
    } else {
      let tempPlansData = hostPlansData.map((hpd, idx) => {
        hpd.price = hpd.monthlyPrice;
        return hpd;
      });
      setPlansData(tempPlansData);
    }
  }, [planPeriod]);
  return (
    <>
      <CustomHead title="Account - Upgrade" />
      <AuthWrapper>
        <AccountLayout>
          <></>
          {/* <div className="p-2 my-4">
            <div className="col-md-8 col-lg-7 mx-auto">
              <h3>Upgrade Account</h3>
              <form>
                <div className="row">
                  {plansData?.map((hpd, idx) => (
                    <div className="col-md-6 col-lg-3 mb-5 mb-lg-0" key={idx}>
                    

                      <HostPlanBox data={hpd} period={planPeriod} />
                    </div>
                  ))}
                </div>
              </form>
            </div>
          </div> */}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default UpgradeAccount;
