import Link from "next/link";
import React, { FC } from "react";
import slugify from "slugify";
import { Car } from "../../../graphql_types/generated/graphql";
import { MoreButton } from "../MoreButton";

interface SmListBoxProps {
  data: Car;
}

/**
 * @author @CodeYourEmpire
 * @function @ListBox
 **/

export const SmListBox: FC<SmListBoxProps> = (props) => {
  return (
    <div className="shadow sm-listbox-wrapper py-3">
      <div className="container">
        <div className="row ">
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
              <p>{props.data.available ? "Available" : "Unavailable"}</p>
              <p>Ksh.{props.data.daily_rate!.toLocaleString()}</p>
            </div>
          </div>
          <div className="col-1">
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
      {/* <div className="container">
        <div className="row align-items-center">
          <div className="col-1">
            <div className="list-name-circle">
              <img
                src={props.data.photos?.[0].secure_url!}
                style={{ objectFit: "cover" }}
                height="50px"
                width="50px"
              />
            </div>
          </div>
          <div className="col">
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
            <p>
              Ksh.{parseInt(props.data.daily_rate as string).toLocaleString()}
            </p>
          </div>
          <div className="col">
            <p>More</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};
