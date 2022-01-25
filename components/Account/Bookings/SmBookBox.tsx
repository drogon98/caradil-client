import Link from "next/link";
import React, { ReactElement } from "react";
import { Trip } from "../../../graphql_types/generated/graphql";

interface Props {
  data: Trip;
}

export default function SmBookBox(props: Props): ReactElement {
  return (
    <div className="shadow py-3 mb- d-flex align-items-center justify-content-between">
      <Link href={`/account/bookings/${props.data.id}`}>
        <a className="container">
          <div>
            <p>This trip is ongoing!</p>
            <p>{props.data.status}</p>
            <p>More</p>
          </div>
        </a>
      </Link>
    </div>
  );
}
