import { MoreFiltersStruct } from "./moreFiltersObjToArray";

export const searchDataArrayToObject = (arr: string[]): MoreFiltersStruct => {
  // 0 = Transmission
  // 1 = Seats
  // 2 = Doors
  // 3 = Min Rate
  // 4 = Max Rate
  // 5 = Min Miles
  // 6 = Max Miles
  // 7 = Chauffeur

  let output: MoreFiltersStruct = {
    transmission: "",
    seats: "",
    doors: "",
    min_rate: "",
    max_rate: "",
    min_miles: "",
    max_miles: "",
    chauffeur: "",
  };

  try {
    if (arr.length !== 8) {
      throw new Error("Array values issues");
    }

    if (arr[0] === "manual" || arr[0] === "automatic") {
      output.transmission = arr[0];
    } else {
      output.transmission = "";
    }

    if (parseInt(arr[1])) {
      output.seats = arr[1];
    } else {
      output.seats = "";
    }

    if (parseInt(arr[2])) {
      output.doors = arr[2];
    } else {
      output.doors = "";
    }

    if (parseInt(arr[3])) {
      output.min_rate = arr[3];
    } else {
      output.min_rate = "";
    }

    if (parseInt(arr[4])) {
      output.max_rate = arr[4];
    } else {
      output.max_rate = "";
    }

    if (parseInt(arr[5])) {
      output.min_miles = arr[5];
    } else {
      output.min_miles = "";
    }

    if (parseInt(arr[6])) {
      output.max_miles = arr[6];
    } else {
      output.max_miles = "";
    }
    if (arr[7] === "true" || arr[7] === "false") {
      output.chauffeur = arr[7];
    } else {
      output.chauffeur = "";
    }
  } catch (error) {
    console.log("error :>> ", error);
  }

  return output;
};
