import Link from "next/link";
import React, { FC } from "react";
import { Trip } from "../../../graphql_types/generated/graphql";

interface TripBoxProps {
  data: Trip;
}

export const TripBox: FC<TripBoxProps> = (props) => {
  // console.log("props.data :>> ", props.data);
  return (
    <div className="shadow py-3 mb-4 d-flex align-items-center justify-content-between">
      <Link href={`/account/trips/${props.data.id}`}>
        <a className="container">
          <div className="row">
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
            <div className="col-2">{props.data.status}</div>
          </div>
        </a>
      </Link>
    </div>
  );
};
