export const DAYS = ["SUN", "MON", "TUE", "WEN", "THU", "FRI", "SAT"];

export const MONTHS_LENGTH = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

const MONTH_BOXES = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
];

export const isLeapYear = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

export const initMonth = (timestamp: number, setActiveMonthIdx: any) => {
  const tempDate = new Date(timestamp);

  setActiveMonthIdx(tempDate.getMonth());

  const actualDate = tempDate.getDate();

  const datesBefore = MONTH_BOXES.slice(0, actualDate);

  const datesAfter = MONTH_BOXES.slice(actualDate);

  let output: number[] = [];

  for (let i = 0; i < datesBefore.length; i++) {
    output = [timestamp - DAY_IN_MILLISECONDS * i, ...output];
  }

  for (let i = 0; i < datesAfter.length; i++) {
    output = [...output, timestamp + DAY_IN_MILLISECONDS * (i + 1)];
  }

  // Index 0 of output will always be the first date of the month
  const firstDayInOutput = output[0];
  const firstDayPositionInTheWeek = new Date(firstDayInOutput).getDay();

  if (firstDayPositionInTheWeek !== 0) {
    let preceedingDaysCount = firstDayPositionInTheWeek;
    for (let i = 0; i < preceedingDaysCount; i++) {
      output = [firstDayInOutput - DAY_IN_MILLISECONDS * (i + 1), ...output];
    }
  }

  return output.slice(0, 35);
};

export const getMonthDays = (
  timestamp: number,
  next: boolean,
  activeMonthIdx: number
): number[] => {
  let output: number[] = [];

  const tempDate = new Date(timestamp);
  if (next) {
    // check if timestamp belongs to the active month. If not loop until you get active month start date. Get its idx in 0-6
    if (tempDate.getMonth() !== activeMonthIdx) {
      let count = 0;
      let dateToIncrement = timestamp;
      let datesArr: number[] = [timestamp];
      while (new Date(datesArr[count]).getMonth() !== activeMonthIdx) {
        dateToIncrement += DAY_IN_MILLISECONDS;
        datesArr = [...datesArr, dateToIncrement];
        count = count + 1;
      }

      for (let i = 1; i < MONTH_BOXES.length - count; i++) {
        output = [...output, datesArr[count] + DAY_IN_MILLISECONDS * i];
      }
      output = [...datesArr, ...output];
    } else {
      // Check if the timestamp is the first date
      if (tempDate.getDay() === 0 && tempDate.getDate() === 1) {
        for (let i = 0; i < MONTH_BOXES.length; i++) {
          output = [...output, timestamp + DAY_IN_MILLISECONDS * i];
        }
      } else {
        // Get the index of the timestamp 0-6
        let datesBefore: number[] = [];

        for (let i = 0; i <= 7; i++) {
          datesBefore = [timestamp - DAY_IN_MILLISECONDS * i, ...datesBefore];
        }

        datesBefore = [...datesBefore];

        for (let i = 1; i < MONTH_BOXES.length; i++) {
          output = [...output, timestamp + DAY_IN_MILLISECONDS * i];
        }
        output = [...datesBefore, ...output].slice(0, 35);
      }
    }
  } else {
    // Loop through the dates to get the active month date 1
    let dateToDecrement = timestamp;
    while (dateToDecrement) {
      if (
        new Date(dateToDecrement).getDate() === 1 &&
        new Date(dateToDecrement).getMonth() === activeMonthIdx
      ) {
        break;
      } else {
        dateToDecrement = dateToDecrement - DAY_IN_MILLISECONDS;
      }
    }

    const dateOneWeekIdx = new Date(dateToDecrement).getDay();

    let datesBefore: number[] = [];

    if (dateOneWeekIdx !== 0) {
      // Get dates before
      for (let i = 0; i < dateOneWeekIdx + 1; i++) {
        datesBefore = [
          dateToDecrement - DAY_IN_MILLISECONDS * i,
          ...datesBefore,
        ];
      }

      for (let i = 1; i < MONTH_BOXES.length; i++) {
        output = [...output, dateToDecrement + DAY_IN_MILLISECONDS * i];
      }
      output = [...datesBefore, ...output].slice(0, 35);
    } else {
      for (let i = 0; i < MONTH_BOXES.length; i++) {
        output = [...output, dateToDecrement + DAY_IN_MILLISECONDS * i];
      }
    }
  }

  return output;
};

export const isToday = (someDate: Date) => {
  const today = new Date();
  return someDate.toDateString() === today.toDateString();
};

export const getDatesBetween = (startDate: number, endDate: number) => {
  let output: number[] = [startDate];

  let tempStartDate = startDate;

  while (tempStartDate < endDate) {
    tempStartDate = output[output.length - 1] + DAY_IN_MILLISECONDS;
    output = [...output, tempStartDate];
  }

  return output;
};

export const stringifyDate = (date: number): string => {
  return new Date(date).toLocaleDateString();
};
