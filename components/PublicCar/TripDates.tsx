import Calendar from "@lls/react-light-calendar";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { time24hrs } from "../../data";
import { Car } from "../../graphql_types/generated/graphql";
import { TripDatesObj } from "../../utils/interfaces";

interface TripDatesProps {
  disableDates: (d: number) => boolean;
  setValues: Dispatch<SetStateAction<TripDatesObj>>;
  values: TripDatesObj;
  isBooking?: boolean;
  car?: Car;
  timeError: string;
  applyTime?: any;
  startDate: number;
  endDate: number;
  setStartDate: any;
  setEndDate: any;
  isCarPage?: boolean;
}

export let TripDates = (props: TripDatesProps) => {
  const handleDateChange = (start_date: number, end_date: number) => {
    props.setStartDate(start_date);
    if (!end_date) {
      props.setEndDate(start_date);
    } else {
      props.setEndDate(end_date);
    }
  };

  const handleTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    props.setValues({ ...props.values, [e.target.name]: e.target.value });
  };

  // console.log("props.values", props.values);

  return (
    <>
      {props.timeError && (
        <p>
          <small className="text-danger">{props.timeError}</small>
        </p>
      )}
      <div className="row mb-2">
        <div className="col d-flex flex-column w-50">
          <div>
            <label style={{ fontSize: "11px" }}>Start Time</label>
          </div>
          <div>
            <div className="w-100">
              <select
                className="w-100 form-control"
                name="start_time"
                onChange={handleTimeChange}
                value={props.values.start_time}
              >
                <option value={""}>Select...</option>
                {time24hrs.map((t, idx) => (
                  <option key={idx} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col d-flex flex-column w-50">
          <div>
            <label style={{ fontSize: "11px" }}>End Time</label>
          </div>
          <div>
            <div className="w-100">
              <select
                className="w-100 form-control"
                name="end_time"
                onChange={handleTimeChange}
                value={props.values.end_time}
              >
                <option value={""}>Select...</option>
                {time24hrs.map((t, idx) => (
                  <option key={idx} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* {} */}
      </div>
      <div>
        <small style={{ fontSize: "11px" }}>
          Disabled dates mean the car is not available
        </small>
      </div>
      <div className="d-flex flex-column justify-content-between w-100">
        <div>
          <label style={{ fontSize: "11px" }}>Start & End Dates</label>
        </div>
        <div className="w-100">
          <Calendar
            startDate={props.startDate}
            endDate={props.endDate}
            disableDates={props.disableDates}
            onChange={handleDateChange}
          />
        </div>
      </div>
    </>
  );
};
