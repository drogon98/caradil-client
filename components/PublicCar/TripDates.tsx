import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { time24hrs } from "../../data";
import { Car } from "../../graphql_types/generated/graphql";
import { TripDatesObj } from "../../utils/interfaces";
import { totalChargeCalculator } from "../../utils/trip_duration_ttl_calc";
import Calendar from "@lls/react-light-calendar";

// interface TripDatesProps {
//   values: TripDatesObj;
//   setValidDates: Dispatch<SetStateAction<boolean>>;
//   setTripDates: Dispatch<SetStateAction<TripDatesObj>>;
//   userDates: TripDatesObj;
//   setTotalCharge?: Dispatch<React.SetStateAction<number>>;
//   car?: Car;
//   // hasCustomAvailability?: boolean;
//   isReschedule?: boolean;
// }

// export const TripDates: FC<TripDatesProps> = (props) => {
//   const [values, setValues] = useState<TripDatesObj>({
//     endDate: "",
//     endTime: "",
//     startDate: "",
//     startTime: "",
//   });
//   const [minDate, setMinDate] = useState("");
//   const [maxDate, setMaxDate] = useState("");
//   // console.log("values", values);

//   useEffect(() => {
//     if (props.values && props.isReschedule) {
//       setValues({
//         ...props.values!,
//         startDate: createDateValue(new Date(props.values.startDate!))!,
//         endDate: createDateValue(new Date(props.values.endDate!))!,
//       });
//     }
//   }, [props.values, props.isReschedule]);

//   const createDateValue = (date: Date) => {
//     if (date) {
//       return `${date.getFullYear()}-${
//         date.getMonth().toString().length === 1
//           ? `0${date.getMonth() + 1}`
//           : date.getMonth()
//       }-${
//         date.getDate().toString().length === 1
//           ? `0${date.getDate()}`
//           : date.getDate()
//       }`;
//     }
//   };

//   const getMinDate = (val: string) => {
//     if (val) {
//       if (new Date(val) < new Date()) {
//         return createDateValue(new Date());
//       } else {
//         return createDateValue(new Date(val));
//       }
//     } else {
//       if (props.values?.startDate) {
//         return createDateValue(new Date(props.values.startDate));
//       } else {
//         return createDateValue(new Date());
//       }
//     }
//   };

//   const getMaxDate = (val: string) => {
//     if (val) {
//       return createDateValue(new Date(val));
//     } else {
//       if (props.values?.startDate) {
//         return createDateValue(new Date(props.values.startDate));
//       } else {
//         return createDateValue(new Date());
//       }
//     }
//   };

//   const getTimeOptions = (s: string, isStart = true) => {
//     if (s) {
//       let idx = time24hrs.findIndex((el) => el === s);
//       if (isStart) {
//         return time24hrs.slice(idx);
//       } else {
//         return time24hrs.slice(0, idx + 1);
//       }
//     } else {
//       return time24hrs;
//     }
//   };

//   useEffect(() => {
//     if (
//       values?.startDate &&
//       values?.startTime &&
//       values?.endDate &&
//       values?.endTime &&
//       props.car
//     ) {
//       // console.log("values", values);
//       props.setValidDates(true);
//       if (props.setTotalCharge) {
//         totalChargeCalculator(props.car, values, props.setTotalCharge);
//       }
//     }
//   }, [values, props.car]);

//   useEffect(() => {
//     // if (props.car && props.hasCustomAvailability) {
//     //   setMinDate(getMinDate(props.values?.startDate as string)!);
//     //   setMaxDate(getMaxDate(props.values?.endDate as string)!);
//     // } else {
//     const date = new Date();
//     setMinDate(createDateValue(date)!);
//     // }
//     // if (
//     //   props.values?.startDate &&
//     //   props.values?.endDate &&
//     //   props.values?.startTime &&
//     //   props.values?.endTime
//     // ) {

//     // } else {

