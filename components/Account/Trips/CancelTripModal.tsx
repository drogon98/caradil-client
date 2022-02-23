import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { Modal } from "react-bootstrap";
import { useRole } from "../../../components/hooks/useRole";
import { ButtonLoading } from "../../../components/Loading/ButtonLoading";
import {
  CancelTripInput,
  Trip,
  useCancelTripMutation,
} from "../../../graphql_types/generated/graphql";
import { useAppSelector } from "../../../redux/hooks";
import { getTripDuration } from "../../../utils/trip_duration_ttl_calc";

interface Props {
  //   children: ReactChild;
  showModal: boolean;
  handleClose: () => void;
  tripId: number | undefined;
  trip: Trip;
  // setTrip: Dispatch<SetStateAction<Trip | undefined>>;
}

export default function CancelTripMoal(props: Props): ReactElement {
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const [cancelRadioInputReason, setCancelRadioInputReason] =
    useState("no-show");
  const [cancelReason, setCancelReason] = useState<string>("");
  const [cancelTrip, { loading: cancelingTrip }] = useCancelTripMutation();
  const [cancelAction, setCancelAction] = useState("");
  const router = useRouter();
  const [hostGuestNoShow, setHostGuestNoShow] = useState(false);

  useEffect(() => {
    try {
      if (props.trip) {
        let obj = getTripDuration(
          {
            startDate: props.trip.start_date,
            endDate: props.trip.end_date,
            startTime: props.trip.start_time as string,
            endTime: props.trip.end_time as string,
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

  useEffect(() => {
    try {
      if (props.trip) {
        let now = new Date();
        let time = now.getTime();

        let tripStartDate = new Date(props.trip.start_date);

        let rawTripStartTime = props.trip?.start_time?.split(":");

        if (rawTripStartTime) {
          tripStartDate.setHours(
            parseInt(rawTripStartTime[0]!, 10),
            parseInt(rawTripStartTime[1]!, 10)
          );

          if (time > tripStartDate.getTime()) {
            setHostGuestNoShow(true);
          } else {
            setHostGuestNoShow(false);
          }
        }

        // console.log("now :>> ", now);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
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
          cancelReason: role === 1 ? `Host no-show` : `Guest no-show`,
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

      // console.log("response :>> ", response);

      if (response.data?.cancelTrip.trip?.id) {
        // if (true) {
        // Show toast
        if (cancelAction === "cancel_trip_find_other") {
          await router.push("/browse-cars");
        } else if (cancelAction === "cancel_trip_refund") {
          await router.push("/account/trips/1/request-refund");
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
                {role === 1 ? "host" : "guest"} and let him or her know about it
                to avoid inconveniences .
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
                Yes, i have chatted with {role === 1 ? "host" : "guest"} and
                agreed that i can cancel this trip.
              </label>
            </div>
          )}
          {hostGuestNoShow && props.trip.status === "confirmed" && (
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
                />
                <label
                  className="form-check-label"
                  htmlFor="cancelReasonNoShow"
                >
                  {role === 1 ? "Host no-show" : "Guest no-show"}
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="cancelRadioReason"
                  id="cancelReasonOther"
                  value={"other"}
                  onChange={handleChange}
                  checked={cancelRadioInputReason === "other"}
                />
                <label className="form-check-label" htmlFor="cancelReasonOther">
                  Other Reason
                </label>
              </div>
            </>
          )}

          {props.trip.status === "confirmed" ? (
            <>
              {!cancelRadioInputReason.includes("no-show") && (
                <>
                  <label className="mt-1">Reason</label>
                  <textarea
                    className="form-control"
                    value={cancelReason}
                    required
                    onChange={handleChange}
                    style={{ resize: "none" }}
                    name="cancelReason"
                  />
                </>
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
                />
              </>
            </>
          )}

          {role === 1 ? (
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
                  />
                  <label
                    className="form-check-label"
                    htmlFor="cancel_trip_refund"
                  >
                    Cancel this trip and refund me
                  </label>
                </div>
              </div>
            </>
          ) : (
            hostGuestNoShow &&
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
