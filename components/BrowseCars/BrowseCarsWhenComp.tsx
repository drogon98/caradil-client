import React, { RefObject, MouseEvent, useEffect, useState } from "react";
import { TripDatesObj } from "../../utils/interfaces";
import { TripDates } from "../PublicCar/TripDates";

interface BrowseCarsWhenCompProps {
  whenCompRef: any;
  dateTime: TripDatesObj;
  setDateTime: any;
  dateTimeInput: string;
  setShowWhenComp: any;
  values: any;
  setDateTimeInput: any;
  searchBtnRef: RefObject<HTMLElement>;
  setValues: any;
  startDate: number;
  endDate: number;
  setStartDate: any;
  setEndDate: any;
  setTripDuration: any;
}

const BrowseCarsWhenComp = (props: BrowseCarsWhenCompProps): JSX.Element => {
  // const router = useRouter();
  const [values, setValues] = useState<TripDatesObj>({
    start_date: null,
    end_date: null,
    start_time: "",
    end_time: "",
  });
  // const [startDate, setStartDate] = useState(() => {
  //   let date = new Date();
  //   return date.getTime();
  // });
  // const [endDate, setEndDate] = useState(() => {
  //   let date = new Date();
  //   return date.getTime() + 14;
  // });
  // const [startTime, setStartTime] = useState<string>();
  // const [endTime, setEndTime] = useState<string>();
  const [timeError, setTimeError] = useState("");

  useEffect(() => {
    if (props.dateTime) {
      try {
        // console.log("props.dateTime :>> ", props.dateTime);
        // setEndDate(props.dateTime.end_date);
        // setStartDate(props.dateTime.start_date);
        // setStartTime(props.dateTime.start_time);
        // setEndTime(props.dateTime.end_time);
        setValues({
          ...values,
          start_date: props.dateTime.start_date,
          end_date: props.dateTime.end_date,
          start_time: props.dateTime.start_time,
          end_time: props.dateTime.end_time,
        });
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  }, [props.dateTime]);

  // const handleDateChange = (
  //   startDate: React.SetStateAction<number>,
  //   endDate: React.SetStateAction<number>
  // ) => {
  //   setStartDate(startDate);
  //   if (!endDate) {
  //     setEndDate(startDate);
  //   } else {
  //     setEndDate(endDate);
  //   }
  // };

  const disableDates = (date: number) => date < new Date().getTime() - 86400000;

  const handleApplyTime = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (!values.start_time) {
        setTimeError("Please select start time!");
        setTimeout(() => {
          setTimeError("");
        }, 5000);
        return;
      }

      if (!values.end_time) {
        setTimeError("Please select end time!");
        setTimeout(() => {
          setTimeError("");
        }, 5000);
        return;
      }

      if (props.startDate >= props.endDate) {
        let startTimeSections = values.start_time?.split(":");
        let endTimeSections = values.end_time?.split(":");

        let startTimeHour = parseInt(startTimeSections?.[0]!, 10);
        let endTimeHour = parseInt(endTimeSections?.[0]!, 10);

        if (startTimeHour >= endTimeHour) {
          setTimeError("End time must be greater than start time!");
          setTimeout(() => {
            setTimeError("");
          }, 5000);
          return;
        }
        // return false;
      }

      props.setDateTime({
        start_time: values.start_time,
        end_time: values.end_time,
        start_date: props.startDate,
        end_date: props.endDate,
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
    props.setShowWhenComp(false);
  };

  const handleClearTime = (e: MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    try {
      delete props.values.start_time;
      delete props.values.end_time;
      delete props.values.start_date;
      delete props.values.end_date;
      delete props.values.trip_duration;
      let newValues = { ...props.values };
      props.setValues({ ...newValues });
      props.setDateTime(undefined);
      props.setDateTimeInput("");
      props.setTripDuration("");

      // if (props.searchBtnRef.current) {
      //   props.searchBtnRef.current?.click();
      // }

      props.setShowWhenComp(false);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div
      className="browse-cars-nav-when-tooltip shadow p-2"
      ref={props.whenCompRef}
    >
      <TripDates
        disableDates={disableDates}
        values={values}
        setValues={setValues}
        timeError={timeError}
        startDate={props.startDate}
        endDate={props.endDate}
        setStartDate={props.setStartDate}
        setEndDate={props.setEndDate}
      />

      {/* <div className="row mb-2">
        <div className="col d-flex flex-column w-50">
          <div>
            <label style={{ fontSize: "11px" }}>Start Time</label>
          </div>
          <div>
            <div className="w-100">
              <select
                className="w-100 form-control"
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
        <div className="col d-flex flex-column w-50">
          <div>
            <label style={{ fontSize: "11px" }}>End Time</label>
          </div>
          <div>
            <div className="w-100">
              <select
                className="w-100 form-control"
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
        <div>
          <small style={{ fontSize: "11px" }}>This is EAT time</small>
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
            disableDates={(date: number) =>
              date < new Date().getTime() - 86400000
            }
            onChange={handleDateChange}
          />
        </div>
      </div> */}

      <div className="d-flex justify-content-end mt-2" style={{ zIndex: 0 }}>
        {props.dateTimeInput && (
          <button className="btn" onClick={handleClearTime}>
            Clear All
          </button>
        )}

        <button className="btn bg-secondary" onClick={handleApplyTime}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default BrowseCarsWhenComp;
