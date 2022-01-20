import React, { ReactElement } from "react";
import { Car } from "../../graphql_types/generated/graphql";

interface Props {
  includeDriver: boolean;
  deliverToMe: boolean;
  discountEligible: boolean;
  discountDays: number;
  discount: string;
  totalCharge: number;
  tripDays: number;
  dailyRate: number;
  car: Car;
}

export default function Summary(props: Props): ReactElement {
  return (
    <div>
      <h6>Checkout Summary</h6>

      <hr />
      <div className="mb-2 d-flex justify-content-between">
        <p>Daily Rate</p>
        <p>Ksh.{props.dailyRate?.toLocaleString()}</p>
      </div>
      <div className="mb-2 d-flex justify-content-between">
        <p>Trip Days</p>
        <p>{props.tripDays}</p>
      </div>
      {props.includeDriver && (
        <div className="mb-2 d-flex justify-content-between">
          <p>Driver Daily Rate</p>
          <p>Ksh.{props.car.driver_daily_rate}</p>
        </div>
      )}

      {props.deliverToMe && (
        <div className="mb-2 d-flex justify-content-between">
          <p>Delivery Fee</p>
          <p>Ksh.{props.car.delivery_rate}</p>
        </div>
      )}

      {props.discountEligible && (
        <div className="mb-2 d-flex justify-content-between">
          <p>
            Discount {props.discountDays > 0 && `${props.discountDays}+ Days`}
          </p>
          <p>{props.discount}%</p>
        </div>
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
