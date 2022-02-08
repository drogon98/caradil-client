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
  useGetBookingQuery,
  useGetTripQuery,
} from "../../../graphql_types/generated/graphql";
import CancelTripMoal from "./CancelTripModal";
import ConfirmTripModal from "./ConfirmTripModal";

interface Props {}

export default function Booking(props: Props): ReactElement {
  const [mainLoading, setMainLoading] = useState(true);
  const router = useRouter();
  const [skip, setSkip] = useState(true);
  const [bookingId, setBookingId] = useState<number>();
  const [booking, setBooking] = useState<Trip>();

  const [showCancelTripModal, setShowCancelTripModal] = useState(false);
  const [showConfirmTripModal, setShowConfirmTripModal] = useState(false);

  useEffect(() => {
    if (router.query) {
      try {
        const tripID = parseInt(router.query.id as string, 10);
        if (isNaN(tripID)) {
          throw new Error("Invalid trip id");
        }

        setBookingId(tripID);
      } catch (error) {}
    }
  }, [router.query]);

  useEffect(() => {
    if (bookingId) {
      setSkip(false);
    }
  }, [bookingId]);

  const { data, loading } = useGetBookingQuery({
    variables: { bookingId: bookingId! },
    fetchPolicy: "network-only",
    skip,
  });

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (data?.getBooking.trip?.id) {
      setBooking(data.getBooking.trip);
    }
  }, [data]);

  useEffect(() => {
    if (!loading && booking?.id) {
      setMainLoading(false);
    }
  }, [booking, loading]);

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
          query: { meta_id: booking?.chat_meta_id, rc_id: booking?.owner_id },
        });
      } else {
        router.push({
          pathname: "/account/chats",
          query: { meta_id: booking?.chat_meta_id },
        });
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  console.log("booking :>> ", booking);

  return (
    <>
      <CustomHead title="Account - Bookings" />
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
                  setTrip={setBooking}
                  tripId={bookingId}
                />
              )}

              {showConfirmTripModal && (
                <ConfirmTripModal
                  showModal={showConfirmTripModal}
                  handleClose={() => setShowConfirmTripModal(false)}
                  setTrip={setBooking}
                  tripId={bookingId}
                />
              )}
              <div className="mt-4 d-flex align-items-center mb-3">
                {/* <h3>Helloo</h3> */}
                <button
                  className="btn m-0 p-0"
                  onClick={() => {
                    router.replace("/account/bookings");
                  }}
                >
                  <BsArrowLeft size={"30px"} />
                </button>
                <div className="d-flex justify-content-between w-100">
                  <h3 className="m-0">Booking Details</h3>
                  <button
                    className="btn bgOrange"
                    onClick={handleConfirmTrip}
                    disabled={booking?.status === "confirmed"}
                  >
                    {booking?.status === "confirmed"
                      ? "Trip Confirmed"
                      : "Confirm Trip"}
                  </button>
                </div>
              </div>

              <div>
                <div>
                  <h6 className="fw-bolder">User Details</h6>
                  <div>
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <p>First Name</p>
                      <span>{booking?.owner?.first_name ?? "N/A"}</span>
                    </div>
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <p>Last Name</p>
                      <span>{booking?.owner?.last_name ?? "N/A"}</span>
                    </div>
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <p>Email</p>
                      <span>{booking?.owner?.email}</span>
                    </div>
                  </div>
                </div>

                <div className="my-4">
                  <h6 className="fw-bolder">Trip Dates</h6>
                  <div>
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <p>Start Date</p>
                      <span>
                        {new Date(booking?.start_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <p>Start Time</p>
                      <span>{booking?.start_time}hrs</span>
                    </div>
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <p>End Date</p>
                      <span>
                        {new Date(booking?.end_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <p>End Time</p>
                      <span>{booking?.end_time}hrs</span>
                    </div>
                  </div>
                </div>

                <div className="my-4">
                  <h6 className="fw-bolder">Payment Details</h6>
                  <div>
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <p>Amount Paid</p>
                      <span>
                        Ksh.
                        {parseInt(
                          booking?.transaction.amount!
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {booking?.status === "confirmed" && (
                  <div className="d-grid gap-2 mt-3">
                    <button className="btn bg-success" onClick={handleChat}>
                      Chat With Guest
                    </button>
                  </div>
                )}

                {booking?.status !== "successful" &&
                  booking?.status !== "cancelled" && (
                    <div className="d-grid gap-2 mt-3">
                      <button
                        className="btn bg-danger"
                        onClick={handleCancelTrip}
                      >
                        Cancel Trip
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
