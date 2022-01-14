import React, { ReactElement } from "react";

interface Props {
  includeDriver: boolean;
  deliverToMe: boolean;
  discountEligible: boolean;
  discountDays: number;
  discount: string;
  totalCharge: string;
  tripDays: number;
}

export default function Summary(props: Props): ReactElement {
  return (
    <div>
      <h6>Summary</h6>
      <p>
        Plan Your Trip With Caradil. Rent a Car Online Today & Enjoy the Best
        Deals.
      </p>
      <hr />
      <div className="mb-2 d-flex justify-content-between">
        <p>Daily Rate</p>
        <p>Ksh.5000</p>
      </div>
      <div className="mb-2 d-flex justify-content-between">
        <p>Trip Days</p>
        <p>{props.tripDays}</p>
      </div>
      {props.includeDriver && (
        <div className="mb-2 d-flex justify-content-between">
          <p>Driver Daily Rate</p>
          <p>Ksh.800</p>
        </div>
      )}

      {props.deliverToMe && (
        <div className="mb-2 d-flex justify-content-between">
          <p>Delivery Fee</p>
          <p>Ksh.1200</p>
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
        <p className="fw-bolder">
          Ksh.{parseInt(props.totalCharge).toLocaleString()}
        </p>
      </div>
      <hr />
    </div>
  );
}
