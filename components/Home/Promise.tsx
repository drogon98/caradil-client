import React, { FC } from "react";

interface PromiseProps {}

export const Promise: FC<PromiseProps> = (props) => {
  return (
    <div className="page-section full-width home-promise py-5 text-light">
      <h6 className="text-center">OUR PROMISE TO YOU</h6>
      <div className="d-flex justify-content-center">
        <div
          // className="section-heading-hr"
          style={{
            borderTop: "5px solid #fff",
            width: "40px",
            margin: "10px 0",
          }}
        />
      </div>
      <div className="col-md-9 col-lg-6 mx-auto text-center">
        <h1>
          Our mission is to connect you with cars, where you want them and for
          however long you need them. Travel on your own terms with Caradil.
        </h1>
      </div>
    </div>
  );
};
