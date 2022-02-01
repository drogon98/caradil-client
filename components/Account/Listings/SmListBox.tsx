import Link from "next/link";
import React, { FC } from "react";
import slugify from "slugify";
import { Car } from "../../../graphql_types/generated/graphql";
import { MoreButton } from "../MoreButton";

interface SmListBoxProps {
  data: Car;
}

export const SmListBox: FC<SmListBoxProps> = (props) => {
  return (
    <div className="shadow sm-listbox-wrapper py-3">
      <div className="container">
        <Link
          href={{
            pathname: `/account/listings/manage/${props.data.id}`,
            query: { active: 1 },
          }}
        >
          <a className="row ">
            <div className="col-4">
              <div className="list-name-circle">
                <img
                  src={props.data.photos?.[0]?.secure_url ?? ""}
                  style={{ objectFit: "cover" }}
                  height="100px"
                  width="100px"
                />
              </div>
            </div>
            <div className="col-7 p-0">
              <div className="d-flex flex-column">
                <h4 className="m-0">{props.data.name}</h4>
                <p>{props.data.reg_no}</p>
                <p>{props.data.published ? "Yes" : "No"}</p>
                <p>
                  Ksh.
                  {props.data.daily_rate
                    ? props.data.daily_rate.toLocaleString()
                    : "Not set"}
                </p>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};
