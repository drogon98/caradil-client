import Head from "next/head";
import React, {
  ReactElement,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { AuthWrapper } from "../../../components/AuthWrapper";
import AccountLayout from "../../../components/layouts/AccountLayout";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/router";
import {
  Trip as Trip_,
  useGetTripQuery,
} from "../../../graphql_types/generated/graphql";
import { Loading } from "../../../components/Loading";
import CancelTripMoal from "../bookings/CancelTripModal";
import { useWindowDimensions } from "../../../components/hooks/useWindowDimensions";
import { CustomHead } from "../../../components/CustomHead";

interface Props {}

export default function Trip(props: Props): ReactElement {
  const [mainLoading, setMainLoading] = useState(true);
  const [tripId, setTripId] = useState<number>();
  const router = useRouter();
  const [skip, setSkip] = useState(true);
  const [trip, setTrip] = useState<Trip_>();
  const [showCancelTripModal, setShowCancelTripModal] = useState(false);

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

  const { data, loading } = useGetTripQuery({
    variables: { tripId: tripId! },
    fetchPolicy: "network-only",
    skip,
  });

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

  console.log("trip :>> ", trip);

  return (
    <>
      <CustomHead title="Account - Trips" />
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
              <div className="mt-4">
                <button
                  className="btn m-0 p-0"
                  onClick={() => {
                    router.replace("/account/trips");
                  }}
                >
                  <BsArrowLeft size={"30px"} />
                </button>
              </div>
              <div>
                <h3>Trip Information</h3>
                <p></p>
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
                    {trip?.status === "cancelled"
                      ? "Trip Cancelled"
                      : "Cancel Trip"}
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
