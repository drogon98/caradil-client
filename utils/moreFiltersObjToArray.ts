export interface MoreFiltersStruct {
  transmission: string;
  seats: string;
  doors: string;
  min_rate: string;
  max_rate: string;
  min_miles: string;
  max_miles: string;
  chauffeur: string;
}

export const moreFiltersObjToArray = (obj: MoreFiltersStruct): string[] => {
  // 0 = Transmission
  // 1 = Seats
  // 2 = Doors
  // 3 = Min Rate
  // 4 = Max Rate
  // 5 = Min Miles
  // 6 = Max Miles
  // 7 = Chauffeur

  let output = [];

  try {
    if (obj) {
      if (Object.keys(obj).length > 0) {
        output[0] = obj.transmission;
        output[1] = obj.seats;
        output[2] = obj.doors;
        output[3] = obj.min_rate;
        output[4] = obj.max_rate;
        output[5] = obj.min_miles;
        output[6] = obj.max_miles;
        output[7] = obj.chauffeur;
      } else {
        output[0] = "";
        output[1] = "";
        output[2] = "";
        output[3] = "";
        output[4] = "";
        output[5] = "";
        output[6] = "";
        output[7] = "";
      }
    } else {
      output[0] = "";
      output[1] = "";
      output[2] = "";
      output[3] = "";
      output[4] = "";
      output[5] = "";
      output[6] = "";
      output[7] = "";
    }
  } catch (error) {
    console.log("error :>> ", error);
  }
  return output;
};
