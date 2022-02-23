import Link from "next/link";
import React, { FC } from "react";
import { Trip } from "../../../graphql_types/generated/graphql";
import { getTripDuration } from "../../../utils/trip_duration_ttl_calc";

interface TripBoxProps {
  data: Trip;
}

export const TripBox: FC<TripBoxProps> = (props) => {
  const duration = () => {
    let obj = getTripDuration(
      {
        startDate: props.data.start_date,
        endDate: props.data.end_date,
        startTime: props.data.start_time as string,
        endTime: props.data.end_time as string,
      },
      false,
      true
    );

    return `${obj.duration} ${obj.type_}(s)`;
  };
  return (
    <div className="shadow mb-4 d-flex align-items-center justify-content-between">
      <Link href={`/account/trips/${props.data.id}`}>
        <a className="py-3 d-block w-100">
          <div className="row m-0 w-100">
            <div className="col-1">{props.data.car?.reg_no}</div>
            <div className="col-2">
              {new Date(props.data.start_date).toDateString()}
            </div>
            <div className="col-2">
              {new Date(props.data.end_date).toDateString()}
            </div>
            <div className="col">{props.data.start_time}hrs</div>
            <div className="col">{props.data.end_time}hrs</div>
            <div className="col-2">{duration()}</div>

            <div className="col-1">
              {props.data.status === "confirmed" && (
                <button
                  className={`w-100 btn p-0 bg-warning book-status-btn text-light`}
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
                  className={`w-100 btn p-0 bg-danger book-status-btn text-light`}
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
};
