import Link from "next/link";
import React, { FC } from "react";
import { Car } from "../../../graphql_types/generated/graphql";
import CustomImage from "../../Image";

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
        <div className="cursor-pointer">
          <a className="row m-0 align-items-center p-0">
            <div className="col-1">
              <div className="list-name-circle">
                <CustomImage
                  src={
                    props.data?.photos?.[0]?.secure_url ?? "/images/lambo.jpg"
                  }
                  alt="Car Photo"
                  height={"100px"}
                  width={"100px"}
                  layout="responsive"
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
