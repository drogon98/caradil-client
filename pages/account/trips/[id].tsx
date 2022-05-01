import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, MouseEvent, useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import CancelTripMoal from "../../../components/Account/Trips/CancelTripModal";
import ReviewTripModal from "../../../components/Account/Trips/ReviewTripModal";
import { AuthWrapper } from "../../../components/AuthWrapper";
import { CustomHead } from "../../../components/CustomHead";
import { useWindowDimensions } from "../../../components/hooks/useWindowDimensions";
import AccountLayout from "../../../components/layouts/AccountLayout";
import { Loading } from "../../../components/Loading";
import { ButtonLoading } from "../../../components/Loading/ButtonLoading";
import { ToastWrapper } from "../../../components/Toast/ToastWrapper";
import {
  Trip as Trip_,
  OnTripStatusDocument,
  useGetTripQuery,
  useUpdateCarFavouriteMutation,
} from "../../../graphql_types/generated/graphql";

interface Props {}

export default function Trip(props: Props): ReactElement {
  const [mainLoading, setMainLoading] = useState(true);
  const [tripId, setTripId] = useState<number>();
  const router = useRouter();
  const [skip, setSkip] = useState(true);
  const [trip, setTrip] = useState<Trip_>();
  const [showCancelTripModal, setShowCancelTripModal] = useState(false);

  const { data, loading, subscribeToMore } = useGetTripQuery({
    variables: { tripId: tripId! },
    skip,
    fetchPolicy: "network-only",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setShowToastMessage] = useState("");
  const [toastDelay, setToastDelay] = useState(3000);
  // const [updateFavourite, { loading: updatingFavourite }] =
  // useUpdateCarFavouriteMutation();
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    if (router.query) {
      try {
        const tripID = parseInt(router.query.id as string, 10);
        if (isNaN(tripID)) {
          throw new Error("Invalid trip id");
        }

        setTripId(tripID);
      } catch (error) {}
    }
  }, [router.query]);

  useEffect(() => {
    if (tripId) {
      setSkip(false);
    }
  }, [tripId]);

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (data?.getTrip.trip?.id) {
      setTrip(data.getTrip.trip);
    }
  }, [data]);

  useEffect(() => {
    if (!loading && trip?.id) {
      setMainLoading(false);
    }
  }, [trip, loading]);

  useEffect(() => {
    let tripStatusSub: { (): void; (): void };
    if (subscribeToMore && !skip) {
      tripStatusSub = subscribeToMore({
        document: OnTripStatusDocument,
        // variables: { chatMetaId: props.chatMetaId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const trip: any = { ...subscriptionData.data };
          console.log("prev.getTrip", prev.getTrip);
          console.log("trip :>> ", trip);
          console.log("prev :>> ", prev);
          let tempPayload = {
            ...prev.getTrip.trip,
            status: trip.tripStatus.status,
            chat_meta_id: trip.tripStatus.chat_meta_id,
            trip_canceller: trip.tripStatus.trip_canceller,
            why_cancel_trip: trip.tripStatus.why_cancel_trip,
          };
          return {
            getTrip: {
              trip: { ...prev.getTrip.trip!, ...tempPayload },
              error: prev.getTrip.error,
            },
          };
        },
      });
    }
    return () => {
      if (tripStatusSub) {
        tripStatusSub();
      }
    };
  }, [subscribeToMore, skip]);

  const handleCancelTrip = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setShowCancelTripModal(true);
  };

  const handleAddToFavourite = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleChat = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (width <= 800) {
        router.push({
          pathname: "/account/chats/md",
          query: { meta_id: trip?.chat_meta_id, rc_id: trip?.car_owner_id },
        });
      } else {
        router.push({
          pathname: "/account/chats",
          query: { meta_id: trip?.chat_meta_id },
        });
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleAddReview = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setShowReviewModal(true);
  };

  // console.log("trip :>> ", trip);

  return (
    <>
      <CustomHead title="Account - Trips" />
      <AuthWrapper>
        <AccountLayout>
          {mainLoading ? (
            <Loading />
          ) : (
            <div className="p-2 col-md-8 col-lg-6 mx-auto">
              {showToast && (
                <ToastWrapper
                  setShow={setShowToast}
                  show={showToast}
                  message={toastMessage}
                  position="bottom-end"
                  delay={toastDelay}
                  bg="success"
                />
              )}
              {showCancelTripModal && (
                <CancelTripMoal
                  showModal={showCancelTripModal}
                  handleClose={() => setShowCancelTripModal(false)}
                  // setTrip={setTrip}
                  tripId={tripId}
                  trip={trip!}
                  setShowToast={setShowToast}
                  setShowToastMessage={setShowToastMessage}
                  setToastDelay={setToastDelay}
                />
              )}

              {showReviewModal && (
                <ReviewTripModal
                  showModal={showReviewModal}
                  handleClose={() => setShowReviewModal(false)}
                  // setTrip={setTrip}
                  tripId={tripId}
                  trip={trip!}
                />
              )}
              <div className="mt-4 d-flex align-items-center w-100 mb-4">
                <button
                  className="btn m-0 p-0"
                  onClick={() => {
                    router.replace("/account/trips");
                  }}
                >
                  <BsArrowLeft size={"30px"} />
                </button>
                <div className="d-flex w-100 justify-content-between">
                  <h3 className="m-0">Trip</h3>
                  <div>
                    {trip?.status === "confirmed" ? (
                      <div>
                        <button className="btn bg-success" onClick={handleChat}>
                          Chat With Host
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button className="btn bg-warning d-flex text-light align-items-center">
                          <span>Host Confirming</span> &nbsp;&nbsp;
                          <span>
                            {" "}
                            <ButtonLoading
                              spinnerColor="white"
                              dimensions={{ height: "18px", width: "18px" }}
                            />
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="my-4">
                  {/* <h6 className="fw-bolder">Trip Status</h6> */}
                  <div>
                    <div className="mb-2">
                      {trip?.status === "pending" && (
                        <p>
                          This trip is{" "}
                          <span className="colorOrange fw-bold">waiting</span>{" "}
                          confirmation from host.
                        </p>
                      )}
                      {trip?.status === "confirmed" && (
                        <p>
                          This trip is{" "}
                          <span className="text-primary fw-bold">
                            in progress
                          </span>{" "}
                          .
                        </p>
                      )}
                      {trip?.status === "successful" && (
                        <p>
                          This trip is{" "}
                          <span className="text-success fw-bold">
                            successful
                          </span>
                          .{" "}
                        </p>
                      )}
                      {trip?.status === "cancelled" && (
                        <p>
                          This trip is{" "}
                          <span className="text-danger fw-bold">cancelled</span>
                          .{" "}
                        </p>
                      )}
                    </div>
                  </div>
                  {trip?.status === "cancelled" && (
                    <div>
                      <label>
                        Why {trip?.trip_canceller === "HOST" ? "host" : "you"}{" "}
                        cancelled trip?
                      </label>
                      <textarea
                        value={trip?.why_cancel_trip!}
                        style={{ resize: "none" }}
                        readOnly
                        className="form-control"
                      />
                    </div>
                  )}
                </div>

                {/* <div>
                  <h6 className="fw-bolder">Car Details</h6>
                  <div>
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <p>Name</p>
                      <span>{trip?.car?.name}</span>
                    </div>
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <p>Registration No.</p>
                      <span>{trip?.car?.reg_no}</span>
                    </div>
                    
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <p>Daily Rate</p>
                      <span>ksh.{trip?.car?.daily_rate?.toLocaleString()}</span>
                    </div>
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <p>With driver</p>
                      <span>Yes</span>
                    </div>
                  </div>
                </div> */}

                <div className="my-4">
                  {/* <h6 className="fw-bolder">Trip Dates</h6> */}
                  <p>
                    This trip is scheduled to start on{" "}
                    <b>{new Date(trip?.start_date!).toLocaleDateString()}</b> at{" "}
                    <b>{trip?.start_time}hrs</b> and end on{" "}
                    <b>{new Date(trip?.end_date!).toLocaleDateString()}</b> at{" "}
                    <b>{trip?.end_time}hrs</b>.
                  </p>{" "}
                  {/* If a book is impossible with current host transfer it to another host without any charges */}
                  {trip?.status === "confirmed" && (
                    <>
                      <p className="pt-3">You need to reschedule the trip?</p>
                      <div className="mt-2">
                        <Link href={`/account/trips/${tripId}/reschedule`}>
                          <a className="btn bgOrange">Reschedule Trip</a>
                        </Link>
                      </div>
                    </>
                  )}
                </div>

                {/* Show when trip status is not pending or cancelled */}
                <div>
                  <h6>Important things to note</h6>
                  <ul className="my-2">
                    <li>
                      <small>
                        This car has limited distance coverage. Exceeding the
                        set distance will attract a fee.
                      </small>
                    </li>
                    <li>
                      <small>
                        This host demands to put the driver in a 30 minutes gear
                        shift test. Get ready for the test.
                      </small>
                    </li>
                    <li>
                      <small>
                        Carry with you a valid driving license and national
                        id/passport. This documents should belong to the one who
                        booked the car.
                      </small>
                    </li>
                    <li>
                      <small>
                        If you have a driver other than you, he should also show
                        up with his valid driving license and national
                        id/passport.
                      </small>
                    </li>
                    <li>
                      <small>
                        Take many photos as possible of the car outer and inner
                        views before the host hands you the key. In case you
                        spot a defect,let the host know to avoid extra charges
                        when you return the car.
                      </small>
                    </li>
                    <li>
                      <small>
                        Check fuel reading to see if it meets the car fueling
                        policy
                      </small>
                    </li>
                    <li>
                      <small>
                        Record the car odometer reading with host, to help you
                        calculate if you travelled extra distance when you
                        return the car.
                      </small>
                    </li>
                    <li>
                      <small>Check if the car has enough spare parts.</small>
                    </li>
                  </ul>
                </div>

                <div className="d-grid gap-2 mb-2">
                  <button
                    className="btn bg-dark"
                    onClick={handleCancelTrip}
                    disabled={trip?.status === "cancelled"}
                  >
                    {trip?.status === "cancelled"
                      ? "Trip Cancelled"
                      : "Cancel Trip"}
                  </button>
                </div>

                {false && (
                  <div className="d-grid gap-2 mb-2">
                    <button
                      className="btn bg-gray"
                      onClick={handleAddToFavourite}
                    >
                      Add to favourites
                    </button>
                  </div>
                )}

                {/* Only show when trip is successful */}
                {/* {trip?.status === "successful" && ( */}
                <div className="d-grid gap-2 mb-2">
                  <button className="btn bgOrange" onClick={handleAddReview}>
                    Review Car
                  </button>
                </div>
                {/* )} */}
              </div>
            </div>
          )}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
}
