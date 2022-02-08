import Link from "next/link";
import React, { FC } from "react";
import slugify from "slugify";
import { Trip } from "../../../graphql_types/generated/graphql";

interface SmTripBoxProps {
  data: Trip;
}

export const SmTripBox: FC<SmTripBoxProps> = (props) => {
  // console.log("props.data :>> ", props.data);
  return (
    <div className="shadow py-3 mb- d-flex align-items-center justify-content-between">
      <Link href={`/account/trips/${props.data.id}`}>
        <a className="container">
          {props.data.status === "cancelled" && (
            <div className="col">{`This trip was cancelled`}</div>
          )}

          {props.data.status === "confirmed" && (
            <div className="col">{`You confirmed this trip!`}</div>
          )}

          {props.data.status === "successful" && (
            <div className="col">{`This trip was successful!`}</div>
          )}

          {props.data.status === "pending" && (
            <div className="col">{`Please confirm this trip!`}</div>
          )}
          <p>{props.data.status}</p>
          <p>More</p>
        </a>
      </Link>
    </div>
  );
};
