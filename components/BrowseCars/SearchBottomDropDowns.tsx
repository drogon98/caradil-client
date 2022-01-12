import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { carColors, carMakes } from "../../data";
import { SearchData } from "../../pages/browse-cars";

export interface SearchBottomDropDownsProps {
  setPayload: Dispatch<SetStateAction<SearchData | undefined>>;
  payload: SearchData;
}

export function SearchBottomDropDowns(props: SearchBottomDropDownsProps) {
  const [hideMake, setHideMake] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query) {
      if (router.query.make) {
        setHideMake(true);
      }
    }
  }, [router.query]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    props.setPayload({ ...props.payload, [e.target.name]: e.target.value });
  };

  // console.log("router :>> ", router);
  return (
    <div className="col col-lg-5">
      <div className="row">
        <div className="col">
          {" "}
          <select
            className="form-select"
            name="color"
            value={props.payload?.color ?? ""}
            onChange={handleChange}
          >
            <option value={""}>Color</option>
            {carColors.map((color, idx) => (
              <option key={idx} value={color.toLowerCase()}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <select
            className="form-select"
            name="gas"
            value={props.payload?.gas ?? ""}
            onChange={handleChange}
          >
            <option value={""}>Gas</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
          </select>
        </div>
        {!hideMake && (
          <div className="col">
            <select
              className="form-select"
              name="car_make"
              value={props.payload?.car_make ?? ""}
              onChange={handleChange}
            >
              <option value={""}>Make</option>
              {carMakes.map((make, idx) => (
                <option key={idx} value={make.toLowerCase()}>
                  {make}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
