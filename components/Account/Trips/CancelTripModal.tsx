import Link from "next/link";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { Modal } from "react-bootstrap";
import { clearInterval } from "timers";
import { ButtonLoading } from "../../../components/Loading/ButtonLoading";
import {
  CancelTripInput,
  Trip,
  useCancelTripMutation,
} from "../../../graphql_types/generated/graphql";
import { useAppSelector } from "../../../redux/hooks";
import {
  getExactStartAndEndTime,
  getTripDuration,
} from "../../../utils/trip_duration_ttl_calc";
import { useUserId } from "../../hooks/useUserId";

interface Props {
  //   children: ReactChild;
  showModal: boolean;
  handleClose: () => void;
  tripId: number | undefined;
  trip: Trip;
  // setTrip: Dispatch<SetStateAction<Trip | undefined>>;
  setShowToast: any;
  setShowToastMessage: any;
  setToastDelay: any;
}

export default function CancelTripMoal(props: Props): ReactElement {
  const token = useAppSelector((state) => state.auth._id);
  const [cancelRadioInputReason, setCancelRadioInputReason] = useState("");
  const [cancelReason, setCancelReason] = useState<string>("");
  const [cancelTrip, { loading: cancelingTrip }] = useCancelTripMutation();
  const [cancelAction, setCancelAction] = useState("");
  const router = useRouter();
  // const [hostGuestNoShow, setHostGuestNoShow] = useState(false);
  const [showNoShow, setShowNoShow] = useState(false);
  const userId = useUserId(token);

  useEffect(() => {
    try {
      if (props.trip) {
        let obj = getTripDuration(
          {
            start_date: props.trip.start_date!,
            end_date: props.trip.end_date!,
            start_time: props.trip.start_time as string,
            end_time: props.trip.end_time as string,
          },
          props.trip.car?.can_rent_hourly!
        );

        if (obj.type_ === "hour") {
        } else if (obj.type_ === "day") {
        }
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  }, [props.trip]);

  // console.log("props.trip", props.trip);

  // useEffect(() => {
  //   try {
  //     if (props.trip) {
  //       let now = new Date();
  //       let time = now.getTime();

  //       let tripStartDate = new Date(props.trip.start_date!);

  //       let rawTripStartTime = props.trip?.start_time?.split(":");

  //       if (rawTripStartTime) {
  //         tripStartDate.setHours(
  //           parseInt(rawTripStartTime[0]!, 10),
  //           parseInt(rawTripStartTime[1]!, 10)
  //         );

  //         if (time > tripStartDate.getTime()) {
  //           setHostGuestNoShow(true);
  //         } else {
  //           setHostGuestNoShow(false);
  //         }
  //       }

  //       // console.log("now :>> ", now);
  //     }
  //   } catch (error) {
  //     console.log("error :>> ", error);
  //   }
  // }, [props.trip]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (props.trip) {
      try {
        let exactTimes = getExactStartAndEndTime({
          start_date: props.trip.start_date!,
          end_date: props.trip.end_date!,
          start_time: props.trip.start_time!,
          end_time: props.trip.end_time!,
        });

        let now = new Date().getTime();

        let exactStartTimePlusOneHour = exactTimes.startTime + 3600000;

        if (now > exactStartTimePlusOneHour) {
          setShowNoShow(true);
        } else {
          setShowNoShow(false);
        }

        setInterval(() => {
          if (now > exactStartTimePlusOneHour) {
            setShowNoShow(true);
          } else {
            setShowNoShow(false);
          }
        }, 60000);
      } catch (error) {
        console.log("error", error);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [props.trip]);

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.name === "cancelRadioReason") {
      setCancelRadioInputReason(e.target.value);
    } else if (e.target.name === "cancelReason") {
      setCancelReason(e.target.value);
    } else if (e.target.name === "cancelAction") {
      setCancelAction(e.target.value);
    }
  };

  // console.log("props.trip", props.trip);

  // console.log("cancelAction :>> ", cancelAction);

  const handleCancelTrip = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let payload: CancelTripInput;
      if (cancelRadioInputReason === "no-show") {
        payload = {
          cancelReason:
            userId === props.trip.owner_id ? `Host no-show` : `Guest no-show`,
          cancelTime: new Date().getTime().toString(),
          cancelAction,
        };
      } else {
        payload = {
          cancelReason,
          cancelTime: new Date().getTime().toString(),
          cancelAction,
        };
      }
      const response = await cancelTrip({
        variables: { tripId: props.tripId!, input: payload },
      });

      if (response.data?.cancelTrip.success) {
        if (response.data?.cancelTrip.email_sent) {
          props.setToastDelay(10000);
          props.setShowToastMessage(
            `${
              userId === props.trip.owner_id ? `Trip` : `Booking`
            } successfully cancelled. An email to ${
              userId === props.trip.owner_id
                ? `request refund`
                : `request delivery compensation`
            } has been sent to your inbox!`
          );
          props.setShowToast(true);
        } else {
          props.setToastDelay(3000);
          props.setShowToastMessage(
            `${
              userId === props.trip.owner_id ? `Trip` : `Booking`
            } successfully cancelled!.`
          );
          props.setShowToast(true);
          if (cancelAction === "cancel_trip_find_other") {
            await router.push({
              pathname: "/browse-cars",
              query: {
                make: props.trip?.car?.make!,
                categories: props.trip?.car?.categories,
                color: props.trip?.car?.color,
                subject: props.trip?.car?.id,
              },
            });
          }
        }
        props.handleClose();
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <Modal show={props.showModal} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cancel Trip</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You are about to cancel this trip. Give a reason for the cancellation in
        the form below.
        {props.trip.status === "confirmed" && (
          <p className="my-2">
            <b>
              <small>
                To cancel a confirmed trip we suggest you send a chat message to{" "}
                {userId === props.trip.owner_id ? "host" : "guest"} and let him
                or her know about it to avoid inconveniences .
              </small>
            </b>
          </p>
        )}
        <form className="form-group" onSubmit={handleCancelTrip}>
          {props.trip.status === "confirmed" && (
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={""}
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Yes, i have chatted with{" "}
                {userId === props.trip.owner_id ? "host" : "guest"} and agreed
                that i can cancel this trip.
              </label>
            </div>
          )}

          {/* {props.trip.status !== "pending" && ( */}
          <br />
          <>
            {showNoShow && (
              <>
                <label className="mt-3">Cancel Reason</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="cancelRadioReason"
                    id="cancelReasonNoShow"
                    value={"no-show"}
                    onChange={handleChange}
                    checked={cancelRadioInputReason === "no-show"}
                    disabled={cancelingTrip}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="cancelReasonNoShow"
                  >
                    {userId === props.trip.owner_id
                      ? "Host no-show"
                      : "Guest no-show"}
                  </label>
                </div>
              </>
            )}
            {/* <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="cancelRadioReason"
                  id="cancelReasonOther"
                  value={"other"}
                  onChange={handleChange}
                  checked={cancelRadioInputReason === "other"}
                  disabled={cancelingTrip}
                />
                <label className="form-check-label" htmlFor="cancelReasonOther">
                  Other Reason
                </label>
              </div> */}
          </>
          {/* )} */}

          {/* {props.trip.status !== "pending" ? (
            <>
               */}
          {!cancelRadioInputReason.includes("no-show") && (
            <>
              <label className="mt-1">Cancel Reason</label>
              <textarea
                className="form-control"
                value={cancelReason}
                required
                onChange={handleChange}
                style={{ resize: "none" }}
                name="cancelReason"
                disabled={cancelingTrip}
              />
            </>
          )}
          <br />
          {/* </>
              )}
            </>
          ) : (
            <>
              <>
                <label className="mt-1">Reason</label>
                <textarea
                  className="form-control"
                  value={cancelReason}
                  required
                  onChange={handleChange}
                  style={{ resize: "none" }}
                  name="cancelReason"
                  disabled={cancelingTrip}
                />
              </>
            </>
          )} */}

          {userId === props.trip.owner_id ? (
            <>
              <label className="mt-3">After Cancel Action</label>
              <div className="my-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="cancelAction"
                    id="cancel_trip_find_other"
                    required
                    onChange={handleChange}
                    checked={cancelAction === "cancel_trip_find_other"}
                    value={"cancel_trip_find_other"}
                    disabled={cancelingTrip}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="cancel_trip_find_other"
                  >
                    Cancel this trip and help me find another car
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="cancelAction"
                    id="cancel_trip_refund"
                    onChange={handleChange}
                    checked={cancelAction === "cancel_trip_refund"}
                    value={"cancel_trip_refund"}
                    required
                    disabled={cancelingTrip}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="cancel_trip_refund"
                  >
                    Cancel this trip and refund me
                  </label>
                </div>
                {cancelAction === "cancel_trip_refund" &&
                  props.trip.status === "pending" && (
                    <div className="text-danger">
                      <small>
                        The amount refunded to you might be less due to
                        transaction charges.
                      </small>
                    </div>
                  )}

                {/* {cancelAction && props.trip.status !== "pending" && (
                  <div className="text-danger">
                    <small>
                      You are cancelling this trip beyond the free cancellation
                      period. This attracts a cancellation fee. To learn more
                      about how we calculate this cancellation fee, read out
                      cancellation and refund policy{" "}
                      <span>
                        <Link href="/policies/cancellation-and-refund">
                          <a
                            target={"_blank"}
                            style={{ textDecoration: "underline" }}
                          >
                            here
                          </a>
                        </Link>
                      </span>
                    </small>
                  </div>
                )} */}
              </div>
            </>
          ) : (
            showNoShow &&
            props.trip.status === "confirmed" &&
            props.trip.delivery_distance &&
            props.trip.delivery_location &&
            cancelRadioInputReason.includes("no-show") && (
              <>
                <label className="mt-3">After Cancel Action</label>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={"cancel_trip_delivery_compensation"}
                      id="cancel_trip_delivery_compensation"
                      name="cancelAction"
                      onChange={handleChange}
                      checked={
                        cancelAction === "cancel_trip_delivery_compensation"
                      }
                      disabled={cancelingTrip}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="cancel_trip_delivery_compensation"
                    >
                      I had delivered the car to the pick up location. I request
                      compensation for the delivery.
                    </label>
                  </div>
                </div>
              </>
            )
          )}

          {props.trip.status !== "pending" && (
            <div>
              <small className="text-danger">
                Cancelling a confirmed trip will attract a cancel fee. Learn
                more about our cancellation policy{" "}
                <Link href="/policies/cancellation-and-refund">
                  <a target={"_blank"} style={{ textDecoration: "underline" }}>
                    here
                  </a>
                </Link>
              </small>
            </div>
          )}

          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn bgOrange"
              disabled={cancelingTrip}
            >
              {cancelingTrip ? (
                <ButtonLoading
                  spinnerColor="white"
                  dimensions={{ height: "24px", width: "24px" }}
                />
              ) : (
                "Cancel Trip"
              )}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
