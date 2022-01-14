import Link from "next/link";
import React, { FC } from "react";
import { Trip } from "../../../graphql_types/generated/graphql";
import { MoreButton } from "../MoreButton";

interface TripBoxProps {
  data: Trip;
}

/**
 * @author @CodeYourEmpire
 * @function @TripBox
 **/

export const TripBox: FC<TripBoxProps> = (props) => {
  console.log("props.data :>> ", props.data);
  return (
    <div className="shadow py-3 mb- d-flex align-items-center justify-content-between">
      <div className="container">
        <div className="row">
          <div className="col">{`This trip is ongoing!`}</div>
          <div className="col-2">{props.data.status}</div>
          <div className="col-1 d-flex justify-content-center">
            <MoreButton data={props.data}>
              <Link href={`/account/trips/${props.data.id}`}>
                <a>
                  <p>Edit</p>
                </a>
              </Link>
            </MoreButton>
          </div>
        </div>
      </div>
    </div>
  );
};
