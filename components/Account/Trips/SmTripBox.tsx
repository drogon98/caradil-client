import Link from "next/link";
import React, { FC } from "react";
import slugify from "slugify";
import { Trip } from "../../../graphql_types/generated/graphql";

interface SmTripBoxProps {
  data: Trip;
}

/**
 * @author @CodeYourEmpire
 * @function @SmTripBox
 **/

export const SmTripBox: FC<SmTripBoxProps> = (props) => {
  console.log("props.data :>> ", props.data);
  return (
    <div className="shadow py-3 mb- d-flex align-items-center justify-content-between">
      <div className="container">
        <p>This trip is ongoing!</p>
        <p>{props.data.status}</p>
        <p>More</p>
      </div>
    </div>
  );
};
