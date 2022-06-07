import React, { FC } from "react";
import { hostPlansData } from "../../data";
import CustomImage from "../Image";
import GetStartedBtn from "./GetStartedBtn";

interface IProps {}

export const KickOff: FC<IProps> = (props) => {
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
          <CustomImage
            src="/images/car_business.webp"
            alt="Start Business"
            height={"300px"}
            width={"500px"}
            layout="responsive"
          />
        </div>
      </div>
      <div className="mt-5">
        <GetStartedBtn plansData={hostPlansData[0]} period="" />
      </div>
    </div>
  );
};
