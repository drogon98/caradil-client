import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { time24hrs } from "../../data";
import {
  CustomAvailabilityDataInput,
  CustomAvailabilityObj,
  Maybe,
} from "../../graphql_types/generated/graphql";

interface TripDatesProps {
  // setData: Dispatch<SetStateAction<Maybe<CustomAvailabilityObj> | undefined>>;
  values: Maybe<CustomAvailabilityObj> | undefined;
  setValidDates: Dispatch<SetStateAction<boolean>>;
  setTripDates: Dispatch<
    SetStateAction<Maybe<CustomAvailabilityObj> | undefined>
  >;
  userDates: Maybe<CustomAvailabilityObj> | undefined;
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
      }-${date.getDate()}`;
    }
  };

  const getMinDate = (val: string) => {
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
    }
  }, [values]);

  useEffect(() => {
    if (
      props.values?.startDate &&
      props.values?.endDate &&
      props.values?.startTime &&
      props.values?.endTime
    ) {
      setMinDate(getMinDate(props.values.startDate)!);
      setMaxDate(getMaxDate(props.values.endDate)!);
    } else {
      const date = new Date();

      setMinDate(createDateValue(date)!);
    }
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
