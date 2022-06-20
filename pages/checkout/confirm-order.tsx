import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { AuthWrapper } from "../../components/AuthWrapper";
import ReserveSessionExpiredModal from "../../components/Checkout/ReserveSessionExpiredModal";
import Summary from "../../components/Checkout/Summary";
import { CustomHead } from "../../components/CustomHead";
// import { useUserId } from "../../components/hooks/useUserId";
import Layout from "../../components/layouts/Layout";
// import { Loading } from "../../components/Loading";
import { ButtonLoading } from "../../components/Loading/ButtonLoading";
import { PlacesAutocomplete } from "../../components/Location/AutoComplete";
import {
  OnCarUpdateDocument,
  useCheckReservedGuestIdMutation,
  useEditCarReservedForBookingMutation,
  // useCheckIfDriverIsApprovedToDriveQuery,
  useGetAuthUserQuery,
  useGetCarQuery,
} from "../../graphql_types/generated/graphql";
import { useAppSelector } from "../../redux/hooks";
import { baseHttpDomain } from "../../utils/baseDomain";
import { TripDatesObj } from "../../utils/interfaces";
import {
  getTripDuration,
  totalChargeCalculator,
} from "../../utils/trip_duration_ttl_calc";

interface ConfirmOrderProps {}

interface PayData {
  tel: string;
  eml: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  ttl: string;
}

