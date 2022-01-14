import React, { FC } from "react";
import { FeatureObj, Maybe } from "../../graphql_types/generated/graphql";
import { ReadMore } from "../ReadMore";
import { FiBluetooth } from "react-icons/fi";
import { AiOutlineUsb, AiOutlineWifi } from "react-icons/ai";
import { FaWheelchair } from "react-icons/fa";
import { BiUsb } from "react-icons/bi";

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

/**
 * @author @CodeYourEmpire
 * @function @CarDetailsFeatures
 **/

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
      {/* <p>
        Sites usually show images to provide illustration, like photos for
        online stores or news articles Sites usually show images to provide
        illustration, like photos for online stores or news articles Sites
        usually show images to provide illustration, like photos for online
        stores or news articles
      </p> */}
      {/* <div className="mt-2">
        <button className="moreBox">More</button>
      </div> */}
    </>
  );
};
