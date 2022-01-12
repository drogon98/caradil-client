import React, { FC } from "react";
import Link from "next/link";
import { Car } from "../../../graphql_types/generated/graphql";

import { MoreButton } from "../MoreButton";
import slugify from "slugify";

interface ListBoxProps {
  data: Car;
}

/**
 * @author @CodeYourEmpire
 * @function @ListBox
 **/

export const ListBox: FC<ListBoxProps> = (props) => {
  // console.log("props :>> ", props);
  return (
    <div className="shadow py-2 mb-4">
      <div className="container">
        <div className="row m-0 align-items-center">
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
            <p>{props.data.available ? "Available" : "Unavailable"}</p>
          </div>
          <div className="col">
            <p>{props.data.booked ? "Booked" : "Not Booked"}</p>
          </div>
          <div className="col">
            <p>Ksh.{props.data.daily_rate!.toLocaleString()}</p>
          </div>
          <div className="col-1 d-flex justify-content-center">
            <MoreButton data={props.data}>
              <Link
                href={`/account/listings/edit-car/${slugify(
                  props.data.name!
                )}/${props.data.id!}`}
              >
                <a>
                  <p>Edit</p>
                </a>
              </Link>
            </MoreButton>
          </div>
        </div>
      </div>
    </div>
  );
};
