import React, { FC } from "react";
import { Maybe, User } from "../../graphql_types/generated/graphql";

interface CarDetailsHostProps {
  data: Maybe<User> | undefined;
}

export const CarDetailsHost: FC<CarDetailsHostProps> = (props) => {
  return (
    <div>
      <h6 className="fw-bolder car-details-sections-heading">HOSTED BY</h6>
      <div className="d-flex">
        <div className="car-details-host-left">
          <div className="car-details-host-image-wrapper">
            <img
              src={
                props.data?.avatar?.secure_url
                  ? props.data.avatar.secure_url!
                  : "/images/avatar.svg"
              }
              className="rounded-circle"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="car-details-host-right d-flex justify-content-center flex-column">
          {props.data?.business_name ? (
            <h4 className="m-0">{props.data.business_name}</h4>
          ) : (
            <h4 className="m-0">{`${props.data?.first_name} ${props.data?.last_name}`}</h4>
          )}

          {/* <h6 className="m-0">All star host</h6> */}
          <p className="m-0">
            Joined{" "}
            {new Date(props.data?.created_at)
              .toLocaleString("default", { month: "long" })
              .slice(0, 3)}{" "}
            {new Date(props.data?.created_at).getFullYear()}
          </p>
          {/* <small>Responds in 1 minute</small> */}
        </div>
      </div>
    </div>
  );
};
