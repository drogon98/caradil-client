import Link from "next/link";
import React, { FC } from "react";
import { Trip } from "../../../graphql_types/generated/graphql";
import { MoreButton } from "../MoreButton";

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
            <div className="col">{`This trip is ongoing!`}</div>
            <div className="col-2">{props.data.status}</div>
            {/* <div className="col-1 d-flex justify-content-center">
            <MoreButton data={props.data}>
                  <p>Edit</p>
            </MoreButton>
          </div> */}
          </div>
        </a>
      </Link>
    </div>
  );
};
