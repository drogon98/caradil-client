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
  useConfirmTripMutation,
} from "../../../graphql_types/generated/graphql";

interface Props {
  //   children: ReactChild;
  showModal: boolean;
  handleClose: () => void;
  setTrip: Dispatch<SetStateAction<Trip | undefined>>;
  tripId: number | undefined;
}

export default function ConfirmTripModal(props: Props): ReactElement {
  const [confirmTrip, { loading: confirmTripLoading }] =
    useConfirmTripMutation();

  const handleConfirmTrip = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let response = await confirmTrip({
        variables: { tripId: props.tripId! },
      });

      console.log("response :>> ", response);

      if (response.data?.confirmTrip.trip?.id) {
        props.setTrip(response.data?.confirmTrip.trip);
        props.handleClose();
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <Modal show={props.showModal} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Trip</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        By confirming this trip you agree that you are ready to provide your car
        on the specified dates in good condition.
        <form onSubmit={handleConfirmTrip}>
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn bgOrange"
              disabled={confirmTripLoading}
            >
              {confirmTripLoading ? (
                <ButtonLoading
                  spinnerColor="white"
                  dimensions={{ height: "24px", width: "24px" }}
                />
              ) : (
                "Confirm Trip"
              )}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
