import Calendar from "@lls/react-light-calendar";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { BsArrowLeft } from "react-icons/bs";
import { AuthWrapper } from "../../../../components/AuthWrapper";
import { CustomHead } from "../../../../components/CustomHead";
import AccountLayout from "../../../../components/layouts/AccountLayout";
import { Loading } from "../../../../components/Loading";
import { ButtonLoading } from "../../../../components/Loading/ButtonLoading";
import { ToastWrapper } from "../../../../components/Toast/ToastWrapper";
import { time24hrs } from "../../../../data";
import {
  Trip,
  useGetTripQuery,
  useRescheduleTripMutation,
} from "../../../../graphql_types/generated/graphql";
import { getExactStartAndEndTime } from "../../../../utils/trip_duration_ttl_calc";

interface RescheduleTripProps {}

const RescheduleTrip: FC<RescheduleTripProps> = (props) => {
  const [mainLoading, setMainLoading] = useState(true);
  const router = useRouter();
  const [tripId, setTripId] = useState<number>();
  const [skip, setSkip] = useState(true);
  const [trip, setTrip] = useState<Trip>();
  const { data, loading, subscribeToMore } = useGetTripQuery({
    variables: { tripId: tripId! },
    skip,
    // fetchPolicy: "network-only",
  });
  const [startDate, setStartDate] = useState(() => {
    let date = new Date();
    return date.getTime();
  });
  const [endDate, setEndDate] = useState(() => {
    let date = new Date();
    return date.getTime();
  });

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [okWithDatesAndTime, setOkWithDatesAndTime] = useState(false);
  const [rescheduleTrip, { loading: rescheduling }] =
    useRescheduleTripMutation();
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [showToast, setShowToast] = useState(false);

  //   console.log("trip :>> ", trip);

  useEffect(() => {
    if (router.query) {
      try {
        const tripID = parseInt(router.query.id as string, 10);
        console.log("tripID", tripID);
        if (isNaN(tripID)) {
          throw new Error("Invalid trip id");
        }

        setTripId(tripID);
      } catch (error) {
        console.log("error", error);
      }
    }
  }, [router.query]);

  useEffect(() => {
    if (tripId) {
      setSkip(false);
    }
  }, [tripId]);

  useEffect(() => {
    if (data?.getTrip.trip?.id) {
      setTrip(data.getTrip.trip);
    }
  }, [data]);

  useEffect(() => {
    if (!loading && trip?.id) {
      setStartTime(trip.start_time!);
      setEndTime(trip.end_time!);
      setMainLoading(false);
    }
  }, [trip, loading]);

  const handleTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === "start_time") {
      setStartTime(e.target.value);
    } else {
      setEndTime(e.target.value);
    }
  };

  const disableDates = (date: number) => {
    try {
      let tripsData = trip?.car_trips_data?.data!;
      let tripsDataWithoutThisTrip = tripsData.filter((tD) => tD.id !== tripId);
      let isInTrips = false;
      let index = 0;

      while (index < tripsDataWithoutThisTrip.length) {
        let currentTripData = tripsDataWithoutThisTrip[index];

        // let exactTimes = getExactStartAndEndTime({
        //   start_date: currentTripData.start_date,
        //   end_date: currentTripData.end_date,
        //   start_time: currentTripData.start_time,
        //   end_time: currentTripData.end_time,
        // });

        // console.log("exactTimes", exactTimes);

        // if (date >= exactTimes.startTime && date <= exactTimes.endTime) {
        //   isInTrips = true;
        //   break;
        // }

        if (currentTripData.start_date !== currentTripData.end_date) {
          let datesBetweenTripStartAndEndInclusive = [
            currentTripData.start_date,
          ];
          //   console.log("currentTripData", currentTripData);
          let currentDate = currentTripData.start_date + 86400000;

          while (currentDate <= currentTripData.end_date) {
            datesBetweenTripStartAndEndInclusive = [
              ...datesBetweenTripStartAndEndInclusive,
              currentDate,
            ];
            currentDate += 86400000;
          }

          console.log(
            "datesBetweenTripStartAndEndInclusive",
            datesBetweenTripStartAndEndInclusive
          );

          let dateInATrip = datesBetweenTripStartAndEndInclusive.some(
            (d) => d === date
          );

          if (dateInATrip) {
            isInTrips = true;
            break;
          }
        } else {
          if (currentTripData.start_date === date) {
            isInTrips = true;
            break;
          }
        }

        index++;
      }

      let operationDays = trip?.car_trips_data?.car.book_and_trip_days!;

      let isInOperationDays = operationDays.some(
        (d) => d === new Date(date).getDay()
      );

      console.log("isInOperationDays", isInOperationDays);

      return (
        date < new Date().getTime() - 86400000 ||
        isInTrips ||
        !isInOperationDays
      );
    } catch (error) {
      return false;
    }
  };

  const handleDateChange = (start_date: number, end_date: number) => {
    if (start_date && end_date && start_date !== end_date) {
      console.log("start_date :>> ", start_date);
      console.log("end_date :>> ", end_date);
      try {
        let invalidTripDates: number[] = [];

        let tripDates: number[] = [];
        // let tripDates= props.car?.trips_data

        let operationDays = trip?.car_trips_data?.car?.book_and_trip_days!;

        // invalidTripDates = [...operationDays, ...tripDates];
        invalidTripDates = [...tripDates];

        let tripDatesRange: number[] = [];

        let currentDate = start_date;

        while (currentDate <= end_date) {
          let dateTime = new Date(currentDate).getTime();

          tripDatesRange = [...tripDatesRange, dateTime];

          currentDate += 86400000;
        }

        // console.log("tripDatesRange", tripDatesRange);

        let isValidTripDay = true;

        let idx = 0;

        while (idx < tripDatesRange.length) {
          // console.log("idx", idx);
          let existsInTripDates = invalidTripDates.some((d) => {
            return d === tripDatesRange[idx];
          });

          let inOperationDays = operationDays.some((d) => {
            return d === new Date(tripDatesRange[idx]).getDay();
          });

          let exists = existsInTripDates || !inOperationDays;

          if (exists) {
            isValidTripDay = false;
            break;
          }
          idx++;
        }

        // props.setEndDate(end_date);
        if (isValidTripDay) {
          setEndDate(end_date);
        } else {
          setStartDate(end_date);
          setEndDate(end_date);
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    } else {
      console.log("Helloo");
      setStartDate(start_date);
      if (!end_date) {
        console.log("Helloo2");
        setEndDate(start_date);
      } else {
        setEndDate(end_date);
      }
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "reschedule_reason") {
      setRescheduleReason(e.target.value);
    } else {
      setOkWithDatesAndTime(e.target.value === "true" ? true : false);
    }
  };

  const handleRescheduleTrip = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let response = await rescheduleTrip({
        variables: {
          tripId: tripId!,
          input: {
            start_date: startDate,
            end_date: endDate,
            start_time: startTime,
            end_time: endTime,
            reschedule_reason: rescheduleReason,
          },
        },
      });
      if (response.data?.rescheduleTrip.success) {
        setShowToast(true);
        setTimeout(() => {
          router.replace(`/account/trips/${tripId}`);
        }, 3000);
      }
    } catch (error) {}
  };

  return (
    <>
      <CustomHead title="Account - Reschedule Trip" />
      <AuthWrapper>
        <AccountLayout>
          {mainLoading ? (
            <Loading />
          ) : (
            <div className="p-2 col-md-8 col-lg-6 mx-auto my-4">
              {showToast && (
                <ToastWrapper
                  setShow={setShowToast}
                  show={showToast}
                  message={"Trip successfully rescheduled!"}
                  position="bottom-end"
                  bg="success"
                />
              )}{" "}
              <div className="d-flex align-items-center">
                <button
                  className="btn m-0 p-0"
                  onClick={() => {
                    router.back();
                  }}
                >
                  <BsArrowLeft size={"30px"} />
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="fw-bolder" style={{ fontSize: "30px" }}>
                  Reschedule Trip
                </span>
              </div>
              <p>
                To reschedule the trip,pick your new dates and time. If the
                dates you intend to reschedule to are disabled,that means the
                car is not available. Your only solution should be to cancel the
                trip and book another car available in your intended dates and
                time. Otherwise, reschedule the trip.
              </p>
              <div className="row my-4">
                <div className="col-sm-6">
                  <div>
                    <label style={{ fontSize: "11px" }}>
                      Start & End Dates
                    </label>
                  </div>
                  {/* <Calendar
                    startDate={startDate}
                    endDate={endDate}
                    disableDates={disableDates}
                    onChange={handleDateChange}
                  /> */}
                </div>
                <div className="col-sm-6">
                  <div className="col d-flex flex-column w-100">
                    <div>
                      <label style={{ fontSize: "11px" }}>Start Time</label>
                    </div>
                    <div>
                      <div className="w-100">
                        <select
                          className="w-100 form-control"
                          name="start_time"
                          onChange={handleTimeChange}
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
                  <br />
                  <div className="col d-flex flex-column w-100">
                    <div>
                      <label style={{ fontSize: "11px" }}>End Time</label>
                    </div>
                    <div>
                      <div className="w-100">
                        <select
                          className="w-100 form-control"
                          name="end_time"
                          onChange={handleTimeChange}
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
              </div>
              <div>
                <form onSubmit={handleRescheduleTrip}>
                  <label>Reschedule Reason</label>
                  <textarea
                    value={rescheduleReason}
                    name="reschedule_reason"
                    onChange={handleChange}
                    className="form-control"
                    required
                  />{" "}
                  <div className="form-check mt-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={okWithDatesAndTime ? "false" : "true"}
                      id="ok-with-dates-and-time"
                      checked={okWithDatesAndTime}
                      name="is_ok_with_dates_and_time"
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="ok-with-dates-and-time"
                    >
                      Am ok with the new dates and time.
                    </label>
                  </div>
                  {okWithDatesAndTime && (
                    <div>
                      <small className="text-danger">
                        Note: By rescheduling this trip any action that might
                        lead to its cancellation,any cancellation fee will be
                        calculated based on the initial time and dates.
                      </small>
                    </div>
                  )}
                  <div className="d-grid gap-2 mt-4">
                    <button
                      type="submit"
                      className="btn bgOrange"
                      disabled={rescheduling || !okWithDatesAndTime}
                      // onClick={handleRescheduleTrip}
                    >
                      {rescheduling ? (
                        <ButtonLoading
                          spinnerColor="white"
                          dimensions={{ height: "24px", width: "24px" }}
                        />
                      ) : (
                        "Reschedule Trip"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default RescheduleTrip;

// 0:
// end_date: 1646006400000
// end_time: "03:00"
// id: 16
// start_date: 1645833600000
// start_time: "01:00"
// __typename: "TripIdAndDatesObj"
// [[Prototype]]: Object
// 1:
// end_date: 1646870400000
// end_time: "03:30"
// id: 18
// start_date: 1646524800000
// start_time: "02:30"
// __typename: "TripIdAndDatesObj"
// [[Prototype]]: Object
// 2:
// end_date: 1646311393363
// end_time: "06:00"
// id: 21
// start_date: 1646311393363
// start_time: "04:00"
// __typename: "TripIdAndDatesObj"
// [[Prototype]]: Object
// 3:
// end_date: 1646352000000
// end_time: "10:00"
// id: 22
// start_date: 1646352000000
// start_time: "03:00"
// __typename: "TripIdAndDatesObj"
