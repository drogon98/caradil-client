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
          </div>
        </a>
      </Link>
    </div>
  );
}
