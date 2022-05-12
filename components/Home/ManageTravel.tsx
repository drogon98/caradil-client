import Link from "next/link";
import React, { FC } from "react";

interface ManageTravelProps {}

export const ManageTravel: FC<ManageTravelProps> = (props) => {
  return (
    <div className="page-section customContainer">
      <div className="text-center">
        <small className="text-uppercase section-heading-top-heading">
          Easy Management?
        </small>
      </div>
      <div className="d-flex justify-content-center">
        <div className="section-heading-hr" />
      </div>
      <div className="text-center">
        <h2 className="mb-5 section-heading">Manage your travel with ease</h2>
      </div>
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src="images/manage-trip.jpg"
            width={"100%"}
            height="280px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6 py-5 text-center">
          {/* <h3></h3> */}

          <p className="lead">
            Caradil makes finding and booking trip car simple with a product
            designed just for you. Find best trip cars you will love, maintained
            by humans who care.
          </p>
          <div className="mt-4">
            <Link href="/browse-cars">
              <a className="btn bgOrange">Browse Cars</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
