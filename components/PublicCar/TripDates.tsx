import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { time24hrs } from "../../data";
import {
  Car,
  CustomAvailabilityObj,
  Maybe,
} from "../../graphql_types/generated/graphql";
import { totalChargeCalculator } from "../../pages/[slug]/[id]";

interface TripDatesProps {
  // setData: Dispatch<SetStateAction<Maybe<CustomAvailabilityObj> | undefined>>;
  values: Maybe<CustomAvailabilityObj> | undefined;
  setValidDates: Dispatch<SetStateAction<boolean>>;
  setTripDates: Dispatch<
    SetStateAction<Maybe<CustomAvailabilityObj> | undefined>
  >;
  userDates: Maybe<CustomAvailabilityObj> | undefined;
  setTotalCharge: Dispatch<React.SetStateAction<number>>;
  car: Car;
  hasCustomAvailability: boolean;
}

/**
 * @author @CodeYourEmpire
 * @function @TripDates
 **/

export const TripDates: FC<TripDatesProps> = (props) => {
  const [values, setValues] = useState({
    endDate: "",
    endTime: "",
    startDate: "",
    startTime: "",
  });
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const createDateValue = (date: Date) => {
    if (date) {
      return `${date.getFullYear()}-${
        date.getMonth().toString().length === 1
          ? `0${date.getMonth() + 1}`
          : date.getMonth()
      }-${
        date.getDate().toString().length === 1
          ? `0${date.getDate()}`
          : date.getDate()
      }`;
    }
  };

  const getMinDate = (val: string) => {
    if (val) {
      if (new Date(val) < new Date()) {
        return createDateValue(new Date());
      } else {
        return createDateValue(new Date(val));
      }
    } else {
      if (props.values?.startDate) {
        return createDateValue(new Date(props.values.startDate));
      } else {
        return createDateValue(new Date());
      }
    }
  };

  const getMaxDate = (val: string) => {
    if (val) {
      return createDateValue(new Date(val));
    } else {
      if (props.values?.startDate) {
        return createDateValue(new Date(props.values.startDate));
      } else {
        return createDateValue(new Date());
      }
    }
  };

  const getTimeOptions = (s: string, isStart = true) => {
    if (s) {
      let idx = time24hrs.findIndex((el) => el === s);
      if (isStart) {
        return time24hrs.slice(idx);
      } else {
        return time24hrs.slice(0, idx + 1);
      }
    } else {
      return time24hrs;
    }
  };

  useEffect(() => {
    if (
      values?.startDate &&
      values?.startTime &&
      values?.endDate &&
      values?.endTime
    ) {
      props.setValidDates(true);
      totalChargeCalculator(props.car, values, props.setTotalCharge);
    }
  }, [values, props.car]);

  useEffect(() => {
    if (props.hasCustomAvailability) {
      setMinDate(getMinDate(props.values?.startDate as string)!);
      setMaxDate(getMaxDate(props.values?.endDate as string)!);
    } else {
      const date = new Date();
      setMinDate(createDateValue(date)!);
    }
    // if (
    //   props.values?.startDate &&
    //   props.values?.endDate &&
    //   props.values?.startTime &&
    //   props.values?.endTime
    // ) {

    // } else {

    // }
  }, [props.values]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "startDate") {
      setMinDate(getMinDate(e.target.value)!);
    }
    setValues({ ...values, [e.target.name]: e.target.value });
    props.setTripDates({ ...props.userDates, [e.target.name]: e.target.value });
  };

  console.log("minDate :>> ", minDate);
  // console.log("maxDate :>> ", maxDate);
  // console.log("props.values :>> ", props.values);

  return (
    <>
      {" "}
      <small className="mb-1 fw-bold">Trip Start</small>
      <div className="d-flex mb-3 car-input-container">
        {" "}
        <div className="w-50">
          <input
            type="date"
            className="w-100"
            name="startDate"
            onChange={handleChange}
            value={values.startDate}
            min={minDate}
            // max="2018-12-31"
            // ref={startDateRef}
          />
        </div>
        <div className="w-50">
          <select
            className="w-100"
            name="startTime"
            onChange={handleChange}
            value={values.startTime ?? ""}
          >
            <option value={""}>Start Time</option>
            {getTimeOptions(props.values?.startTime ?? "").map((t, idx) => (
              <option key={idx} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <small className="mb-1 fw-bold">Trip End</small>
      <div className="d-flex mb-3 car-input-container">
        <div className="w-50">
          <input
            type="date"
            className="w-100"
            name="endDate"
            onChange={handleChange}
            value={values.endDate}
            min={minDate}
            max={maxDate}
          />
        </div>
        <div className="w-50">
          <select
            className="w-100"
            name="endTime"
            onChange={handleChange}
            value={values.endTime ?? ""}
          >
            <option value={""}>End Time</option>
            {getTimeOptions(props.values?.endTime ?? "").map((t, idx) => (
              <option key={idx} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
