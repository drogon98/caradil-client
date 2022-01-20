import React from "react";
import { BiSearch } from "react-icons/bi";
import { BsBookmarkCheck } from "react-icons/bs";
import { GiSteeringWheel } from "react-icons/gi";
import { MdOutlineAssignmentReturned } from "react-icons/md";

export interface HeroBottomProps {}

export function HeroBottom(props: HeroBottomProps) {
  return (
    <div className="page-section customContainer">
      <div className="text-center">
        <small className="text-uppercase section-heading-top-heading">
          How It Works
        </small>
      </div>
      <div className="d-flex justify-content-center">
        <div className="section-heading-hr" />
      </div>
      <div className="text-center">
        <h2 className="mb-5">Carsharing Has Never Been That Easy</h2>
      </div>

      <div className="row">
        <div className="col-md-4 how-it-works-box">
          <div className="d-flex justify-content-center">
            <div className="how-it-works-circle d-flex justify-content-center align-items-center color-white">
              <BsBookmarkCheck size={"30px"} />
            </div>
          </div>
          <h4 className="mt-4 text-center">Book A Car</h4>
          <p className="mt-4 text-center">
            Browse cars and find the one that fits your requirements.
          </p>
        </div>
        <div className="col-md-4 how-it-works-box">
          <div className="d-flex justify-content-center">
            <div className="how-it-works-circle d-flex justify-content-center align-items-center color-white">
              <GiSteeringWheel size={"30px"} />
            </div>
          </div>

          <h4 className="mt-4 text-center">Enjoy your trip</h4>
          <p className="mt-4 text-center">
            Get the car from the host and embark on your trip.
          </p>
        </div>
        <div className="col-md-4 how-it-works-box">
          <div className="d-flex justify-content-center">
            <div className="how-it-works-circle d-flex justify-content-center align-items-center color-white">
              <MdOutlineAssignmentReturned size={"30px"} />
            </div>
          </div>
          <h4 className="mt-4 text-center">Return Car</h4>
          <p className="mt-4 text-center">
            When your trip is over,return the car to the host as soon as
            possible.
          </p>
        </div>
      </div>
    </div>
  );
}
