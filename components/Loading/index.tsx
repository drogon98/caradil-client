import React, { FC } from "react";
import Spinner from "./Spinner";

interface LoadingProps {}

export const Loading: FC<LoadingProps> = (props) => {
  return (
    <div
      style={{ height: "calc(100vh - 70px)", top: "70px", width: "100%" }}
      className="d-flex align-items-center justify-content-center"
    >
      <Spinner />
    </div>
  );
};
