import Link from "next/link";
import React, { ReactElement } from "react";
import { Trip } from "../../../graphql_types/generated/graphql";
import { MoreButton } from "../MoreButton";

interface Props {
  data: Trip;
}

export default function BookBox(props: Props): ReactElement {
  return (
    <div className="shadow py-3 mb- d-flex align-items-center justify-content-between">
      <Link href={`/account/bookings/${props.data.id}`}>
        <a className="container">
          <div className="row">
            <div className="col">{`This booking is in progress!`}</div>
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
}
