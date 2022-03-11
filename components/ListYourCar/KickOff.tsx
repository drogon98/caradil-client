import React, { FC } from "react";
import GetStartedBtn from "./GetStartedBtn";
import TryForFreeBtn from "./TryForFreeBtn";

interface IProps {}

export const KickOff: FC<IProps> = (props) => {
  // const role = null;

  // console.log("role :>> ", role);

  return (
    <div className="page-section customContainer mt-5">
      <div className="row w-100 m-0 align-items-center">
        <div className="col-lg-6 pl-lg-0 text-center">
          <h2 className="mb-3 section-heading">
            Start your Car Sharing Business Today
          </h2>

          <p>
            Take control of your financial future while cultivating your
            entrepreneurial fire with Caradil, africa's largest car sharing
            marketplace.
          </p>
          <br />

          <p>
            List your first car now to get started, then build your business
            plan and scale how you want.
          </p>
        </div>
        <div className="col-lg-6 d-none d-lg-block">
          <img
            src="/images/car_business.jpg"
            height="300px"
            width="100%"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="mt-5">
        <TryForFreeBtn />
      </div>
    </div>
  );
};
