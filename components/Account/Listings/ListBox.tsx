import React, { FC } from "react";
import Link from "next/link";
import { Car } from "../../../graphql_types/generated/graphql";

import { MoreButton } from "../MoreButton";
import slugify from "slugify";

interface ListBoxProps {
  data: Car;
}

export const ListBox: FC<ListBoxProps> = (props) => {
  return (
    <div className="shadow py-2 mb-4">
      <Link
        href={{
          pathname: `/account/listings/manage/${props.data.id}`,
          query: { active: 1 },
        }}
      >
        <div className="container cursor-pointer">
          <a className="row m-0 align-items-center">
            <div className="col-1">
              <div className="list-name-circle">
                <img
                  src={props.data.photos?.[0]?.secure_url ?? ""}
                  style={{ objectFit: "cover" }}
                  height="50px"
                  width="50px"
                />
              </div>
            </div>
            <div className="col-2">
              <p>{props.data.name}</p>
            </div>
            <div className="col">
              <p>{props.data.reg_no}</p>
            </div>
            <div className="col">
              <p>
                {props.data.verification_in_progress
                  ? "Under Verification"
                  : props.data.available
                  ? "Available"
                  : "Unavailable"}
              </p>
            </div>
            <div className="col">
              <p>{props.data.booked ? "Booked" : "Not Booked"}</p>
            </div>
            <div className="col">
              <p>
                Ksh.
                {props.data.daily_rate
                  ? props.data.daily_rate.toLocaleString()
                  : "Not set"}
              </p>
            </div>
          </a>
        </div>
      </Link>
    </div>
  );
};
