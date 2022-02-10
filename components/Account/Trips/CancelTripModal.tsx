import React, { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { Modal } from "react-bootstrap";
import { useRole } from "../../../components/hooks/useRole";
import { ButtonLoading } from "../../../components/Loading/ButtonLoading";
import {
  Trip,
  useCancelTripMutation,
} from "../../../graphql_types/generated/graphql";
import { useAppSelector } from "../../../redux/hooks";

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
  const [cancelReason, setCancelReason] = useState<string>("");
  const [cancelTrip, { loading: cancelingTrip }] = useCancelTripMutation();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCancelReason(e.target.value);
  };

  const handleCancelTrip = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await cancelTrip({
        variables: { tripId: props.tripId!, cancelReason },
      });

      // console.log("response :>> ", response);

      if (response.data?.cancelTrip.trip?.id) {
        // props.setTrip(response.data?.cancelTrip.trip);
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

          <label className="mt-3">Cancel Reason</label>
          <textarea
            className="form-control"
            value={cancelReason}
            required
            onChange={handleChange}
            style={{ resize: "none" }}
          />

          {role === 1 && (
            <div className="my-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="cancel_trip_next"
                  id="cancel_trip_find_other"
                  required
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
                  name="cancel_trip_next"
                  id="cancel_trip_refund"
                  checked
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
