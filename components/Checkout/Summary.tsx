import React, { ReactElement } from "react";
import { Car } from "../../graphql_types/generated/graphql";

interface Props {
  includeDriver: boolean;
  deliverToMe: boolean;
  discountEligible: boolean;
  discountDays: number;
  discount: string;
  totalCharge: number;
  tripDuration: number;
  dailyRate: number;
  hourlyRate: number;
  car: Car;
  distance: number;
  durationType: string;
}

export default function Summary(props: Props): ReactElement {
  return (
    <div>
      <h6>Checkout Summary</h6>

      <hr />
      {props.durationType === "day" && (
        <div className="mb-2 d-flex justify-content-between">
          <p>Daily Rate</p>
          <p>Ksh.{props.dailyRate?.toLocaleString()}</p>
        </div>
      )}

      {props.durationType === "hour" && (
        <div className="mb-2 d-flex justify-content-between">
          <p>Daily Rate</p>
          <p>Ksh.{props.hourlyRate?.toLocaleString()}</p>
        </div>
      )}

      <div className="mb-2 d-flex justify-content-between">
        <p>Trip Duration</p>
        <p>
          {props.tripDuration?.toString()}
          {props.durationType === "day" ? " day(s)" : " hour(s)"}
        </p>
      </div>
      {/* {props.includeDriver && (
        <div className="mb-2 d-flex justify-content-between">
          <p>Driver Daily Rate</p>
          <p>Ksh.{props.car.driver_daily_rate}</p>
        </div>
      )} */}

      {props.deliverToMe && (
        <>
          <div className="mb-2 d-flex justify-content-between">
            <p>Delivery Fee</p>
            <p>Ksh.{props.car?.delivery_rate?.toLocaleString()}/km</p>
          </div>
          {props.distance && (
            <div className="mb-2 d-flex justify-content-between">
              <p>Delivery Distance</p>
              <p>{props.distance} km</p>
            </div>
          )}
        </>
      )}

      {props.durationType === "day" && (
        <>
          {props.discountEligible && (
            <div className="mb-2 d-flex justify-content-between">
              <p>
                Discount{" "}
                {props.discountDays > 0 && `${props.discountDays}+ Trip Days`}
              </p>
              <p>{props.discount}%</p>
            </div>
          )}
        </>
      )}

      <hr />
      <div className="mb-2 d-flex justify-content-between">
        <h6 className="fw-bolder">Total</h6>
        <p className="fw-bolder">Ksh.{props.totalCharge.toLocaleString()}</p>
      </div>
      <hr />
    </div>
  );
}
