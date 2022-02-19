import Calendar from "@lls/react-light-calendar";
import "@lls/react-light-calendar/dist/index.css";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  RefObject,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { time24hrs } from "../../data";

interface BrowseCarsWhenCompProps {
  whenCompRef: any;
  dateTime: any;
  setDateTime: any;
  dateTimeInput: string;
  setShowWhenComp: any;
  values: any;
  setDateTimeInput: any;
  searchBtnRef: RefObject<HTMLElement>;
  setValues: any;
}

const BrowseCarsWhenComp = (props: BrowseCarsWhenCompProps): JSX.Element => {
  const router = useRouter();
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
  const [timeError, setTimeError] = useState("");

  useEffect(() => {
    if (props.dateTime) {
      try {
        console.log("props.dateTime :>> ", props.dateTime);
        setEndDate(props.dateTime.end_date);
        setStartDate(props.dateTime.start_date);
        setStartTime(props.dateTime.start_time);
        setEndTime(props.dateTime.end_time);
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  }, [props.dateTime]);

  const handleDateChange = (
    startDate: React.SetStateAction<number>,
    endDate: React.SetStateAction<number>
  ) => {
    setStartDate(startDate);
    if (!endDate) {
      setEndDate(startDate);
    } else {
      setEndDate(endDate);
    }
  };

  const handleApplyTime = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // console.log("startTime :>> ", startTime);
    // console.log("endTime :>> ", endTime);
    // console.log("startDate :>> ", startDate);
    // console.log("endDate :>> ", endDate);
    try {
      if (!startTime) {
        setTimeError("Please select start time!");
        setTimeout(() => {
          setTimeError("");
        }, 5000);
        return;
      }

      if (!endTime) {
        setTimeError("Please select end time!");
        setTimeout(() => {
          setTimeError("");
        }, 5000);
        return;
      }

      if (startDate >= endDate) {
        let startTimeSections = startTime?.split(":");
        let endTimeSections = endTime?.split(":");

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

  const handleClearTime = (e: SyntheticEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    try {
      delete props.values.start_time;
      delete props.values.end_time;
      delete props.values.start_date;
      delete props.values.end_date;
      let newValues = { ...props.values };
      props.setValues({ ...newValues });
      props.setDateTime(undefined);
      props.setDateTimeInput("");

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
      {timeError && (
        <p>
          <small className="text-danger">{timeError}</small>
        </p>
      )}

      <div className="d-flex mb-3">
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
