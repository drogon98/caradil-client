import Link from "next/link";
import React, { FC } from "react";
import { Trip } from "../../../graphql_types/generated/graphql";
import { getTripDuration } from "../../../utils/trip_duration_ttl_calc";

interface SmTripBoxProps {
  data: Trip;
}

export const SmTripBox: FC<SmTripBoxProps> = (props) => {
  const duration = () => {
    let obj = getTripDuration(
      {
        start_date: props.data.start_date,
        end_date: props.data.end_date,
        start_time: props.data.start_time as string,
        end_time: props.data.end_time as string,
      },
      false,
      true
    );

    return `${obj.duration} ${obj.type_}(s)`;
  };
  return (
    <div className="shadow mb- d-flex align-items-center justify-content-between">
      <Link href={`/account/trips/${props.data.id}`}>
        <a className="d-block py-3 w-100">
          <div className="w-100 p-2">
            <div className="d-flex justify-content-between">
              <h6 className="w-50">Car:</h6>
              <h6 className="w-50">{props.data.car?.reg_no}</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6 className="w-50">Start Date:</h6>
              <h6 className="w-50">
                {new Date(props.data.start_date).toDateString()}
              </h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6 className="w-50">End Date:</h6>
              <h6 className="w-50">
                {new Date(props.data.end_date).toDateString()}
              </h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6 className="w-50">Start Time:</h6>
              <h6 className="w-50">{props.data.start_time}hrs</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6 className="w-50">End Time:</h6>
              <h6 className="w-50">{props.data.end_time}hrs</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6 className="w-50">Duration:</h6>
              <h6 className="w-50">{duration()}</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6 className="w-50">Status:</h6>
              <div className="w-50">
                {props.data.status === "confirmed" && (
                  <button
                    className={`btn p-0 bg-warning book-status-btn text-light`}
                  >
                    <small>{props.data.status}</small>
                  </button>
                )}

                {props.data.status === "successful" && (
                  <button
                    className={`btn p-0 bg-success book-status-btn text-light`}
                  >
                    <small>{props.data.status}</small>
                  </button>
                )}

                {props.data.status === "cancelled" && (
                  <button
                    className={`btn p-0 bg-danger book-status-btn text-light`}
                  >
                    <small>{props.data.status}</small>
                  </button>
                )}

                {props.data.status === "pending" && (
                  <button
                    className={`btn p-0 bg-primary book-status-btn text-light`}
                  >
                    <small>{props.data.status}</small>
                  </button>
                )}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
