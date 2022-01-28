import React, { FC } from "react";
import { Car } from "../../../graphql_types/generated/graphql";

interface AllBoxProps {
  data: Car;
}

export const AllBox: FC<AllBoxProps> = (props) => {
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
