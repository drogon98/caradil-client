import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { useOutsideClickHandler } from "../../components/hooks/useOutsideClickHandler";
import { useRole } from "../../components/hooks/useRole";
import { useUserId } from "../../components/hooks/useUserId";
import Layout from "../../components/layouts/Layout";
import { Loading } from "../../components/Loading";
import { ButtonLoading } from "../../components/Loading/ButtonLoading";
import { CarDetailsDescription } from "../../components/PublicCar/CarDetailsDescription";
// import { CarDetailsGuidelines } from "../../components/PublicCar/CarDetailsGuidelines";
import { CarDetailsHost } from "../../components/PublicCar/CarDetailsHost";
// import { CarDetailsFaqs } from "../../components/PublicCar/CarDetailsFaqs";
import { CarDetailsSecondaryFeatures } from "../../components/PublicCar/CarDetailsSecondaryFeatures";
// import { CarDetailsReviews } from "../../components/PublicCar/CarDetailsReviews";
import { CarDetailsTop } from "../../components/PublicCar/CarDetailsTop";
import { TripDates } from "../../components/PublicCar/TripDates";
import {
  Car,
  CustomAvailabilityDataInput,
  useCheckIfDriverIsApprovedToDriveLazyQuery,
  useGetCarQuery,
  useUpdateCarFavouriteMutation,
} from "../../graphql_types/generated/graphql";
import { useAppSelector } from "../../redux/hooks";
import SharedSections from "./SharedSections";

interface CarProps {}

/**
 * @author @CodeYourEmpire
 * @function @Car
 **/

