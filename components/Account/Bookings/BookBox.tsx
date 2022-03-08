import Link from "next/link";
import React, { ReactElement } from "react";
import { Trip } from "../../../graphql_types/generated/graphql";
import { getTripDuration } from "../../../utils/trip_duration_ttl_calc";

interface Props {
  data: Trip;
}

export default function BookBox(props: Props): ReactElement {
  const duration = () => {
    let obj = getTripDuration(
      {
        start_date: props.data.start_date!,
        end_date: props.data.end_date!,
        start_time: props.data.start_time as string,
        end_time: props.data.end_time as string,
      },
      false,
      true
    );

    return `${obj.duration} ${obj.type_}(s)`;
  };
  return (
    <div className="shadow bgWhite d-flex align-items-center justify-content-between mb-4">
      <Link href={`/account/bookings/${props.data.id}`}>
        <a className="py-3 d-block w-100">
          <div className="row m-0 w-100">
            <div className="col-1">{props.data.car?.reg_no}</div>
            <div className="col-2">
              {new Date(props.data.start_date!).toDateString()}
            </div>
            <div className="col-2">
              {new Date(props.data.end_date!).toDateString()}
            </div>
            <div className="col">{props.data.start_time}hrs</div>
            <div className="col">{props.data.end_time}hrs</div>
            <div className="col-2">{duration()}</div>

            <div className="col-1">
              {props.data.status === "confirmed" && (
                <button
                  className={`w-100 btn p-0 bg-success book-status-btn text-light`}
                >
                  <small>{props.data.status}</small>
                </button>
              )}

              {props.data.status === "successful" && (
                <button
                  className={`w-100 btn p-0 bg-success book-status-btn text-light`}
                >
                  <small>{props.data.status}</small>
                </button>
              )}

              {props.data.status === "cancelled" && (
                <button
                  className={`w-100 btn p-0 bg-dark book-status-btn text-light`}
                >
                  <small>{props.data.status}</small>
                </button>
              )}

              {props.data.status === "pending" && (
                <button
                  className={`w-100 btn p-0 bg-primary book-status-btn text-light`}
                >
                  <small>{props.data.status}</small>
                </button>
              )}
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
