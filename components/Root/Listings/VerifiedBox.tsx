import React, { FC } from "react";
import { Car } from "../../../graphql_types/generated/graphql";

interface VerifiedBoxProps {
  data: Car;
}

export const VerifiedBox: FC<VerifiedBoxProps> = (props) => {
  return (
    <div className="shadow p-3 row m-0 align-items-center">
      <div className="col-2">
        <h6>{props.data.name}</h6>
      </div>
      <div className="col-2">
        <h6>{props.data.reg_no}</h6>
      </div>
    </div>
  );
};