const Car: FC<CarProps> = (props) => {
  const router = useRouter();
  const [car, setCar] = useState<Car | null>();
  const [skip, setSkip] = useState(true);
  const [mainLoading, setMainLoading] = useState<boolean>(true);
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const userId = useUserId(token);
  const [isFavourite, setIsFavourite] = useState<boolean>();
  const [values, setValues] = useState<CustomAvailabilityDataInput>({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });
  const [selectingDates, setSelectingDates] = useState<boolean | undefined>();
  const [validDates, setValidDates] = useState<boolean>(false);
  const pickDatesButtonRef = useRef<HTMLButtonElement>(null);
  const pickDatesRef = useRef<HTMLDivElement>(null);
  useOutsideClickHandler(pickDatesRef, setSelectingDates, pickDatesButtonRef);

  const [
    checkIfDriverIsApproved,
    { data: approvedData, loading: approvedLoading },
  ] = useCheckIfDriverIsApprovedToDriveLazyQuery({
    fetchPolicy: "network-only",
  });
  const [updateFavourite, { loading: updatingFavourite }] =
    useUpdateCarFavouriteMutation();

  const [totalCharge, setTotalCharge] = useState<number>(0);

  const carId = parseInt(router.query.id as string, 10);

  useEffect(() => {
    const redirect = async () => {
      if (approvedData?.checkIfDriverIsApprovedToDrive) {
        if (approvedData?.checkIfDriverIsApprovedToDrive.error) {
        } else if (approvedData?.checkIfDriverIsApprovedToDrive.approved) {
          await router.push({
            pathname: "/checkout/confirm-order",
            query: { carId, ...values, approved: true },
          });
        } else if (!approvedData?.checkIfDriverIsApprovedToDrive.approved) {
          await router.push({
            pathname: "/checkout/approve-driver",
            query: { carId, ...values, approved: false },
          });
        }
      }
    };
    redirect();
  }, [approvedData]);

  useEffect(() => {
    if (carId) {
      setSkip(false);
    }
  }, [carId]);

  const { data, loading } = useGetCarQuery({
    variables: { carId: parseInt(router.query.id as string, 10) },
    skip,
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (carId && data?.getCar) {
      let newData = { ...data.getCar };

      delete newData.__typename;

      setCar(newData.car);
      setTotalCharge(newData.car?.daily_rate!);
      const found = newData.car?.besties?.find((user) => user.id === userId);
      setIsFavourite(found ? true : false);
    }
  }, [data, carId]);

  useEffect(() => {
    if (
      values.startDate &&
      values.startTime &&
      values.endDate &&
      values.endTime
    ) {
      setValidDates(true);
    }
  }, [values]);

  useEffect(() => {
    if (validDates) {
      let startDate = new Date(values.startDate!);
      let endDate = new Date(values.endDate!);

      // To calculate the time difference of two dates
      let Difference_In_Time = endDate.getTime() - startDate.getTime();

      // To calculate the no. of days between two dates
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      // console.log("Difference_In_Days :>> ", Difference_In_Days);

      setTotalCharge(() => {
        let total = car?.daily_rate! * Difference_In_Days;
        return total;
      });
    }
  }, [validDates, values, car]);

  useEffect(() => {
    if (data && !loading) {
      setMainLoading(false);
    }
  }, [data, loading]);

  const handleRouteNext = async (e: SyntheticEvent<HTMLButtonElement>) => {
    // console.log("Helloo :>> ");
    e.preventDefault();
    checkIfDriverIsApproved();
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

  // console.log(`typeof router.query`, typeof router.query);
  // console.log("router.query :>> ", router.query);

  // console.log("car :>> ", car);

  return (
    <>
      <Head>
        <title>Car</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
                      disabled={updatingFavourite}
                      className="carousel-fav-icon cursor-pointer"
                    >
                      {isFavourite ? (
                        <BsSuitHeartFill className="carousel-heart-icon" />
                      ) : (
                        <BsSuitHeart className="carousel-heart-icon" />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={{
                        pathname: "/login",
                        query: {
                          next: router.pathname,
                          nextQuery: JSON.stringify(router.query),
                        },
                      }}
                    >
                      <a className="carousel-fav-icon cursor-pointer">
                        <BsSuitHeart size="28px" />
                      </a>
                    </Link>
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
                    />
                  </div>
                </div>
                {/* <div> */}
                <div>
                  <div className="carDetailsChargeCard px-2 py-3 shadow">
                    <div>
                      {!car?.available && (
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
                            <Link href="/">
                              <a>Check similar cars</a>
                            </Link>
                          </small>
                        </>
                      )}
                    </div>

                    <small>Ksh.{car?.daily_rate!.toLocaleString()}/day</small>
                    {validDates && (
                      <h6>Total Ksh.{totalCharge.toLocaleString()}</h6>
                    )}

                    <hr />
                    <h6>Select Trip Dates And Time</h6>
                    <TripDates values={values} setData={setValues} />

                    <div className="d-grid gap-2">
                      {token && role ? (
                        // <button
                        //   className="btn"
                        // >
                        <button
                          className="btn bgOrange"
                          onClick={handleRouteNext}
                          disabled={!validDates}
                        >
                          {approvedLoading ? (
                            <ButtonLoading
                              spinnerColor="white"
                              dimensions={{ height: "18px", width: "18px" }}
                            />
                          ) : (
                            "Continue"
                          )}
                        </button>
                      ) : (
                        // </button>
                        <Link
                          href={{
                            pathname: "/login",
                            query: {
                              next: router.pathname,
                              nextQuery: JSON.stringify(router.query),
                            },
                          }}
                        >
                          <button type="submit" className="btn bgOrange">
                            Continue
                          </button>
                        </Link>
                      )}
                    </div>

                    <SharedSections
                      isFavourite={isFavourite!}
                      handleUpdateFavourite={handleUpdateFavourite}
                      updatingFavourite={updatingFavourite}
                      car={car!}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
            <div className="car-small-screen-bottom d-flex flex-column justify-content-around p-2">
              {!car?.available && (
                <div
                  style={{ height: "10px", fontSize: "12px" }}
                  className="mb-3"
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
                    <Link href="/">
                      <a>Check similar cars</a>
                    </Link>
                  </small>
                </div>
              )}

              <div
                className={`d-flex justify-content-between align-items-center ${
                  car?.available && `h-100`
                }`}
              >
                <div>
                  <h5 className="m-0">
                    Ksh.{car?.daily_rate!.toLocaleString()}/day
                  </h5>
                </div>

                <button
                  onClick={handleSelectDates}
                  disabled={!car?.available}
                  className="btn m-0 p-0"
                  style={{ fontSize: "500" }}
                  ref={pickDatesButtonRef}
                >
                  <small className="mr-2">
                    {selectingDates ? "Close trip dates" : "Pick trip dates"}
                  </small>
                  <span>
                    {" "}
                    {selectingDates ? (
                      <IoIosArrowDropdown size={"25px"} />
                    ) : (
                      <IoIosArrowDropup size={"25px"} />
                    )}
                  </span>
                </button>
              </div>

              {/* </div> */}
              {selectingDates && (
                <div
                  className="car-small-screen-select-dates p-2"
                  ref={pickDatesRef}
                >
                  {/* <h5>Select Trip Dates</h5> */}
                  <TripDates values={values} setData={setValues} />
                  <div className="d-grid gap-2">
                    {token && role ? (
                      <button
                        className="btn bgOrange"
                        onClick={handleRouteNext}
                        disabled={!validDates}
                      >
                        {approvedLoading ? (
                          <ButtonLoading
                            spinnerColor="white"
                            dimensions={{ height: "18px", width: "18px" }}
                          />
                        ) : (
                          "Continue"
                        )}
                      </button>
                    ) : (
                      <Link
                        href={{
                          pathname: "/login",
                          query: {
                            next: router.pathname,
                            nextQuery: JSON.stringify(router.query),
                          },
                        }}
                      >
                        <button type="submit" className="btn bgOrange">
                          Continue
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </Layout>
    </>
  );
};
export default Car;
