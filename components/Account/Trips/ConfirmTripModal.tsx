import React, { FormEvent, ReactElement } from "react";
import { Modal } from "react-bootstrap";
import { ButtonLoading } from "../../../components/Loading/ButtonLoading";
import { useConfirmTripMutation } from "../../../graphql_types/generated/graphql";

interface Props {
  showModal: boolean;
  handleClose: () => void;
  // setTrip: Dispatch<SetStateAction<Trip | undefined>>;
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

      // console.log("response :>> ", response);

      if (response.data?.confirmTrip.trip?.id) {
        // props.setTrip(response.data?.confirmTrip.trip);
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
        <p>
          By confirming this trip you agree that you are ready to provide your
          car on the specified date, on time and in good condition.
        </p>
        <form onSubmit={handleConfirmTrip} className="mt-3">
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
                "Yes,Confirm Trip"
              )}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
