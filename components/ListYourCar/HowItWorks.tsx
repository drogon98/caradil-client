import React, { FC } from "react";
import { Icon } from "@iconify/react";
import { AiOutlineProfile } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineManageSearch, MdPlaylistAddCheck } from "react-icons/md";

interface IProps {}

/**
 * @author
 * @function @HowItWorks
 **/

export const HowItWorks: FC<IProps> = (props) => {
  return (
    <div className="page-section customContainer">
      <div className="text-center">
        <small className="text-uppercase section-heading-top-heading">
          How it works?
        </small>
      </div>
      <div className="d-flex justify-content-center">
        <div className="section-heading-hr" />
      </div>
      <div className="text-center">
        <h2 className="mb-5 section-heading">
          Its Easy to Create a Host Business Account
        </h2>
      </div>
      <div className="row m-0">
        <div className="col-md-4 how-it-works-box">
          <div className="d-flex justify-content-center">
            <div className="how-it-works-circle d-flex justify-content-center align-items-center color-white">
              <CgProfile className="how-it-works-icon" />
            </div>
          </div>
          <h4 className="mt-4 text-center how-it-works-box-inner-heading">
            Create Host Profile
          </h4>
          <p className="mt-4 text-center">
            Its simple to create a host profile. All you need is your profile
            photo,your names and phone number.
          </p>
        </div>
        <div className="col-md-4 how-it-works-box">
          <div className="d-flex justify-content-center">
            <div className="how-it-works-circle d-flex justify-content-center align-items-center color-white">
              <MdPlaylistAddCheck className="how-it-works-icon" />
            </div>
          </div>

          <h4 className="mt-4 text-center how-it-works-box-inner-heading">
            List Your Car
          </h4>
          <p className="mt-4 text-center">
            With atleast 5 photos of your car,national id and car logbook
            copies,you are ready to list your car.
          </p>
        </div>
        <div className="col-md-4 how-it-works-box">
          <div className="d-flex justify-content-center">
            <div className="how-it-works-circle d-flex justify-content-center align-items-center color-white">
              <MdOutlineManageSearch className="how-it-works-icon" />
            </div>
          </div>
          <h4 className="mt-4 text-center how-it-works-box-inner-heading">
            Scale Your Business
          </h4>
          <p className="mt-4 text-center">
            As far as you meet caradil terms of service you can expand your
            business. You can list more cars too.
          </p>
        </div>
      </div>
    </div>
  );
};
