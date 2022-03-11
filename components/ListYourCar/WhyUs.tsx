import React, { FC } from "react";
import { Icon } from "@iconify/react";
import { AiOutlineProfile } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineManageSearch, MdPlaylistAddCheck } from "react-icons/md";
import GetStartedBtn from "./GetStartedBtn";
import TryForFreeBtn from "./TryForFreeBtn";

interface WhyUsProps {}

export const WhyUs: FC<WhyUsProps> = (props) => {
  return (
    <div className="page-section customContainer">
      <div className="text-center">
        <small className="text-uppercase section-heading-top-heading">
          Why Us?
        </small>
      </div>
      <div className="d-flex justify-content-center">
        <div className="section-heading-hr" />
      </div>
      <div className="text-center">
        <h2 className="mb-5 section-heading">
          We Have Solutions To Your Challenges
        </h2>
      </div>
      <div className="row mx-0 align-items-center mb-4">
        <div className="col-md-6">
          <img
            src="images/management.png"
            width={"100%"}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6 mt-4 mt-md-0">
          <h4>Automated Management Software</h4>
          <p>
            Our integrated management software makes it easy for you to manage
            your cars' pricing,details,reviews and bookings from guests easily.
            Say goodbye to confusing dashboards. With this software you will
            manage and run your car sharing business smoothly with just a few
            sure clicks.
          </p>
        </div>
      </div>

      <div className="row mx-0 align-items-center flex-wrap-reverse flex-md-nowrap mb-4">
        <div className="col-md-6 mt-4 mt-md-0">
          <h4>Growing web traffic</h4>
          <p>
            Our application is recognized out there. Millions of travellers
            visit caradil to search for their trip cars. By running your
            business with us, we guarantee you 100% exposure to people who are
            in need of your car. You are about to get busy.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src="images/traffic.jpg"
            width={"100%"}
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
