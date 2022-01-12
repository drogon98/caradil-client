import React, { FC } from "react";
import { Icon } from "@iconify/react";

interface IProps {}

/**
 * @author
 * @function @HowItWorks
 **/

export const HowItWorks: FC<IProps> = (props) => {
  return (
    <div className="customContainer my-5">
      <p className="text-center mb-2">How it works?</p>
      <h3 className="text-center mb-4">
        Its Easy to Create a Caradil Business Account
      </h3>

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
              Create host Profile
            </span>
            <div>
              <small>
                Create a caradil host account by clicking the 'Get started'
                button above. This wil require you to have an email address that
                you will verify to continue. After verifying your email create
                your profile.
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
              List your Car
            </span>
            <div>
              <small>
                Ensure you have the necessary car documents before starting this
                process. Fill in the required information about your car. Your
                car information will then be verified by our team and once it is
                successful,you will be notified to proceed to publish or do some
                correction.
              </small>
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
              Publish Car{" "}
            </span>
            <div>
              <small>
                Your car has been accepted into the system but its not public
                yet. At this stage you will fill vital information like daily
                rates,pick-up location and so much more based on your car. After
                this,you can now publish your car and it will immediately be
                made public to potential clients.
              </small>
            </div>
          </div>
        </div>
        {/* {listCarHowItWorksData.map((car) => (
          <HowItWorksBox data={car} />
        ))} */}
      </div>
    </div>
  );
};
