import React from "react";
// import { homeHowItWorksData } from "../../data";
// import HowItWorksBox from "./HowItWorksBox";
import { Icon } from "@iconify/react";

const HowItWorks = (): JSX.Element => {
  return (
    <div className="customContainer my-5">
      <p className="text-center">How It Works</p>
      <h3 className="text-center mb-3">A Better way to Search for Trip Cars</h3>

      <div className="row">
        <div className="col-lg-4 p-2">
          <div className="d-flex justify-content-center mb-3">
            <div className="icon-wrapper">
              <Icon
                icon="akar-icons:search"
                className="color-orange home-how-it-works-icon"
              />
            </div>
          </div>
          <div className="text-center">
            <span className="how-it-works-lead font-weight-bold mb-3">
              Browse Car
            </span>
            <div>
              <small>
                You can search car based on location,make,model and type. You
                can search car based on location,make,model and type. You can
                search car based on location,make,model and type.
              </small>
            </div>
          </div>
        </div>
        <div className="col-lg-4 p-2">
          <div className="d-flex justify-content-center mb-3">
            <div className="icon-wrapper">
              <Icon
                icon="akar-icons:question"
                className="color-orange home-how-it-works-icon"
              />
            </div>
          </div>
          <div className="text-center">
            <span className="how-it-works-lead font-weight-bold mb-3">
              Request Booking
            </span>
            <div>
              After searching and getting your desired car and it is
              available,you can request book so that the host can confirm its
              availability.
            </div>
          </div>
        </div>
        <div className="col-lg-4 p-2">
          <div className="d-flex justify-content-center mb-3">
            <div className="icon-wrapper">
              <Icon
                icon="cil:address-book"
                className="color-orange home-how-it-works-icon"
              />
            </div>
          </div>
          <div className="text-center">
            <span className="how-it-works-lead font-weight-bold mb-3">
              Book Car
            </span>
            <div>
              <small>
                If the host confirmed you can book the car, proceed to checkout.
                Pay for the car using any of our payment methods. Voila!!! Have
                a Great Trip.
              </small>
            </div>
          </div>
        </div>
        {/* {homeHowItWorksData.map((data) => (
          <HowItWorksBox data={data} />
        ))} */}
      </div>
    </div>
  );
};

export default HowItWorks;
