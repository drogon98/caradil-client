import { Dispatch } from "react";
import { Car, CustomAvailabilityObj } from "../graphql_types/generated/graphql";

export const getTripDuration = (
  dateTime: CustomAvailabilityObj,
  canRentHourly: boolean = false,
  isBookDuration: boolean = false
): { duration: number; type_: string } => {
  //   console.log("dateTime", dateTime);
  let startDate = new Date(dateTime.startDate!);
  let endDate = new Date(dateTime.endDate!);

  // To calculate the time difference of two dates
  let Difference_In_Time = endDate.getTime() - startDate.getTime();

  // To calculate the no. of days between two dates
  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  //   console.log("Difference_In_Days", Difference_In_Days);

  if (Difference_In_Days === 0) {
    if (canRentHourly || isBookDuration) {
      let startTimeSections = dateTime.startTime?.split(":");
      let endTimeSections = dateTime.endTime?.split(":");

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

      // console.log("duration :>> ", duration);

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
    return {
      duration: Difference_In_Days,
      type_: "day",
    };
  }
};

export const totalChargeCalculator = (
  car: Car,
  dates: CustomAvailabilityObj,
  setTotalCharge: Dispatch<React.SetStateAction<number>>
) => {
  let durationData = getTripDuration(
    dates,
    car?.trip_duration! === "less_24" || car?.trip_duration! === "both"!
  );

  //   console.log("durationData", durationData);

  let total: number;

  if (durationData.type_ === "hour") {
    total = car?.hourly_rate! * durationData.duration;
  }

  if (durationData.type_ === "day") {
    total = car?.daily_rate! * durationData.duration;
  }

  setTotalCharge(total!);
};

export const startHourGreaterThanOrEqualToEndHour = (
  dates: CustomAvailabilityObj
) => {
  let startTimeSections = dates.startTime?.split(":");
  let endTimeSections = dates.endTime?.split(":");

  let startTimeHour = parseInt(startTimeSections?.[0]!, 10);
  let endTimeHour = parseInt(endTimeSections?.[0]!, 10);

  if (startTimeHour >= endTimeHour) {
    return true;
  }
  return false;
};
