import React, { FC } from "react";
import { Maybe } from "../../graphql_types/generated/graphql";
import parse from "html-react-parser";
import { ReadMore } from "../ReadMore";

interface CarDetailsDescriptionProps {
  data: Maybe<string> | undefined;
}

/**
 * @author @CodeYourEmpire
 * @function @CarDetailsDescription
 **/

export const CarDetailsDescription: FC<CarDetailsDescriptionProps> = (
  props
) => {
  return (
    <>
      <h6 className="fw-bolder car-details-sections-heading">Description</h6>
      <ReadMore>{props.data && parse(props.data)}</ReadMore>
      {/* <div className="mt-2">
        <button className="moreBox">More</button>
      </div> */}
    </>
  );
};
