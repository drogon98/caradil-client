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
import {
  Trip,
  useGetTripQuery,
} from "../../../graphql_types/generated/graphql";
import CancelTripMoal from "./CancelTripModal";
import ConfirmTripModal from "./ConfirmTripModal";

interface Props {}

export default function Booking(props: Props): ReactElement {
  const [mainLoading, setMainLoading] = useState(true);
  const router = useRouter();
  const [skip, setSkip] = useState(true);
  const [tripId, setTripId] = useState<number>();
  const [trip, setTrip] = useState<Trip>();

  const [showCancelTripModal, setShowCancelTripModal] = useState(false);
  const [showConfirmTripModal, setShowConfirmTripModal] = useState(false);

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

  const { data, loading } = useGetTripQuery({
    variables: { tripId: tripId! },
    fetchPolicy: "network-only",
    skip,
  });

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

  const handleCancelTrip = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setShowCancelTripModal(true);
  };

  const handleConfirmTrip = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setShowConfirmTripModal(true);
  };
  const handleChat = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (width <= 800) {
        router.push({
          pathname: "/account/chats/md",
          query: { meta_id: trip?.chat_meta_id, rc_id: trip?.owner_id },
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

  return (
    <>
      <CustomHead title="Account - Bookings" />
      <AuthWrapper>
        <AccountLayout>
          {mainLoading ? (
            <Loading />
          ) : (
            <div className="p-2">
              {showCancelTripModal && (
                <CancelTripMoal
                  showModal={showCancelTripModal}
                  handleClose={() => setShowCancelTripModal(false)}
                  setTrip={setTrip}
                  tripId={tripId}
                />
              )}

              {showConfirmTripModal && (
                <ConfirmTripModal
                  showModal={showConfirmTripModal}
                  handleClose={() => setShowConfirmTripModal(false)}
                  setTrip={setTrip}
                  tripId={tripId}
                />
              )}
              <div className="mt-4">
                {/* <h3>Helloo</h3> */}
                <button
                  className="btn m-0 p-0"
                  onClick={() => {
                    router.replace("/account/bookings");
                  }}
                >
                  <BsArrowLeft size={"30px"} />
                </button>
              </div>

              <div>
                <h3>Book Information</h3>
                {/* toDateString() */}
                <p>{`${trip?.owner?.first_name} ${
                  trip?.owner?.last_name
                } has paid Ksh.${parseFloat(
                  trip?.transaction.amount!
                ).toLocaleString()} for a trip beginning on ${new Date(
                  trip?.start_date
                ).toDateString()} at ${
                  trip?.start_time
                }hrs and end on ${new Date(trip?.end_date).toDateString()} at ${
                  trip?.end_time
                }hrs.`}</p>
                {(trip?.status === "confirmed" ||
                  trip?.status === "pending") && (
                  <>
                    <br />
                    {}
                    <p>Please confirm this trip.</p>
                    <div>
                      <button
                        className="btn bgOrange"
                        onClick={handleConfirmTrip}
                        disabled={trip?.status === "confirmed"}
                      >
                        {trip?.status === "confirmed"
                          ? "Trip Confirmed"
                          : "Confirm Trip"}
                      </button>
                    </div>
                  </>
                )}
                {trip?.status === "confirmed" && (
                  <div className="my-3">
                    <button className="btn bg-success" onClick={handleChat}>
                      Chat With Guest
                    </button>
                  </div>
                )}

                <div>
                  <button
                    className="btn bg-danger"
                    onClick={handleCancelTrip}
                    disabled={trip?.status === "cancelled"}
                  >
                    Cancel Trip
                  </button>
                </div>
              </div>
            </div>
          )}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
}
