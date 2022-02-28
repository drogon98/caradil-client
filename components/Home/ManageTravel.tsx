import React, { FC } from "react";

interface ManageTravelProps {}

export const ManageTravel: FC<ManageTravelProps> = (props) => {
  return (
    <div className="page-section customContainer">
      <div className="row">
        <div className="col-md-6">
          <img
            src="images/manage-trip.jpg"
            width={"100%"}
            height="350px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6 py-5">
          <h4>Manage your travel with ease</h4>

          <h3>
            Caradil makes finding and booking trip car simple with a product
            designed just for you. Find best trip cars you will love, supported
            by humans who care.
          </h3>
          <div className="mt-4">
            <button className="btn bgOrange">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};
