import { useRouter } from "next/router";
import React, {
  ReactElement,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { BsArrowLeft } from "react-icons/bs";
import { AuthWrapper } from "../../../components/AuthWrapper";
import { CustomHead } from "../../../components/CustomHead";
import { useWindowDimensions } from "../../../components/hooks/useWindowDimensions";
import AccountLayout from "../../../components/layouts/AccountLayout";
import { Loading } from "../../../components/Loading";
import { ButtonLoading } from "../../../components/Loading/ButtonLoading";
import {
  Trip as Trip_,
  OnTripStatusDocument,
  useGetTripQuery,
  useUpdateCarFavouriteMutation,
} from "../../../graphql_types/generated/graphql";
import CancelTripMoal from "../bookings/CancelTripModal";

interface Props {}

export default function Trip(props: Props): ReactElement {
  const [mainLoading, setMainLoading] = useState(true);
  const [tripId, setTripId] = useState<number>();
  const router = useRouter();
  const [skip, setSkip] = useState(true);
  const [trip, setTrip] = useState<Trip_>();
  const [showCancelTripModal, setShowCancelTripModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const { data, loading, subscribeToMore } = useGetTripQuery({
    variables: { tripId: tripId! },
    skip,
    // fetchPolicy: "network-only",
  });
  // const [updateFavourite, { loading: updatingFavourite }] =
  // useUpdateCarFavouriteMutation();

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

  const handleCancelTrip = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setShowCancelTripModal(true);
  };

  const handleRescheduleTrip = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setShowRescheduleModal(true);
  };

  const handleAddToFavourite = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleChat = (e: SyntheticEvent<HTMLButtonElement>) => {
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
              {showCancelTripModal && (
                <CancelTripMoal
                  showModal={showCancelTripModal}
                  handleClose={() => setShowCancelTripModal(false)}
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
                          Chat With Guest
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button className="btn bg-warning d-flex text-light align-items-center">
                          <span>Host Confirming</span>{" "}
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
                <div>
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
                    {/* <div className="d-flex w-100 justify-content-between mb-2">
                      <p>Seats</p>
                      <span>{trip?.car?.seats}</span>
                    </div>
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <p>Doors</p>
                      <span>{trip?.car?.doors}</span>
                    </div> */}
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <p>Daily Rate</p>
                      <span>ksh.{trip?.car?.daily_rate?.toLocaleString()}</span>
                    </div>
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <p>With driver</p>
                      <span>Yes</span>
                    </div>
                  </div>
                </div>

                <div className="my-4">
                  <h6 className="fw-bolder">Trip Dates</h6>
                  <div>
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <p>Start Date</p>
                      <span>
                        {new Date(trip?.start_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <p>Start Time</p>
                      <span>{trip?.start_time}hrs</span>
                    </div>
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <p>End Date</p>
                      <span>
                        {new Date(trip?.end_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <p>End Time</p>
                      <span>{trip?.end_time}hrs</span>
                    </div>
                  </div>
                </div>

                <div className="my-4">
                  <h6 className="fw-bolder">Trip Status</h6>
                  <div>
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <p>Status</p>
                      <span>{trip?.status}</span>
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

                <div className="d-grid gap-2 mb-2">
                  <button
                    className="btn bg-danger"
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

                {trip?.status === "confirmed" && (
                  <div className="d-grid gap-2 mb-2">
                    <button
                      className="btn bgOrange"
                      onClick={handleRescheduleTrip}
                    >
                      Reschedule Trip
                    </button>
                  </div>
                )}

                {/* Only show when trip is successful */}
                {trip?.status === "successful" && (
                  <div className="d-grid gap-2 mb-2">
                    <button className="btn bgOrange" onClick={handleCancelTrip}>
                      Review Car
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
}
