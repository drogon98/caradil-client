import React, { MouseEvent, useEffect, useState } from "react";
import {
  DAYS,
  DAY_IN_MILLISECONDS,
  getDatesBetween,
  getMonthDays,
  initMonth,
  isToday,
  MONTHS,
} from "./helpers";

export interface ICalendarProps {
  startDate: number;
  endDate?: number;
  setStartDate: any;
  setEndDate: any;
  setDates?: React.Dispatch<
    React.SetStateAction<
      | {
          startDate: number | undefined;
          endDate: number | undefined;
        }
      | undefined
    >
  >;
}

const Calendar: React.FC<ICalendarProps> = ({ setDates, ...props }) => {
  const [monthDays, setMonthDays] = useState<number[]>([]);
  const [activeMonthIdx, setActiveMonthIdx] = useState<number>(0);
  const [startDate, setStartDate] = useState<number | undefined>(0);
  const [datesBetween, setDatesBetween] = useState<number[]>([]);
  const [endDate, setEndDate] = useState<number | undefined>(0);
  const [activeYear, setActiveYear] = useState(0);

  useEffect(() => {
    let tempStartDate = new Date(props.startDate);
    let tempEndDate = new Date(
      props.endDate ? props.endDate : props.startDate
    ).getTime();

    const diff = Math.abs(tempEndDate - tempStartDate.getTime());

    let endDateCounter = tempStartDate.getTime();
    if (diff % DAY_IN_MILLISECONDS !== 0) {
      while (
        new Date(endDateCounter).toDateString() !==
        new Date(tempEndDate).toLocaleString()
      ) {
        endDateCounter = endDateCounter + DAY_IN_MILLISECONDS;
      }

      tempEndDate = endDateCounter;
    }

    setStartDate(tempStartDate.getTime());
    setActiveMonthIdx(tempStartDate.getMonth());
    setActiveYear(tempStartDate.getFullYear());
    setEndDate(tempEndDate);

    setMonthDays(initMonth(tempStartDate.getTime(), setActiveMonthIdx));
  }, [props.startDate, props.endDate]);

  const handleDatePick = (e: MouseEvent<HTMLButtonElement>, val: number) => {
    e.preventDefault();
    if (!startDate) {
      setStartDate(val);
      setDatesBetween([val]);
    } else {
      if (val < startDate) {
        setEndDate(startDate);
        setStartDate(val);
        setDatesBetween(getDatesBetween(val, startDate));
        // setDates({
        //   startDate: val,
        //   endDate: startDate,
        // });
        props.setStartDate(val);
        props.setEndDate(startDate);
      } else if (val > startDate) {
        setEndDate(val);
        setDatesBetween(getDatesBetween(startDate, val));
        // setDates({
        //   startDate: startDate,
        //   endDate: val,
        // });
        props.setStartDate(startDate);
        props.setEndDate(val);
      } else {
        setStartDate(val);
        setEndDate(val);
        setDatesBetween(getDatesBetween(val, val));
        // setDates({
        //   startDate: val,
        //   endDate: val,
        // });
        props.setStartDate(val);
        props.setEndDate(val);
      }
    }
  };

  const handlePrevClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let tempMonthIdx = 0;
    if (activeMonthIdx === 0) {
      tempMonthIdx = 11;
    } else {
      tempMonthIdx = activeMonthIdx - 1;
    }

    const tempMonthDays = getMonthDays(
      monthDays[0] - DAY_IN_MILLISECONDS,
      false,
      tempMonthIdx
    );
    setActiveYear(new Date(tempMonthDays[15]).getFullYear());
    setActiveMonthIdx(tempMonthIdx);
    setMonthDays([...tempMonthDays]);
  };

  const handleNextClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let tempMonthIdx = 0;
    if (activeMonthIdx === 11) {
      tempMonthIdx = 0;
    } else {
      tempMonthIdx = activeMonthIdx + 1;
    }
    const tempMonthDays = getMonthDays(
      monthDays[34] + DAY_IN_MILLISECONDS,
      true,
      tempMonthIdx
    );
    setActiveYear(new Date(tempMonthDays[15]).getFullYear());
    setActiveMonthIdx(tempMonthIdx);
    setMonthDays([...tempMonthDays]);
  };

  return (
    <div className="rldrp_calendar_wrapper">
      <div className="rldrp_next_prev_btns_wrapper">
        <button onClick={handlePrevClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z"
            />
          </svg>
        </button>
        <span className="rldrp_month_year">
          {MONTHS[activeMonthIdx]} {activeYear}
        </span>
        <button onClick={handleNextClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8l-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"
            />
          </svg>
        </button>
      </div>
      <div className="rldrp_day_labels_wrapper">
        {DAYS.map((day: string, idx: number) => (
          <div key={idx}>{day}</div>
        ))}
      </div>
      <div className="rldrp_days_wrapper">
        {monthDays.map((date: number, idx: number) => {
          const _isToday = isToday(new Date(date));
          const _isSelected = datesBetween.find((d) => d === date);
          return (
            <button
              key={idx}
              className={`rldrp-date ${_isToday ? `rldrp_today` : ``} ${
                _isSelected ? `rldrp_selected` : ``
              }`}
              onClick={(e) => handleDatePick(e, date)}
            >
              {new Date(date).getDate()}
            </button>
          );
        })}
      </div>

      <div className="rldrp-footer">
        <button
          onClick={() => {
            setStartDate(undefined);
            setEndDate(undefined);
            setDatesBetween([]);
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Calendar;
