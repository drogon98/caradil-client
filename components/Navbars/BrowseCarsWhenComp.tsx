import Calendar from "@lls/react-light-calendar";
import "@lls/react-light-calendar/dist/index.css";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { time24hrs } from "../../data";

interface BrowseCarsWhenCompProps {
  whenCompRef: any;
  dateTimeObj: any;
  setDateTime: any;
  // dateTimeInput: string;
  setShowWhenComp: any;
}

// const combineTimeObj = (obj: Time) => {
//   return `${obj.hours.toString().length === 1 ? `0${obj.hours}` : obj.hours}:${
//     obj.minutes.toString().length === 1 ? `0${obj.minutes}` : obj.minutes
//   }`;
// };

// const splitTime = (str: string): Time => {
//   let timeSections = str.split(":");
//   return {
//     hours: parseInt(timeSections[0], 10),
//     minutes: parseInt(timeSections[1], 10),
//   };
// };

const BrowseCarsWhenComp = (props: BrowseCarsWhenCompProps): JSX.Element => {
  const [startDate, setStartDate] = useState(() => {
    let date = new Date();
    return date.getTime();
  });
  const [endDate, setEndDate] = useState(() => {
    let date = new Date();
    return date.getTime() + 14;
  });
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();

  // console.log("props.dateTimeObj", props.dateTimeObj);

  useEffect(() => {
    if (props.dateTimeObj) {
      try {
        // console.log("props.dateTimeObj :>> ", props.dateTimeObj);
        setEndDate(props.dateTimeObj.end_date);
        setStartDate(props.dateTimeObj.start_date);
        setStartTime(props.dateTimeObj.start_time);
        setEndTime(props.dateTimeObj.end_time);
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  }, [props.dateTimeObj]);

  const handleDateChange = (
    startDate: React.SetStateAction<number>,
    endDate: React.SetStateAction<number>
  ) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  // console.log("startTime :>> ", startTime);
  // console.log("endTime :>> ", endTime);
  // console.log("startDate :>> ", startDate);
  // console.log("endDate :>> ", endDate);

  const handleApplyTime = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // console.log("startTime :>> ", startTime);
    // console.log("endTime :>> ", endTime);
    // console.log("startDate :>> ", startDate);
    // console.log("endDate :>> ", endDate);
    try {
      if (!startTime) {
        return;
      }

      if (!endTime) {
        return;
      }

      // let tempStartTime = combineTimeObj(startTime!);
      // let tempEndTime = combineTimeObj(endTime!);
      props.setDateTime({
        start_time: startTime,
        end_time: endTime,
        start_date: startDate,
        end_date: endDate,
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
    props.setShowWhenComp(false);
  };

  // console.log("endTime :>> ", endTime);

  return (
    <div
      className="browse-cars-nav-when-tooltip shadow p-2"
      ref={props.whenCompRef}
    >
      <div className="d-flex mb-1">
        <div className="d-flex align-items-center w-50">
          <div>
            <label style={{ fontSize: "11px" }}>Start Time:</label>
          </div>
          <div>
            <div className="w-100">
              <select
                className="w-100"
                name="startTime"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setStartTime(e.target.value);
                }}
                value={startTime}
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
        <div className="d-flex align-items-center w-50">
          <div>
            <label style={{ fontSize: "11px" }}>End Time:</label>
          </div>
          <div>
            <div className="w-100">
              <select
                className="w-100"
                name="endTime"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setEndTime(e.target.value);
                }}
                value={endTime}
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
      </div>
      <div className="d-flex flex-column justify-content-between w-100">
        <div>
          <label style={{ fontSize: "11px" }}>Start & End Dates</label>
        </div>
        <div className="w-100">
          <Calendar
            startDate={startDate}
            endDate={endDate}
            // disableDates={(date: number) => date < new Date().getTime()}
            onChange={handleDateChange}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end mt-2" style={{ zIndex: 0 }}>
        <button className="btn bg-secondary" onClick={handleApplyTime}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default BrowseCarsWhenComp;
