import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import LoginWithModal from "../../components/Auth/LoginWithModal";
import { CustomHead } from "../../components/CustomHead";
import { useRole } from "../../components/hooks/useRole";
import { useUserId } from "../../components/hooks/useUserId";
import Layout from "../../components/layouts/Layout";
import { Loading } from "../../components/Loading";
import { CarDetailsDescription } from "../../components/PublicCar/CarDetailsDescription";
// import { CarDetailsGuidelines } from "../../components/PublicCar/CarDetailsGuidelines";
import { CarDetailsHost } from "../../components/PublicCar/CarDetailsHost";
import { CarDetailsReviews } from "../../components/PublicCar/CarDetailsReviews";
// import { CarDetailsFaqs } from "../../components/PublicCar/CarDetailsFaqs";
import { CarDetailsSecondaryFeatures } from "../../components/PublicCar/CarDetailsSecondaryFeatures";
// import { CarDetailsReviews } from "../../components/PublicCar/CarDetailsReviews";
import { CarDetailsTop } from "../../components/PublicCar/CarDetailsTop";
import SharedSections from "../../components/PublicCar/SharedSections";
import TripDatesModal from "../../components/PublicCar/TripDatesModal";
import {
  Car,
  OnCarUpdateDocument,
  useEditCarReservedForBookingMutation,
  // useCheckIfDriverIsApprovedToDriveLazyQuery,
  useGetCarQuery,
  useUpdateCarFavouriteMutation,
} from "../../graphql_types/generated/graphql";
import { useAppSelector } from "../../redux/hooks";
import { TripDatesObj } from "../../utils/interfaces";
import {
  getTripDuration,
  totalChargeCalculator,
} from "../../utils/trip_duration_ttl_calc";
import { unslugify } from "../../utils/unslugify";

interface CarProps {}