const ConfirmOrder: FC<ConfirmOrderProps> = (props) => {
  const router = useRouter();
  const [mainLoading, setMainLoading] = useState(false);
  const [skip, setSkip] = useState(true);
  const [error, setError] = useState("");
  const [readRefundTerms, setReadRefundTerms] = useState(false);
  // Make a request to check if driver is approved
  // const { data: approvedData, loading: approvedLoading } =
  //   useCheckIfDriverIsApprovedToDriveQuery({
  //     fetchPolicy: "network-only",
  //   });

  const { data: userData, loading: userLoading } = useGetAuthUserQuery({
    fetchPolicy: "no-cache",
  });
  const token = useAppSelector((state) => state.auth._id);
  // const userId = useUserId(token);
  const [ttl, setTtl] = useState<number>();
  // const [driverTtl, setDriverTtl] = useState(0);
  const [deliverTtl, setDeliverTtl] = useState(0);
  // const [totalCharge, setTotalCharge] = useState<string>("");
  const [values, setValues] = useState<PayData>({
    p1: "",
    p2: "",
    p3: "",
    p4: "",
    eml: "",
    tel: "",
    ttl: "",
  });

  const [dummyData, setDummyData] = useState({ firstName: "", lastName: "" });
  const [includeDriver, setIncludeDriver] = useState(false);
  const [deliverToMe, setDeliverToMe] = useState(false);
  const [discountEligible, setDiscountEligible] = useState<boolean>(false);
  const [tripDuration, setTripDuration] = useState<number>();
  const [durationType, setDurationType] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState<number>();
  const [calculatingDistance, setCalculatingDistance] = useState(false);
  const [checkReservedGuestId, { loading: reservedGuestIdLoading }] =
    useCheckReservedGuestIdMutation();
  const [editReservedForBooking, { loading: editingReservedForBooking }] =
    useEditCarReservedForBookingMutation();
  const [showReserveSessionExpiredModal, setShowReserveSessionExpiredModal] =
    useState(false);

  useEffect(() => {
    if (userData?.getUser.user) {
      setDummyData({
        firstName: userData.getUser.user.first_name ?? "",
        lastName: userData.getUser.user.last_name ?? "",
      });
      setValues({
        ...values,
        eml: userData.getUser.user.email ?? "",
        tel: userData.getUser.user.phone ?? "",
      });
    }
  }, [userData]);

  // console.log("dummyData :>> ", dummyData);

  useEffect(() => {
    if (router.query.carId) {
      setSkip(false);
      setValues({
        ...values,
        p1: router.query.start_date as string,
        p2: router.query.start_time as string,
        p3: router.query.end_date as string,
        p4: `${router.query.end_time as string} ${router.query.carId}`,
      });
    }
  }, [router.query]);

  const { data, loading, subscribeToMore } = useGetCarQuery({
    variables: {
      carId: parseInt(router.query.carId as string, 10),
      carName: "",
    },
    skip,
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    let carSub: { (): void; (): void };
    if (subscribeToMore && !skip) {
      carSub = subscribeToMore({
        document: OnCarUpdateDocument,
        updateQuery: (prev, { subscriptionData }: any) => {
          if (!subscriptionData.data) return prev;
          const updatedCar: any = { ...subscriptionData.data };
          return {
            getCar: { car: { ...prev.getCar?.car, ...updatedCar } },
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

  // console.log("data :>> ", data);

  useEffect(() => {
    try {
      if (data?.getCar.car && router.query.start_date) {
        let start_date = parseInt(router.query.start_date! as string);
        let end_date = parseInt(router.query.end_date! as string);
        let start_time = router.query.start_time! as string;
        let end_time = router.query.end_time! as string;

        // To calculate the time difference of two dates
        // let Difference_In_Time = end_date.getTime() - startDate.getTime();

        // // To calculate the no. of days between two dates
        // let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        let payload: TripDatesObj = {
          start_date,
          start_time,
          end_date,
          end_time,
        };

        let durationData = getTripDuration(
          payload,
          data.getCar.car?.can_rent_hourly!
        );

        totalChargeCalculator(data.getCar.car, payload, setTtl);

        setTripDuration(durationData.duration);
        setDurationType(durationData.type_);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  }, [router.query, data]);

  // console.log("tripDuration", tripDuration);

  // useEffect(() => {
  //   if (data && tripDuration && durationType) {
  //     if (durationType === "hour") {
  //       let total = data?.getCar.car?.hourly_rate! * tripDuration;
  //       setTtl(total);
  //     } else {
  //       let total = data?.getCar.car?.daily_rate! * tripDuration;
  //       setTtl(total);
  //     }
  //   }
  // }, [tripDuration, data, durationType]);

  // useEffect(() => {}, [totalCharge, tripDays, data]);

  // useEffect(() => {
  //   if (data && tripDays) {
  //     if (includeDriver) {
  //       let driverTtl = data.getCar.car?.driver_daily_rate! * tripDays;
  //       setDriverTtl(driverTtl);
  //     } else {
  //       setDriverTtl(0);
  //     }
  //   }
  // }, [includeDriver, tripDays, data]);

  useEffect(() => {
    if (distance) {
      setValues({ ...values!, p2: values.p2 + " " + distance.toString() });
    }
  }, [distance]);

  useEffect(() => {
    if (data) {
      if (deliverToMe && distance) {
        let deliverTtl = data.getCar.car?.delivery_rate! * distance; // 2== KM
        // let deliverTtl = data.getCar.car?.delivery_rate!;
        setDeliverTtl(deliverTtl);
      } else {
        setDeliverTtl(0);
      }
    }
  }, [deliverToMe, distance, data]);

  useEffect(() => {
    if (data?.getCar.car?.id) {
      if (data.getCar.car.discount) {
        // if (data.getCar.car.discount_days) {
        // if (data.getCar.car.discount_days > 0) {
        setDiscountEligible(true);
        // }
        // }
      }
    }
  }, [data]);

  // useEffect(() => {
  //   const redirect = async () => {
  //     if (approvedData?.checkIfDriverIsApprovedToDrive) {
  //       if (!approvedData?.checkIfDriverIsApprovedToDrive.approved) {
  //         // Consider redirecting to an unknown page
  //         await router.push({
  //           pathname: "/checkout/approve-driver",
  //           query: { approved: false },
  //         });
  //       }
  //     }
  //   };
  //   redirect();
  // }, [approvedData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setPhone(e.target.value);
    if (e.target.name === "checkout-include-driver") {
      setIncludeDriver(e.target.value === "true" ? true : false);
    } else if (e.target.name === "checkout-delivery") {
      setDeliverToMe(e.target.value === "true" ? true : false);
    } else if (e.target.name === "firstName" || e.target.name === "lastName") {
      setDummyData({ ...dummyData, [e.target.name]: e.target.value });
    } else if (e.target.name === "refund_cancellation_terms") {
      setReadRefundTerms(e.target.value === "true" ? true : false);
    } else {
      setValues({ ...values, [e.target.name]: e.target.value.trim() });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setMainLoading(true);
      // Check if reserved guest is current users id
      let reservedIdResponse = await checkReservedGuestId({
        variables: { carId: data?.getCar.car?.id! },
      });
      if (reservedIdResponse.data?.checkReservedGuestId) {
        let response = await fetch(`${baseHttpDomain}ipay-reserve-car`, {
          method: "POST",
          // withCredentials: true,
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            ttl: getTotal(),
          }),
        });
        if (response) {
          const data = await response.json();
          if (window) {
            if (distance) {
              localStorage.setItem("delivery_location", location);
            }
            window.location.href = data.url;
          }
        }
      } else {
        // Guest reservation session is ended
        // If car is not yet reserved by another user,reserve it for this user again
        if (data?.getCar.car?.reserved_for_booking_guest_id === 0) {
          let reserveBookingResponse = await editReservedForBooking({
            variables: { carId: data?.getCar.car?.id! },
          });

          if (reserveBookingResponse.data?.editCarReservedForBooking) {
            let response = await fetch(`${baseHttpDomain}ipay-pay`, {
              method: "POST",
              // withCredentials: true,
              credentials: "include",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...values,
                ttl: getTotal(),
              }),
            });
            if (response) {
              const data = await response.json();
              if (window) {
                if (distance) {
                  localStorage.setItem("delivery_location", location);
                }
                window.location.href = data.url;
              }
            }
          } else {
            // Guest reservation session is ended and another user reserved the car
            // In this case show an apology modal
            setShowReserveSessionExpiredModal(true);
            setMainLoading(false);
          }
        } else {
          // Guest reservation session is ended and another user reserved the car
          // In this case show an apology modal
          setShowReserveSessionExpiredModal(true);
          setMainLoading(false);
        }
      }

      // setMainLoading(false);
    } catch (error) {
      return;
    }
  };

  const getTotal = () => {
    try {
      let tempTtl = ttl! + deliverTtl;
      // + driverTtl;
      if (discountEligible && tripDuration && durationType === "day") {
        if (data?.getCar.car?.discount_days) {
          if (tripDuration >= data?.getCar.car?.discount_days) {
            return Math.round(
              (tempTtl * (100 - parseFloat(data.getCar.car?.discount!))) / 100
            );
          }
          return Math.round(tempTtl);
        }
        return (
          Math.round(
            tempTtl * (100 - parseFloat(data?.getCar.car?.discount!))
          ) / 100
        );
      } else {
        return Math.round(tempTtl);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  // const handleLocationChange = (data: any) => {
  //   setLocation(data.formatted_address);
  // };

  const handleFindDistance = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!location) {
      return;
    }

    try {
      setCalculatingDistance(true);
      let payload = {
        destination: location,
        origin: data?.getCar.car?.location!,
      };

      let response = await fetch(`${baseHttpDomain}distance`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload }),
      });

      let jsonRes: { distance: string } = await response.json();

      let units = jsonRes.distance.split(" ")[1];

      let distance = parseInt(jsonRes.distance.split(" ")[0]);

      if (isNaN(distance)) {
        throw new Error("Invalid distance");
      }

      if (units === "m") {
        distance = 1;
      }

      setDistance(distance);
      setCalculatingDistance(false);
    } catch (error) {
      setCalculatingDistance(false);
      console.log("error :>> ", error);
    }
  };

  // console.log("distance :>> ", distance);

  // console.log("tripDuration", tripDuration);

  //

  https: return (
    <>
      <CustomHead title="Confirm Order" />
      <AuthWrapper>
        <Layout>
          {/* {approvedLoading ? (
            <Loading />
          ) : ( */}
          {showReserveSessionExpiredModal && (
            <ReserveSessionExpiredModal
              showModal={showReserveSessionExpiredModal}
              handleClose={() => setShowReserveSessionExpiredModal(false)}
              car={data?.getCar.car!}
            />
          )}
          <div className="customCarDetailsContainer my-4 mb-5">
            {/* <div className="container"> */}
            <form onSubmit={handleSubmit}>
              <div className="row m-0 ">
                <div className="col-md-7 col-lg-8 mt-4">
                  <h3>Billing Details</h3>
                  <div className="mb-3">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      className="form-control"
                      required
                      id="firstName"
                      value={dummyData.firstName}
                      placeholder="John"
                      onChange={handleChange}
                      name="firstName"
                      type="text"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      className="form-control"
                      required
                      id="lastName"
                      value={dummyData.lastName}
                      placeholder="Doe"
                      onChange={handleChange}
                      name="lastName"
                      type="text"
                    />
                  </div>
                  {/* </div> */}

                  <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                      className="form-control"
                      required
                      id="email"
                      value={values.eml}
                      onChange={handleChange}
                      name="eml"
                      type="text"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone">Phone</label>
                    <input
                      className="form-control"
                      required
                      id="phone"
                      value={values.tel}
                      placeholder="eg.254799204524"
                      onChange={handleChange}
                      name="tel"
                      type="text"
                    />
                  </div>
                  {/* <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={includeDriver ? "false" : "true"}
                      id="checkout-include-driver"
                      onChange={handleChange}
                      name="checkout-include-driver"
                      checked={includeDriver}
                      disabled={!data?.getCar.car?.has_driver}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="checkout-include-driver"
                    >
                      Include Driver{" "}
                      <small>
                        {!data?.getCar.car?.has_driver && (
                          <>(This host does not provide driver).</>
                        )}
                      </small>
                    </label>
                  </div> */}
                  {/* {!deliverToMe && ( */}
                  <p className="my-2">
                    <small>
                      This {data?.getCar.car?.name} is to be picked at{" "}
                      <b>{data?.getCar.car?.pick_up_location}</b>
                    </small>
                  </p>
                  {/* )} */}

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={deliverToMe ? "false" : "true"}
                      id="checkout-delivery"
                      onChange={handleChange}
                      name="checkout-delivery"
                      checked={deliverToMe}
                      disabled={!data?.getCar.car?.delivery}
                    />
                    {data?.getCar.car?.delivery ? (
                      <label
                        className="form-check-label"
                        htmlFor="checkout-delivery"
                      >
                        Deliver car to me instead
                      </label>
                    ) : (
                      <label
                        className="form-check-label"
                        htmlFor="checkout-delivery"
                      >
                        Deliver car to me{" "}
                        <small>
                          {!data?.getCar.car?.delivery && (
                            <>(This host does not deliver car).</>
                          )}
                        </small>
                      </label>
                    )}
                  </div>

                  {deliverToMe && (
                    <>
                      <div className="mb-4">
                        <label>Select delivery point</label>

                        <PlacesAutocomplete
                          setLocation={setLocation}
                          location={location!}
                          // setLocationCords={setPickUpLocationCords}
                          geocodeEstablishments={true}
                        />
                        <button
                          className="btn bgOrange mt-2"
                          style={{ minWidth: "150px" }}
                          onClick={handleFindDistance}
                          disabled={calculatingDistance}
                        >
                          {calculatingDistance ? (
                            <ButtonLoading
                              spinnerColor="white"
                              dimensions={{ height: "24px", width: "24px" }}
                            />
                          ) : (
                            "Calculate Distance"
                          )}
                        </button>
                        {distance && (
                          <div className="my-2">
                            <p className="text-success">
                              <small>
                                The distance from car location{" "}
                                <b>{data?.getCar.car?.location}</b> to your
                                delivery location <b>{location}</b> is{" "}
                                <b>{distance} kilometre(s)</b>.
                              </small>
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <div className="d-none d-md-block">
                    <div className="form-check mt-5 mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={readRefundTerms ? "false" : "true"}
                        id="refund_cancellation_terms"
                        onChange={handleChange}
                        name="refund_cancellation_terms"
                        checked={readRefundTerms}
                        // disabled={!data?.getCar.car?.delivery}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="refund_cancellation_terms"
                      >
                        Yes,I have read and agreed to caradil{" "}
                        <Link href="/policies/cancellation-and-refund">
                          <a target={"_blank"} className="text-primary">
                            refund and cancellation policy
                          </a>
                        </Link>
                      </label>
                    </div>
                    <div className="d-grid gap-2">
                      <button
                        type="submit"
                        className="btn bgOrange fw-bolder"
                        disabled={mainLoading || !readRefundTerms}
                      >
                        {mainLoading ? (
                          <ButtonLoading
                            spinnerColor="white"
                            dimensions={{ height: "24px", width: "24px" }}
                          />
                        ) : (
                          `Pay Ksh.${getTotal()!.toLocaleString()}`
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 col-lg-4 mt-md-4">
                  <Summary
                    includeDriver={includeDriver}
                    deliverToMe={deliverToMe}
                    distance={distance!}
                    discountEligible={discountEligible}
                    discountDays={data?.getCar.car?.discount_days!}
                    discount={data?.getCar.car?.discount!}
                    totalCharge={getTotal()!}
                    tripDuration={tripDuration!}
                    durationType={durationType!}
                    dailyRate={data?.getCar.car?.daily_rate!}
                    hourlyRate={data?.getCar.car?.hourly_rate!}
                    car={data?.getCar.car!}
                  />
                </div>
                <div className="sm-screen-checkout-btn d-md-none">
                  <div className="form-check mt-4 mt-md-3 mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={readRefundTerms ? "false" : "true"}
                      id="refund_cancellation_terms"
                      onChange={handleChange}
                      name="refund_cancellation_terms"
                      checked={readRefundTerms}
                      // disabled={!data?.getCar.car?.delivery}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="refund_cancellation_terms"
                    >
                      Yes,I have read and agreed to caradil{" "}
                      <Link href="/policies/cancellation-and-refund">
                        <a target={"_blank"} className="text-primary">
                          refund and cancellation policy
                        </a>
                      </Link>
                    </label>
                  </div>
                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn bgOrange fw-bolder"
                      disabled={mainLoading || !readRefundTerms}
                    >
                      {mainLoading ? (
                        <ButtonLoading
                          spinnerColor="white"
                          dimensions={{ height: "24px", width: "24px" }}
                        />
                      ) : (
                        `Pay Ksh.${getTotal()!.toLocaleString()}`
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* )} */}
        </Layout>
      </AuthWrapper>
    </>
  );
};

export default ConfirmOrder;
