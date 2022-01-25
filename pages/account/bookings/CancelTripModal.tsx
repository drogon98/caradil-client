import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  ReactElement,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import { Modal } from "react-bootstrap";
import { ButtonLoading } from "../../../components/Loading/ButtonLoading";
import {
  Trip,
  useCancelTripMutation,
} from "../../../graphql_types/generated/graphql";

interface Props {
  //   children: ReactChild;
  showModal: boolean;
  handleClose: () => void;
  tripId: number | undefined;
  setTrip: Dispatch<SetStateAction<Trip | undefined>>;
}

export default function CancelTripMoal(props: Props): ReactElement {
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

      console.log("response :>> ", response);

      if (response.data?.cancelTrip.trip?.id) {
        props.setTrip(response.data?.cancelTrip.trip);
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
        You are about to cancel this trip. Give us a reason for the cancellation
        in the form below
        <form className="form-group" onSubmit={handleCancelTrip}>
          <label className="mt-3">Cancel Reason</label>
          <textarea
            className="form-control"
            value={cancelReason}
            required
            onChange={handleChange}
          />
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