const Car: FC<CarProps> = (props) => {
  const router = useRouter();
  const [car, setCar] = useState<Car | null>();
  const [skip, setSkip] = useState(true);
  const [mainLoading, setMainLoading] = useState<boolean>(true);
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const userId = useUserId(token);
  const [isFavourite, setIsFavourite] = useState<boolean>();
  const [values, setValues] = useState<TripDatesObj>({
    start_date: null,
    end_date: null,
    start_time: "",
    end_time: "",
  });
  // const [userDates, setUserDates] = useState<TripDatesObj>({
  //   start_date: "",
  //   start_time: "",
  //   end_date: "",
  //   end_time: "",
  // });
  // const [selectingDates, setSelectingDates] = useState<boolean | undefined>();
  const [validDates, setValidDates] = useState<boolean>(false);
  // const pickDatesButtonRef = useRef<HTMLButtonElement>(null);
  // const pickDatesRef = useRef<HTMLDivElement>(null);
  // useOutsideClickHandler(pickDatesRef, setSelectingDates, pickDatesButtonRef);
  const [isCarPreview, setIsCarPreview] = useState(false);
  const [timeError, setTimeError] = useState("");
  const [showTripDatesModal, setShowTripDatesModal] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(() => {
    let date = new Date();
    return date.getTime();
  });
  const [endDate, setEndDate] = useState(() => {
    let date = new Date();
    return date.getTime();
  });
  // const [
  //   checkIfDriverIsApproved,
  //   { data: approvedData, loading: approvedLoading },
  // ] = useCheckIfDriverIsApprovedToDriveLazyQuery({
  //   fetchPolicy: "network-only",
  // });

  const [updateFavourite, { loading: updatingFavourite }] =
    useUpdateCarFavouriteMutation();

  const [editReservedForBooking, { loading: editingReservedForBooking }] =
    useEditCarReservedForBookingMutation();

  const [totalCharge, setTotalCharge] = useState<number>();
  const [isNotAvailable, setIsNotAvailable] = useState(false);

  const carId = parseInt(router.query.id as string, 10);

  // useEffect(() => {
  //   const redirect = async () => {
  //     if (approvedData?.checkIfDriverIsApprovedToDrive) {
  //       if (approvedData?.checkIfDriverIsApprovedToDrive.error) {
  //       } else if (approvedData?.checkIfDriverIsApprovedToDrive.approved) {
  // await router.push({
  //   pathname: "/checkout/confirm-order",
  //   query: { carId, ...userDates, approved: true },
  // });
  //       } else if (!approvedData?.checkIfDriverIsApprovedToDrive.approved) {
  //         await router.push({
  //           pathname: "/checkout/approve-driver",
  //           query: { carId, ...userDates, approved: false },
  //         });
  //       }
  //     }
  //   };
  //   redirect();
  // }, [approvedData]);

  useEffect(() => {
    if (carId) {
      setSkip(false);
    }
  }, [carId]);

  const { data, loading, subscribeToMore } = useGetCarQuery({
    variables: {
      carId: parseInt(router.query.id as string, 10),
      carName: unslugify(router.query.slug as string),
    },
    skip,
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    let carSub: { (): void; (): void };
    if (subscribeToMore && !skip) {
      carSub = subscribeToMore({
        document: OnCarUpdateDocument,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const updatedCar: any = { ...subscriptionData.data };
          console.log("updatedCar", updatedCar);
          return {
            getCar: { car: { ...prev.getCar.car, ...updatedCar } },
          };
        },
      });
    }

    return () => {
      if (carSub) {
        carSub();
      }
    };
  }, [subscribeToMore, skip]);

  useEffect(() => {
    if (carId && data?.getCar) {
      let newData = { ...data.getCar };

      delete newData.__typename;

      setCar(newData.car);
      // setTotalCharge(newData.car?.daily_rate!);
      const found = newData.car?.besties?.find((user) => user.id === userId);
      setIsFavourite(found ? true : false);
    }
  }, [data, carId]);

  useEffect(() => {
    if (
      values?.start_date &&
      values?.start_time &&
      values?.end_date &&
      values?.end_time
    ) {
      setValidDates(true);
    } else {
      setValidDates(false);
    }
  }, [values]);

  useEffect(() => {
    if (validDates && car && values) {
      totalChargeCalculator(car, values, setTotalCharge);
    } else {
      setTotalCharge(undefined);
    }
  }, [validDates, values, car]);

  useEffect(() => {
    if (data && !loading) {
      setMainLoading(false);
    }
  }, [data, loading]);

  useEffect(() => {
    if (router && router.query) {
      try {
        let tempIsCarPreview = router.query.is_car_preview;
        if (tempIsCarPreview) {
          setIsCarPreview(true);
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  }, [router]);

  useEffect(() => {
    if (car) {
      setIsNotAvailable(
        car?.booked! ||
          car.being_edited! ||
          !car.active ||
          !car?.published! ||
          (car.reserved_for_booking! &&
            car.reserved_for_booking_guest_id! !== userId)
      );
    }
  }, [car]);

  const getTimeBeforeTrip = (): number => {
    let daysBeforeTrip = car?.advance_book_period;

    let timeBeforeTrip = 0;

    if (daysBeforeTrip !== 4) {
      timeBeforeTrip = 86400000 * daysBeforeTrip!;
    }

    return timeBeforeTrip;
  };

  useEffect(() => {
    if (car) {
      let time = new Date().getTime() + 86400000;
      let timeBeforeTrip = getTimeBeforeTrip();
      if (timeBeforeTrip !== 0) {
        setStartDate(time + timeBeforeTrip);
        setEndDate(time + timeBeforeTrip);
      }
    }
  }, [car]);

  useEffect(() => {
    if (sessionStorage.getItem("trip_dates")) {
      let storedData = JSON.parse(sessionStorage.getItem("trip_dates")!);

      let tripDuration = getTripDuration(
        { ...storedData },
        car?.can_rent_hourly!
      );

      if (car?.id === storedData.carId) {
        delete storedData.carId;

        if (tripDuration.duration === 1 || tripDuration.type_ === "hour") {
          setValues({ ...storedData });
          setStartDate(storedData.start_date!);
          setEndDate(storedData.start_date!);
        } else {
          setValues({ ...storedData });
          setStartDate(storedData.start_date!);
          setEndDate(storedData.end_date!);
        }
      }
    }
  }, [car?.id]);

  const handleRouteNext = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // if (getTripDuration(userDates!, car?.can_rent_hourly!).type_ === "hour") {
      //   if (startHourGreaterThanOrEqualToEndHour(userDates!)) {
      //     setTimeError(true);
      //     setTimeout(() => {
      //       setTimeError(false);
      //     }, 5000);
      //     return;
      //   }
      // }

      if (
        !(
          car?.reserved_for_booking! &&
          car.reserved_for_booking_guest_id === userId
        )
      ) {
        let response = await editReservedForBooking({
          variables: { carId: car?.id! },
        });

        if (response.data?.editCarReservedForBooking) {
          // await router.push({
          //   pathname: "/checkout/confirm-order",
          //   query: { carId, ...values, approved: true },
          // });

          if (car?.end_user_type === "self_driven") {
            await router.push({
              pathname: "/checkout/get-driver-info",
              query: { carId, ...values, approved: true },
            });
          } else {
            await router.push({
              pathname: "/checkout/confirm-order",
              query: { carId, ...values, approved: true },
            });
          }
        } else {
          // Car already reserved for booking by other user
        }
      } else {
        // Current user reserved car for booking
        if (car?.end_user_type === "self_driven") {
          await router.push({
            pathname: "/checkout/get-driver-info",
            query: { carId, ...values, approved: true },
          });
        } else {
          await router.push({
            pathname: "/checkout/confirm-order",
            query: { carId, ...values, approved: true },
          });
        }
      }
    } catch (error) {
      console.log("error :>> ", error);
    }

    // checkIfDriverIsApproved();
    // const response = checkIfDriverIsApproved();
    // console.log("response :>> ", response);
  };

  const handleUpdateFavourite = async (
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const response = await updateFavourite({
      variables: { carId, opType: isFavourite ? "remove" : "add" },
    });

    if (response.data?.updateFavourite.error) {
    } else {
      setIsFavourite(!isFavourite);
    }
  };

  // const handleSelectDates = (e: SyntheticEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   if (selectingDates === undefined) {
  //     setSelectingDates(true);
  //   } else {
  //     setSelectingDates(!selectingDates);
  //   }
  // };

  const disableDates = (date: number) => {
    const operationDays = car?.book_and_trip_days;

    let isOperationDay = operationDays?.some(
      (d) => d === new Date(date).getDay()
    );

    let disabledTime = getTimeBeforeTrip();

    if (disabledTime === 0) {
      return date < new Date().getTime() - 86400000 || !isOperationDay;
    } else {
      return date < new Date().getTime() + disabledTime || !isOperationDay;
    }
    // return date < new Date().getTime() - 86400000 || !isOperationDay;
  };

  const handleApplyTime = () => {
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

      // console.log("values", values);

      let startTimeSections = values.start_time?.split(":");
      let endTimeSections = values.end_time?.split(":");

      if (startDate >= endDate) {
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

      // setStartDate(tempStartDate);
      // setEndDate(tempEndDate);

      // console.log("startDate :>> ", startDate);
      // console.log("tempStartDate :>> ", tempStartDate);

      setValues({
        start_time: values.start_time,
        end_time: values.end_time,
        start_date: startDate,
        end_date: endDate,
      });
      sessionStorage.setItem(
        "trip_dates",
        JSON.stringify({
          carId: car?.id,
          start_time: values.start_time,
          end_time: values.end_time,
          start_date: startDate,
          end_date: endDate,
        })
      );
      setShowTripDatesModal(false);
    } catch (error) {
      console.log("error :>> ", error);
    }
    // props.setSho(false);
  };

  const handleClearDates = (e: SyntheticEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    try {
      if (car) {
        let time = new Date().getTime();
        let timeBeforeTrip = getTimeBeforeTrip();
        if (timeBeforeTrip !== 0) {
          setStartDate(time + 86400000 + timeBeforeTrip);
          setEndDate(time + 86400000 + timeBeforeTrip);
        } else {
          setStartDate(time);
          setEndDate(time);
        }
        setValues({
          start_date: null,
          end_date: null,
          start_time: "",
          end_time: "",
        });
        sessionStorage.removeItem("trip_dates");
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  // console.log("car", car);

  return (
    <>
      <CustomHead title="Car" />
      <Layout>
        {mainLoading ? (
          <Loading />
        ) : (
          <>
            {car?.photos?.length === 0 ? (
              <div
                id="carCarouselControls"
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-interval="10000"
              >
                <div className="carousel-inner">
                  <div className="carousel-item car-carousel-item active">
                    <img src="/images/lambo.jpg" />
                  </div>
                  <div className="carousel-item car-carousel-item">
                    <img src="/images/lambo.jpg" />
                  </div>
                  <div className="carousel-item car-carousel-item">
                    <img src="/images/lambo.jpg" />
                  </div>
                  <span className="carousel-fav-icon cursor-pointer">
                    <BsSuitHeart size="28px" />
                  </span>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carCarouselControls"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-icon-wrapper">
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carCarouselControls"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-icon-wrapper">
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </span>
                </button>
              </div>
            ) : (
              <div
                id="carCarouselControls"
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-interval="10000"
              >
                <div className="carousel-inner">
                  {car?.photos?.map((photo, idx) => (
                    <div
                      key={idx}
                      className={`carousel-item car-carousel-item ${
                        idx === 0 && "active"
                      }`}
                    >
                      <img src={photo.secure_url!} />
                    </div>
                  ))}

                  {token ? (
                    <button
                      onClick={handleUpdateFavourite}
                      disabled={updatingFavourite || isCarPreview}
                      className="carousel-fav-icon cursor-pointer"
                    >
                      {isFavourite ? (
                        <BsSuitHeartFill className="carousel-heart-icon" />
                      ) : (
                        <BsSuitHeart className="carousel-heart-icon" />
                      )}
                    </button>
                  ) : (
                    <LoginWithModal>
                      {/* <Link
                        href={{
                          pathname: "/login",
                          query: {
                            next: router.pathname,
                            nextQuery: JSON.stringify(router.query),
                          },
                        }}
                      > */}
                      {/* <a> */}
                      <button className="carousel-fav-icon cursor-pointer">
                        <BsSuitHeart size="28px" />
                      </button>
                      {/* </a> */}
                      {/* </Link> */}
                    </LoginWithModal>
                  )}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carCarouselControls"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-icon-wrapper">
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carCarouselControls"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-icon-wrapper">
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </span>
                </button>
              </div>
            )}

            <div className="customCarDetailsContainer my-4">
              <div className="carDetailsWrapper">
                <div className="p-2">
                  <div className="carDetailsTop mb-5">
                    <CarDetailsTop
                      data={{
                        name: car?.name,
                        trips: car?.trips,
                        gas: car?.gas,
                        transmission: car?.transmission,
                        seats: car?.seats,
                        // doors: car?.doors,
                        bags: car?.bags,
                      }}
                    />
                  </div>
                  <div className="carDetailsHost mb-5">
                    <CarDetailsHost data={car?.owner} />
                  </div>
                  <div className="carDetailsDescription mb-5">
                    <CarDetailsDescription data={car?.description} />
                  </div>
                  <div className="carDetailsSecondaryFeatures mb-5">
                    <CarDetailsSecondaryFeatures data={car?.features} />
                  </div>
                  {/*<div className="carDetailsGuidelines mb-4">
                    <CarDetailsGuidelines />
                  </div>
                   <div className="carDetailsFaqs mb-4">
                    <CarDetailsFaqs />
                  </div>*/}
                  <div className="carDetailsReviews car-reviews-md mb-4">
                    <CarDetailsReviews carId={car?.id!} />
                  </div>
                  <div className="shared-section-sm-screen">
                    <SharedSections
                      isFavourite={isFavourite!}
                      handleUpdateFavourite={handleUpdateFavourite}
                      updatingFavourite={updatingFavourite}
                      car={car!}
                      isCarPreview={isCarPreview}
                    />
                  </div>
                </div>
                {/* <div> */}
                <div>
                  <div className="carDetailsChargeCard px-2 py-3 shadow">
                    <div>
                      {isNotAvailable && !isCarPreview && (
                        <>
                          <small className="fw-bolder text-danger">
                            This car is unavailable!
                          </small>
                          <small
                            style={{
                              textDecoration: "underline",
                              marginLeft: "10px",
                              fontSize: "14px",
                            }}
                          >
                            <Link
                              href={{
                                pathname: "/browse-cars/[make]",
                                query: {
                                  make: car?.make!,
                                  categories: JSON.stringify(car?.categories),
                                  color: car?.color,
                                  gas: car?.gas,
                                  location: car?.location,
                                  subject: car?.id,
                                },
                              }}
                            >
                              <a>Check similar cars</a>
                            </Link>
                          </small>
                        </>
                      )}
                    </div>

                    <div>
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="fw-bolder m-0">
                          Ksh.{car?.daily_rate!.toLocaleString()}/day
                        </h6>
                        <small className="fw-bold ml-3">
                          {validDates &&
                            `Total Ksh.${totalCharge?.toLocaleString()}`}
                        </small>
                      </div>
                      {car?.can_rent_hourly && !car?.booked && (
                        <div style={{ lineHeight: "11px" }}>
                          <small style={{ fontSize: "11px" }}>
                            You can rent this car for trips lasting less than
                            24hrs. By doing so you will be charged hourly. The
                            hourly rate for this car is{" "}
                            <b>Ksh.{car?.hourly_rate}/hr</b>
                          </small>
                        </div>
                      )}
                    </div>

                    <hr />
                    {/* <h6>Select Trip Dates And Time</h6> */}
                    <TripDatesModal
                      disableDates={disableDates}
                      values={values}
                      setValues={setValues}
                      timeError={timeError}
                      applyTime={handleApplyTime}
                      show={showTripDatesModal}
                      hide={() => setShowTripDatesModal(false)}
                      startDate={startDate}
                      endDate={endDate}
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
                      isNotBrowseCarsPage
                      car={car!}
                      clearDates={handleClearDates}
                    >
                      <div className="d-grid gap-2">
                        <button
                          className="btn bg-success"
                          onClick={() => setShowTripDatesModal(true)}
                        >
                          Select Trip Dates
                        </button>
                      </div>
                    </TripDatesModal>

                    {car?.discount && car.discount_days && (
                      <div
                        className="p-2 mt-3"
                        style={{ backgroundColor: "rgba(0,0,0,.1)" }}
                      >
                        <small>
                          {`${car.discount}%`} discount for trips{" "}
                          {`${car.discount_days}+ days`} long
                        </small>
                      </div>
                    )}

                    <hr />

                    <div className="d-grid gap-2">
                      {token && role ? (
                        <button
                          className="btn bgOrange"
                          onClick={handleRouteNext}
                          disabled={
                            !validDates || isCarPreview || isNotAvailable
                          }
                        >
                          Continue
                          {/* {approvedLoading ? (
                            <ButtonLoading
                              spinnerColor="white"
                              dimensions={{ height: "18px", width: "18px" }}
                            />
                          ) : (
                            "Continue"
                          )} */}
                        </button>
                      ) : (
                        // </button>

                        <LoginWithModal>
                          <div className="d-grid gap-2">
                            <button type="submit" className="btn bgOrange">
                              Continue
                            </button>
                          </div>
                        </LoginWithModal>
                      )}
                    </div>

                    <SharedSections
                      isFavourite={isFavourite!}
                      handleUpdateFavourite={handleUpdateFavourite}
                      updatingFavourite={updatingFavourite}
                      car={car!}
                      isCarPreview={isCarPreview}
                    />
                  </div>
                </div>

                <div className="px-2 car-reviews-sm">
                  <CarDetailsReviews carId={car?.id!} />
                </div>
              </div>
            </div>
            {/* </div> */}
            <div
              className={`car-small-screen-bottom ${
                !car?.can_rent_hourly &&
                `car-small-screen-bottom-hourly-text-not`
              } d-flex flex-column justify-content-center p-2 `}
            >
              {isNotAvailable && !isCarPreview && (
                <div
                  style={{ height: "10px", fontSize: "12px" }}
                  className="h-25"
                >
                  <small className="fw-bolder text-danger">
                    This car is unavailable!
                  </small>
                  <small
                    style={{
                      textDecoration: "underline",
                      marginLeft: "10px",
                      fontSize: "13px",
                    }}
                  >
                    <Link
                      href={{
                        pathname: "/browse-cars/[make]",
                        query: {
                          make: car?.make!,
                          categories: JSON.stringify(car?.categories),
                          color: car?.color,
                          gas: car?.gas,
                          location: car?.location,
                          subject: car?.id,

                          // name: "",
                        },
                      }}
                    >
                      <a>Check similar cars</a>
                    </Link>
                  </small>
                </div>
              )}

              <div
                className={`d-flex flex-column justify-content-around w-100 ${
                  isNotAvailable && !isCarPreview ? `h-50` : `h-75`
                }`}
              >
                <div className="d-flex justify-content-between">
                  <div style={{ flex: "2" }}>
                    <div>
                      <div className="d-flex justify-content-between align-items-center">
                        {totalCharge ? (
                          <div className=" text-success">
                            {validDates && (
                              <p className="m-0 fw-bolder">
                                {"Total "}
                                Ksh.{totalCharge.toLocaleString()}
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="m-0 fw-bolder">
                            Ksh.{car?.daily_rate!.toLocaleString()}/day
                          </p>
                        )}
                      </div>
                      {car?.can_rent_hourly &&
                        !car?.booked &&
                        (car?.reserved_for_booking_guest_id === userId ||
                          car?.reserved_for_booking_guest_id === 0) &&
                        !totalCharge && (
                          <div style={{ lineHeight: "12px" }}>
                            <small style={{ fontSize: "10px" }}>
                              You can rent this car for trips less than 24hrs
                              long. You will be charged hourly. The hourly rate
                              is <b>Ksh.{car?.hourly_rate}/hr</b>
                            </small>
                          </div>
                        )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowTripDatesModal(true);
                    }}
                    // onClick={handleSelectDates}
                    disabled={car?.booked || !car?.published}
                    className="btn m-0 p-0"
                    style={{ flex: 1, fontSize: "500", width: "250px" }}
                    // ref={pickDatesButtonRef}
                  >
                    {/* <small className="mr-2">
                    {selectingDates ? "Close trip dates" : "Pick trip dates"}
                  </small> */}
                    <small className="mr-2">Pick trip dates</small>
                  </button>
                </div>
                {car?.discount && car.discount_days && (
                  <div
                    className="p-1 my-1"
                    style={{
                      backgroundColor: "rgba(0,0,0,.1)",
                      fontSize: "10px",
                    }}
                  >
                    <small>
                      {`${car.discount}%`} discount for trips{" "}
                      {`${car.discount_days}+ days`} long
                    </small>
                  </div>
                )}
              </div>
              <div className="h-25">
                <div className="d-grid gap-2 h-100">
                  {token && role ? (
                    <button
                      className="btn bgOrange py-0"
                      onClick={handleRouteNext}
                      disabled={!validDates || isCarPreview}
                    >
                      Continue
                    </button>
                  ) : (
                    <LoginWithModal>
                      <div className="d-grid gap-2 h-100">
                        <button type="submit" className="btn bgOrange py-0">
                          Continue
                        </button>
                      </div>
                    </LoginWithModal>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};
export default Car;
