import Link from "next/link";
import React, { FC } from "react";
import { Car } from "../../../graphql_types/generated/graphql";

interface ListBoxProps {
  data: Car;
}

export const ListBox: FC<ListBoxProps> = (props) => {
  return (
    <div className="shadow bgWhite py-2 mb-4">
      <Link
        href={{
          pathname: `/account/listings/manage/${props.data.id}`,
          query: { active: 1 },
        }}
      >
        <div>
          <a className="row m-0 align-items-center p-0">
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
              <p>{props.data.published ? "Yes" : "No"}</p>
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
