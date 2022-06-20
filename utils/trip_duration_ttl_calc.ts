import { Dispatch, SetStateAction } from "react";
import { Car } from "../graphql_types/generated/graphql";
import { roundAmount } from "./amount";
import { TripDatesObj } from "./interfaces";

export const getTripDuration = (
  dateTime: TripDatesObj,
  canRentHourly: boolean = false,
  isBookDuration: boolean = false
): { duration: number; type_: string } => {
  let exactTimes = getExactStartAndEndTime(dateTime);

  // To calculate the time difference of two dates
  let Difference_In_Time = exactTimes.endTime - exactTimes.startTime;

  // console.log("Difference_In_Time", Difference_In_Time);

  // To calculate the no. of days between two dates
  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  // console.log("Difference_In_Days", Difference_In_Days);

  if (Difference_In_Days < 1) {
    if (canRentHourly || isBookDuration) {
      let startTimeSections = dateTime.start_time?.split(":");
      let endTimeSections = dateTime.end_time?.split(":");

      let duration: number;

      if (startTimeSections && endTimeSections) {
        let startTimeNum = parseInt(
          startTimeSections?.[0] + startTimeSections[1],
          10
        );
        let endTimeNum = parseInt(
          endTimeSections?.[0] + endTimeSections[1],
          10
        );

        let rawDuration = Math.abs(endTimeNum - startTimeNum).toString();
        // console.log("rawDuration", rawDuration);
        let rawHrs;
        let rawMins;

        if (rawDuration.length < 4) {
          rawHrs = rawDuration.slice(0, 1);
          rawMins = rawDuration.slice(1);
        } else {
          rawHrs = rawDuration.slice(0, 2);
          rawMins = rawDuration.slice(2);
        }

        let hrs;
        let mins;

        if (parseInt(rawMins) === 70) {
          hrs = parseInt(rawHrs) + 1;
          mins = 30;
        } else {
          hrs = parseInt(rawHrs);
          mins = parseInt(rawMins);
        }

        if (mins === 30) {
          duration = hrs + 0.5;
        } else {
          duration = hrs;
        }
      }

      return {
        duration: duration!,
        type_: "hour",
      };
    } else {
      return {
        duration: 1,
        type_: "day",
      };
    }
  } else {
    if (Difference_In_Days.toString().includes(".")) {
      console.log("Difference_In_Days", Difference_In_Days);
      return {
        duration: parseFloat(Number(Difference_In_Days).toFixed(1)),
        type_: "day",
      };
    } else {
      return {
        duration: Difference_In_Days,
        type_: "day",
      };
    }
  }
};

export const totalChargeCalculator = (
  car: Car,
  dates: TripDatesObj,
  setTotalCharge: Dispatch<SetStateAction<number | undefined>>
) => {
  let exactTimes = getExactStartAndEndTime(dates);

  let dateTimePayload: TripDatesObj = {
    start_time: dates.start_time,
    end_time: dates.end_time,
    start_date: exactTimes.startTime,
    end_date: exactTimes.endTime,
  };

  let durationData = getTripDuration(dateTimePayload, car?.can_rent_hourly!);

  let total: number;

  if (durationData.type_ === "hour") {
    total = car?.hourly_rate! * durationData.duration;
  }

  if (durationData.type_ === "day") {
    total = car?.daily_rate! * durationData.duration;
  }

  setTotalCharge(roundAmount(total!, 2));
};

export const startHourGreaterThanOrEqualToEndHour = (dates: TripDatesObj) => {
  let startTimeSections = dates.start_time?.split(":");
  let endTimeSections = dates.end_time?.split(":");

  let startTimeHour = parseInt(startTimeSections?.[0]!, 10);
  let endTimeHour = parseInt(endTimeSections?.[0]!, 10);

  if (startTimeHour >= endTimeHour) {
    return true;
  }
  return false;
};

export const getExactStartAndEndTime = (
  dates: TripDatesObj
): { startTime: number; endTime: number } => {
  let startTimeSections = dates.start_time?.split(":");
  let endTimeSections = dates.end_time?.split(":");

  let tempStartTime = new Date(dates.start_date!).setHours(
    parseInt(startTimeSections[0], 10),
    parseInt(startTimeSections[1], 10)
  );
  let tempEndTime = new Date(dates.end_date!).setHours(
    parseInt(endTimeSections[0], 10),
    parseInt(endTimeSections[1], 10)
  );

  return { startTime: tempStartTime, endTime: tempEndTime };
};
