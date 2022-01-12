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

FeatureIconMap.set("Bluetooth", <FiBluetooth size={"28px"} />);
FeatureIconMap.set("Wifi", <AiOutlineWifi size={"28px"} />);
FeatureIconMap.set("Baby Chair", <FaWheelchair size={"28px"} />);
FeatureIconMap.set("USB Charger", <BiUsb size={"28px"} />);
FeatureIconMap.set("USB Input", <AiOutlineUsb size={"28px"} />);

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
      <h6>Features</h6>
      <ReadMore>
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            listStyle: "none",
            gap: "18px",
          }}
          className="p-0"
        >
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
