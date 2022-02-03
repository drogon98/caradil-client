import React, { FC } from "react";

interface LoadingProps {}

export const Loading: FC<LoadingProps> = (props) => {
  return (
    <div
      style={{ height: "calc(100vh - 70px)", top: "70px", width: "100%" }}
      className="d-flex align-items-center justify-content-center"
    >
      <div className="text-center">
        <div className="spinner-border colorOrange" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};
