import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  SyntheticEvent,
} from "react";
import { Modal } from "react-bootstrap";
import {
  Car,
  // useEditCarVerificationInProgressMutation,
} from "../../../graphql_types/generated/graphql";
import { ButtonLoading } from "../../Loading/ButtonLoading";

interface Props {
  showModal: boolean;
  handleClose: any;
  carId: number;
  setCarData: Dispatch<SetStateAction<Car | undefined>>;
}

export default function RequestVerificationModal(props: Props): ReactElement {
  // const [editCarVerificationInProgress, { loading }] =
  //   useEditCarVerificationInProgressMutation();

  const handleRequestVerification = async (
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      // const response = await editCarVerificationInProgress({
      //   variables: { carId: props.carId },
      // });
      // if (response.data?.editCarVerificationInProgress.car?.id) {
      //   props.setCarData(response.data?.editCarVerificationInProgress.car);
      //   props.handleClose();
      // }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  return (
    <Modal show={props.showModal} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Request Verification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          If you are done with the edit and okay with it,click the button below
          to request verification. If not,close this popup and proceed with the
          edit.
        </p>

        <div className="d-grid gap-2 mt-3">
          <button
            type="submit"
            className="btn bgOrange"
            // disabled={loading}
            onClick={handleRequestVerification}
          >
            {/* {loading ? (
              <ButtonLoading
                spinnerColor="white"
                dimensions={{ height: "24px", width: "24px" }}
              />
            ) : (
              "Request Verification"
            )} */}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
