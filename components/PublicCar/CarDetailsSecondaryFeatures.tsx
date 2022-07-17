import React, { FC } from "react";
import { FeatureObj, Maybe } from "../../graphql_types/generated/graphql";
import { ReadMore } from "../ReadMore";
import { FiBluetooth } from "react-icons/fi";
import { AiOutlineUsb, AiOutlineWifi } from "react-icons/ai";
import { FaCaravan, FaWheelchair } from "react-icons/fa";
import { BiUsb } from "react-icons/bi";
import { MdOutlineGpsFixed } from "react-icons/md";

interface CarDetailsSecondaryFeaturesProps {
  data: Maybe<FeatureObj[]> | undefined;
}

export const FeatureIconMap = new Map<string, JSX.Element>();

FeatureIconMap.set(
  "Bluetooth",
  <FiBluetooth className="secondary-feature-icon" />
);
FeatureIconMap.set(
  "Wifi",
  <AiOutlineWifi className="secondary-feature-icon" />
);
FeatureIconMap.set(
  "Baby Chair",
  <FaWheelchair className="secondary-feature-icon" />
);
FeatureIconMap.set("USB Charger", <BiUsb className="secondary-feature-icon" />);
FeatureIconMap.set(
  "USB Input",
  <AiOutlineUsb className="secondary-feature-icon" />
);

FeatureIconMap.set(
  "GPS",
  <MdOutlineGpsFixed className="secondary-feature-icon" />
);

FeatureIconMap.set("Caravan", <FaCaravan className="secondary-feature-icon" />);

export const CarDetailsSecondaryFeatures: FC<
  CarDetailsSecondaryFeaturesProps
> = (props) => {
  // console.log("props.data :>> ", props.data);
  return (
    <>
      <h6 className="fw-bolder car-details-sections-heading">Features</h6>
      <ReadMore>
        <ul className="p-0 car-details-secondary-features-wrapper">
          {props.data?.map((feature, idx) => (
            <li key={idx}>
              <div className="d-flex">
                <span className="carFeatureIcon">
                  {" "}
                  {FeatureIconMap.get(feature.title!)}
                </span>
                <span>{feature.title}</span>
              </div>
            </li>
          ))}
        </ul>
      </ReadMore>
    </>
  );
};