//     // }
//   }, [props.values, props.car]);

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     if (e.target.name === "startDate") {
//       setMinDate(getMinDate(e.target.value)!);
//     }
//     setValues({ ...values, [e.target.name]: e.target.value });
//     props.setTripDates({
//       ...props.userDates!,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // console.log("minDate :>> ", minDate);
//   // console.log("maxDate :>> ", maxDate);
//   // console.log("props.values :>> ", props.values);

//   return (
//     <>
//       {" "}
//       <small className="mb-1 fw-bold">Trip Start</small>
//       <div className="d-flex mb-3 car-input-container">
//         {" "}
//         <div className="w-50">
//           <input
//             type="date"
//             className="w-100"
//             name="startDate"
//             onChange={handleChange}
//             value={values.startDate!}
//             min={minDate}
//             // max="2018-12-31"
//             // ref={startDateRef}
//           />
//         </div>
//         <div className="w-50">
//           <select
//             className="w-100"
//             name="startTime"
//             onChange={handleChange}
//             value={values.startTime ?? ""}
//           >
//             <option value={""}>Start Time</option>
//             {getTimeOptions(props.values?.startTime ?? "").map((t, idx) => (
//               <option key={idx} value={t}>
//                 {t}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <small className="mb-1 fw-bold">Trip End</small>
//       <div className="d-flex mb-3 car-input-container">
//         <div className="w-50">
//           <input
//             type="date"
//             className="w-100"
//             name="endDate"
//             onChange={handleChange}
//             value={values.endDate!}
//             min={minDate}
//             max={maxDate}
//           />
//         </div>
//         <div className="w-50">
//           <select
//             className="w-100"
//             name="endTime"
//             onChange={handleChange}
//             value={values.endTime ?? ""}
//           >
//             <option value={""}>End Time</option>
//             {getTimeOptions(props.values?.endTime ?? "").map((t, idx) => (
//               <option key={idx} value={t}>
//                 {t}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </>
//   );
// };

interface TripDatesProps {
  disableDates: (d: number) => boolean;
  setValues: Dispatch<SetStateAction<TripDatesObj>>;
  values: TripDatesObj;
  isBooking?: boolean;
  car?: Car;
  timeError: string;
  applyTime?: any;
  startDate: number;
  endDate: number;
  setStartDate: any;
  setEndDate: any;
}

export let TripDates = (props: TripDatesProps) => {
  // const [startTime, setStartTime] = useState<string>();
  // const [endTime, setEndTime] = useState<string>();
  // const [timeError, setTimeError] = useState("");

  // useEffect(() => {
  //   if (props.values) {
  //     if (props.values.start_date) {
  //       setStartDate(props.values.start_date);
  //     }

  //     if (props.values.end_date) {
  //       setEndDate(props.values.end_date);
  //     }
  //   }
  // }, [props.values]);

  // useEffect(() => {
  //   if (startDate) {
  //     props.setValues({ ...props.values!, start_date: startDate });
  //   }

  //   if (endDate) {
  //     props.setValues({ ...props.values!, end_date: endDate });
  //   }
  // }, [startDate, endDate]);

  const handleDateChange = (start_date: number, end_date: number) => {
    props.setStartDate(start_date);
    // props.setValues({ ...props.values, start_date });
    if (!end_date) {
      props.setEndDate(start_date);
      // props.setValues({ ...props.values, end_date: start_date });
    } else {
      props.setEndDate(end_date);
      // props.setValues({ ...props.values, end_date: end_date });
    }
  };

  const handleTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    props.setValues({ ...props.values, [e.target.name]: e.target.value });
  };

  // console.log("props.values", props.values);

  return (
    <>
      {props.timeError && (
        <p>
          <small className="text-danger">{props.timeError}</small>
        </p>
      )}
      <div className="row mb-2">
        <div className="col d-flex flex-column w-50">
          <div>
            <label style={{ fontSize: "11px" }}>Start Time</label>
          </div>
          <div>
            <div className="w-100">
              <select
                className="w-100 form-control"
                name="start_time"
                onChange={handleTimeChange}
                value={props.values.start_time}
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
                name="end_time"
                onChange={handleTimeChange}
                value={props.values.end_time}
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
            startDate={props.startDate}
            endDate={props.endDate}
            disableDates={props.disableDates}
            onChange={handleDateChange}
          />
        </div>
      </div>
    </>
  );
};
