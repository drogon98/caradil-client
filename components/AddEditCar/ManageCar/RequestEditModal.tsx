import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  SyntheticEvent,
} from "react";
import { Modal } from "react-bootstrap";
import {
  Car,
  // useCreateEditCarRequestMutation,
} from "../../../graphql_types/generated/graphql";
import { ButtonLoading } from "../../Loading/ButtonLoading";

interface Props {
  showModal: boolean;
  handleClose: any;
  booked: boolean;
  carId: number;
  setCarData: Dispatch<SetStateAction<Car | undefined>>;
}

export default function RequestEditModal(props: Props): ReactElement {
  // const [createEditRequest, { loading }] = useCreateEditCarRequestMutation();

  const handleRequestEdit = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      // const response = await createEditRequest({
      //   variables: { carId: props.carId },
      // });
      // if (response.data?.createEditRequest.car?.id) {
      //   props.setCarData(response.data?.createEditRequest.car);
      // }
      // props.handleClose();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <Modal show={props.showModal} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Request Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <b>Things to Note:</b>
        </p>

        <ul>
          <li>
            Your car will not be visible to the public once permission is
            granted.
          </li>
          <li>
            After editing,your car will undergo verification to assess the
            validity of the informantion edited.
          </li>
          <li>
            Only after your car passes the verification process,will it be
            visible to the public again.
          </li>
        </ul>
        <div className="mb-3">
          {props.booked ? (
            <small className="text-danger">
              Your car is on a trip. You will be able to make the edit request
              when the trip is over. If the trip is over, mark it as over here.
            </small>
          ) : (
            <small>
              When the admin grants you request to edit your car,you will be
              notified via email to start the edit.
            </small>
          )}
        </div>

        <div className="d-grid gap-2">
          <button
            type="submit"
            className="btn bgOrange"
            // disabled={loading || props.booked}
            onClick={handleRequestEdit}
          >
            {/* {loading ? (
              <ButtonLoading
                spinnerColor="white"
                dimensions={{ height: "24px", width: "24px" }}
              />
            ) : (
              "Request Edit"
            )} */}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
