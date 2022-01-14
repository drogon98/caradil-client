import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { time24hrs } from "../../data";
import { CustomAvailabilityDataInput } from "../../graphql_types/generated/graphql";

interface TripDatesProps {
  setData: Dispatch<SetStateAction<CustomAvailabilityDataInput>>;
  values: CustomAvailabilityDataInput;
}

/**
 * @author @CodeYourEmpire
 * @function @TripDates
 **/

export const TripDates: FC<TripDatesProps> = (props) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    props.setData({ ...props.values, [e.target.name]: e.target.value });
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
          />
        </div>
        <div className="w-50">
          <select
            className="w-100"
            name="startTime"
            onChange={handleChange}
            value={props.values.startTime ?? ""}
          >
            <option value={""}>Start Time</option>
            {time24hrs.map((t) => (
              <option value={t}>{t}</option>
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
          />
        </div>
        <div className="w-50">
          <select
            className="w-100"
            name="endTime"
            onChange={handleChange}
            value={props.values.endTime ?? ""}
          >
            <option value={""}>End Time</option>
            {time24hrs.map((t) => (
              <option value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
