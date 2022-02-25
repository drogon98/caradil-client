import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { IoIosArrowDropup } from "react-icons/io";
import LoginWithModal from "../../components/Auth/LoginWithModal";
import { CustomHead } from "../../components/CustomHead";
import { useOutsideClickHandler } from "../../components/hooks/useOutsideClickHandler";
import { useRole } from "../../components/hooks/useRole";
import { useUserId } from "../../components/hooks/useUserId";
import Layout from "../../components/layouts/Layout";
import { Loading } from "../../components/Loading";
import { CarDetailsDescription } from "../../components/PublicCar/CarDetailsDescription";
// import { CarDetailsGuidelines } from "../../components/PublicCar/CarDetailsGuidelines";
import { CarDetailsHost } from "../../components/PublicCar/CarDetailsHost";
// import { CarDetailsFaqs } from "../../components/PublicCar/CarDetailsFaqs";
import { CarDetailsSecondaryFeatures } from "../../components/PublicCar/CarDetailsSecondaryFeatures";
// import { CarDetailsReviews } from "../../components/PublicCar/CarDetailsReviews";
import { CarDetailsTop } from "../../components/PublicCar/CarDetailsTop";
import SharedSections from "../../components/PublicCar/SharedSections";
import TripDatesModal from "../../components/PublicCar/TripDatesModal";
import {
  Car,
  OnReserveForBookingDocument,
  useEditCarReservedForBookingMutation,
  // useCheckIfDriverIsApprovedToDriveLazyQuery,
  useGetCarQuery,
  useUpdateCarFavouriteMutation,
} from "../../graphql_types/generated/graphql";
import { useAppSelector } from "../../redux/hooks";
import { TripDatesObj } from "../../utils/interfaces";
import { totalChargeCalculator } from "../../utils/trip_duration_ttl_calc";
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
  const [selectingDates, setSelectingDates] = useState<boolean | undefined>();
  const [validDates, setValidDates] = useState<boolean>(false);
  const pickDatesButtonRef = useRef<HTMLButtonElement>(null);
  const pickDatesRef = useRef<HTMLDivElement>(null);
  useOutsideClickHandler(pickDatesRef, setSelectingDates, pickDatesButtonRef);
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

  const [totalCharge, setTotalCharge] = useState<number>(0);

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
        document: OnReserveForBookingDocument,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const reserveData: any = { ...subscriptionData.data };
          return {
            getCar: { car: { ...prev.getCar.car, ...reserveData } },
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

  // useEffect(() => {
  //   // if (car?.custom_availability_data) {
  //   //   setValues({
  //   //     startDate: car?.custom_availability_data.startDate,
  //   //     endDate: car?.custom_availability_data.endDate,
  //   //     startTime: car?.custom_availability_data.startTime,
  //   //     endTime: car?.custom_availability_data.endTime,
  //   //   });
  //   // }
  // }, [car]);

  useEffect(() => {
    if (
      values?.start_date &&
      values?.start_time &&
      values?.end_date &&
      values?.end_time
    ) {
      setValidDates(true);
    }
  }, [values]);

  useEffect(() => {
    if (validDates && car && values) {
      totalChargeCalculator(car, values, setTotalCharge);
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
          await router.push({
            pathname: "/checkout/confirm-order",
            query: { carId, ...values, approved: true },
          });
        } else {
          // Car already reserved for booking by other user
        }
      } else {
        // Current user reserved car for booking
        await router.push({
          pathname: "/checkout/confirm-order",
          query: { carId, ...values, approved: true },
        });
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

  const handleSelectDates = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectingDates === undefined) {
      setSelectingDates(true);
    } else {
      setSelectingDates(!selectingDates);
    }
  };

  const disableDates = (date: number) => date < new Date().getTime() - 86400000;

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

      if (startDate >= endDate) {
        let startTimeSections = values.start_time?.split(":");
        let endTimeSections = values.end_time?.split(":");

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

      setValues({
        start_time: values.start_time,
        end_time: values.end_time,
        start_date: startDate,
        end_date: endDate,
      });
      setShowTripDatesModal(false);
    } catch (error) {
      console.log("error :>> ", error);
    }
    // props.setSho(false);
  };

  // const handleClearTime = (e: SyntheticEvent<HTMLButtonElement>) => {
  //   // e.preventDefault();
  //   try {
  //     delete values.start_time;
  //     delete values.end_time;
  //     delete values.start_date;
  //     delete values.end_date;
  //     let newValues = { ...values };
  //     props.setValues({ ...newValues });
  //     props.setDateTime(undefined);
  //     props.setDateTimeInput("");

  //     // if (props.searchBtnRef.current) {
  //     //   props.searchBtnRef.current?.click();
  //     // }

  //     props.setShowWhenComp(false);
  //   } catch (error) {
  //     console.log("error :>> ", error);
  //   }
  // };

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
                        doors: car?.doors,
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
                  </div>
                  <div className="carDetailsReviews mb-4">
                    <CarDetailsReviews />
                  </div> */}
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
                      {(car?.booked ||
                        !car?.published ||
                        (car.reserved_for_booking &&
                          car.reserved_for_booking_guest_id !== userId)) &&
                        !isCarPreview && (
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
                            `Total Ksh.${totalCharge.toLocaleString()}`}
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
                    <hr />
                    {/* <TripDates
                      values={values}
                      setTripDates={setUserDates}
                      setValidDates={setValidDates}
                      userDates={userDates}
                      setTotalCharge={setTotalCharge}
                      // validDates={validDates}
                      car={car!}
                      // hasCustomAvailability={car?.custom_availability!}
                    /> */}
                    {/* {timeError && (
                      <div>
                        <small className="text-danger">
                          End time should be greater than start time!
                        </small>
                      </div>
                    )} */}

                    <div className="d-grid gap-2">
                      {token && role ? (
                        // <button
                        //   className="btn"
                        // >
                        <button
                          className="btn bgOrange"
                          onClick={handleRouteNext}
                          disabled={
                            !validDates ||
                            car?.booked ||
                            !car?.published ||
                            isCarPreview ||
                            (car.reserved_for_booking! &&
                              car.reserved_for_booking_guest_id !== userId)
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
              </div>
            </div>
            {/* </div> */}
            <div className="car-small-screen-bottom d-flex flex-column justify-content-center p-2">
              {(car?.booked ||
                !car?.published ||
                (car.reserved_for_booking &&
                  car.reserved_for_booking_guest_id !== userId)) &&
                !isCarPreview && (
                  <div
                    style={{ height: "10px", fontSize: "12px" }}
                    // className="mb-3"
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
                className={`d-flex justify-content-between align-items-center w-100 h-75`}
              >
                <div style={{ flex: "2" }}>
                  <div>
                    <div className="d-flex justify-content-between">
                      <h5 className="m-0">
                        Ksh.{car?.daily_rate!.toLocaleString()}/day
                      </h5>
                      <div>
                        {validDates && (
                          <>
                            {"Total "}
                            <small className="fw-bold">
                              Ksh.{totalCharge.toLocaleString()}
                            </small>
                          </>
                        )}
                      </div>
                    </div>
                    {car?.can_rent_hourly &&
                      !car?.booked &&
                      (car?.reserved_for_booking_guest_id === userId ||
                        car?.reserved_for_booking_guest_id === 0) && (
                        <div style={{ lineHeight: "12px" }}>
                          <small style={{ fontSize: "10px" }}>
                            You can rent this car for trips lasting less than
                            24hrs. By doing so you will be charged hourly. The
                            hourly rate for this car is{" "}
                            <b>Ksh.{car?.hourly_rate}/hr</b>
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
                  ref={pickDatesButtonRef}
                >
                  {/* <small className="mr-2">
                    {selectingDates ? "Close trip dates" : "Pick trip dates"}
                  </small> */}
                  <small className="mr-2">Pick trip dates</small>
                  <span>
                    {" "}
                    {/* {selectingDates ? ( */}
                    {/* <IoIosArrowDropdown size={"25px"} />
                    ) : ( */}
                    <IoIosArrowDropup size={"25px"} />
                    {/* )} */}
                  </span>
                </button>
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

              {/* </div> */}
              {/* {selectingDates && (
                <div
                  className="car-small-screen-select-dates p-2"
                  ref={pickDatesRef}
                >
                  <h5>Select Trip Dates</h5>
                  <TripDates
                    values={values}
                    setTripDates={setUserDates}
                    setValidDates={setValidDates}
                    userDates={userDates}
                    setTotalCharge={setTotalCharge}
                    car={car!}
                    // validDates={validDates}
                    // hasCustomAvailability={car?.custom_availability!}
                  />
                  {timeError && (
                    <div>
                      <small className="text-danger">
                        End time should be greater than start time!
                      </small>
                    </div>
                  )}
                </div>
              )} */}
            </div>
          </>
        )}
      </Layout>
    </>
  );
};
export default Car;
