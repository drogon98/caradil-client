import React, { useState } from "react";
import { TimePicker } from "sassy-datepicker";
// import { DatePicker } from "react-trip-date";
// import { useWindowDimensions } from "../hooks/useWindowDimensions";
import Calendar from "@lls/react-light-calendar";
import "@lls/react-light-calendar/dist/index.css";

interface BrowseCarsWhenCompProps {
  whenCompRef: any;
}

const BrowseCarsWhenComp = (props: BrowseCarsWhenCompProps): JSX.Element => {
  const [startDate, setStartDate] = useState(() => {
    let date = new Date();
    return date.getTime();
  });
  const [endDate, setEndDate] = useState(() => {
    let date = new Date();
    return date.getTime() + 14;
  });

  const onChange = (
    startDate: React.SetStateAction<number>,
    endDate: React.SetStateAction<number>
  ) => {
    setStartDate(startDate);
    setEndDate(endDate!);
  };

  return (
    <div
      className="browse-cars-nav-when-tooltip shadow p-2"
      ref={props.whenCompRef}
    >
      <div className="d-flex mb-3 ">
        <div className="d-flex align-items-center w-50">
          <div>
            <label style={{ fontSize: "11px" }}>Start Time:</label>
          </div>
          <div>
            <TimePicker
              onChange={() => {}}
              selected={{
                minutes: 0,
                hours: 18,
              }}
            />
          </div>
        </div>
        <div className="d-flex align-items-center w-50">
          <div>
            <label style={{ fontSize: "11px" }}>End Time:</label>
          </div>
          <div>
            <TimePicker
              onChange={() => {}}
              selected={{
                minutes: 0,
                hours: 18,
              }}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between w-100">
        <div className="w-100">
          <Calendar
            startDate={startDate}
            endDate={endDate}
            // disableDates={(date: number) => date < new Date().getTime()}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end mt-2" style={{ zIndex: 0 }}>
        <button className="btn bg-secondary">Apply</button>
      </div>
    </div>
  );
};

export default BrowseCarsWhenComp;
