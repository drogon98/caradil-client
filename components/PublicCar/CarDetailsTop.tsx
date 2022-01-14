import { Icon } from "@iconify/react";
import React, { FC } from "react";
import { Maybe } from "../../graphql_types/generated/graphql";

interface CarDetailsData {
  name: Maybe<string> | undefined;
  trips: Maybe<number> | undefined;
  gas: Maybe<string> | undefined;
  transmission: Maybe<string> | undefined;
  seats: Maybe<number> | undefined;
  doors: Maybe<number> | undefined;
}
interface CarDetailsTopProps {
  data: CarDetailsData;
}

/**
 * @author @CodeYourEmpire
 * @function @CarDetailsTop
 **/

export const CarDetailsTop: FC<CarDetailsTopProps> = (props) => {
  return (
    <div>
      <h1>{props.data.name}</h1>
      {/* <div className="d-flex align-items-center">
        <h4 className="m-0">4.81</h4>
        <span>
          <p className="ml-2">({props.data.trips})</p>
        </span>
      </div> */}

      <div>
        <div className="mt-3 details-top-icons-wrapper">
          <div className="d-flex align-items-center">
            <span className="carTopIcon">
              <Icon
                icon="iconoir:gas-tank-drop"
                color="black"
                className="details-top-icon"
              />
            </span>
            <span> Gas ({props.data.gas})</span>
          </div>
          <div className="d-flex align-items-center">
            <span className="carTopIcon">
              <Icon
                icon="icon-park-outline:manual-gear"
                color="black"
                className="details-top-icon"
              />
            </span>
            <span>Transmission ({props.data.transmission})</span>
          </div>
          <div className="d-flex align-items-center">
            <span className="carTopIcon">
              <Icon
                icon="icon-park-outline:baby-car-seat"
                color="black"
                className="details-top-icon"
                hFlip={true}
              />
            </span>
            <span>{props.data.seats} Seats</span>
          </div>
          <div className="d-flex align-items-center">
            <span className="carTopIcon">
              <Icon
                icon="mdi:car-door"
                color="black"
                className="details-top-icon"
              />
            </span>
            <span>{props.data.doors} Doors</span>
          </div>
        </div>
      </div>
    </div>
  );
};
