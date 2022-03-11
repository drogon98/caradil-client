import React, { ChangeEvent, useEffect, useState } from "react";
import { hostPlansData } from "../../data";
import { HostPlansData } from "../../utils/interfaces";
import GetStartedBtn from "./GetStartedBtn";
import HostPlanBox from "./HostPlanBox";
import TryForFreeBtn from "./TryForFreeBtn";

export default function HostPlans() {
  const [plan, setPlan] = useState("basic");
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlanPeriod(e.target.value);
  };

  return (
    <div className="host-plans py-5 my-5">
      <div className="text-center">
        <small className="text-uppercase section-heading-top-heading">
          Plans?
        </small>
      </div>
      <div className="d-flex justify-content-center">
        <div className="section-heading-hr" />
      </div>
      <div className="text-center">
        <h2 className="mb-3 section-heading">
          We Accommodate All Business Sizes
        </h2>
      </div>

      <div className="customContainer">
        <div className="text-center mb-4">
          <h4>Try Caradil free for 30 days.</h4>
          <p>No credit card required. No obligation. No risk.</p>
          <div className="my-3">
            <TryForFreeBtn />
          </div>
          <span>
            or <b className="text-orange">Pick a plan now</b>
          </span>
        </div>
        <div className="row align-items-end">
          {plansData?.map((hpd, idx) => (
            <div className="col-md-6 col-lg-3 mb-5 mb-lg-0" key={idx}>
              {hpd.isPopular && (
                <div className="p-2 bg-success text-light text-center">
                  <p className="fw-bolder">Popular</p>
                </div>
              )}

              <HostPlanBox data={hpd} period={planPeriod} />
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center mt-lg-4">
        <span>Monthly Billing</span>
        &nbsp;&nbsp; &nbsp;&nbsp;
        <span>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={handleChange}
              value={planPeriod === "monthly" ? "annually" : "monthly"}
            />
          </div>
        </span>
        &nbsp;&nbsp;
        <span>
          <div>
            <p>Annual Billing</p>
            <p>
              <b className="text-success">Save 30%</b>
            </p>
          </div>
        </span>
      </div>
    </div>
  );
}
