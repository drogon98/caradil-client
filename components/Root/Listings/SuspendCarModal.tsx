import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  Car,
  useEditCarSuspendedMutation,
} from "../../../graphql_types/generated/graphql";
import { ButtonLoading } from "../../Loading/ButtonLoading";

interface SuspendCarModalProps {
  showModal: boolean;
  handleClose: () => void;
  car: Car;
}

export const SuspendCarModal: FC<SuspendCarModalProps> = (props) => {
  const [suspendReason, setSuspendReason] = useState("");
  const [editCarSuspend, { loading: suspendingCar }] =
    useEditCarSuspendedMutation();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSuspendReason(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let response = await editCarSuspend({
        variables: {
          carId: props.car.id!,
          action: props.car.suspended ? "unsuspend" : "suspend",
          suspend_reason: suspendReason,
        },
      });

      if (response.data?.editCarSuspended) {
        props.handleClose();
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <Modal show={props.showModal} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.car.suspended ? "Unsuspend Car" : "Suspend Car"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.car.suspended ? (
          <p>You are about to unsuspend this car.</p>
        ) : (
          <p>You are about to suspend this car.</p>
        )}

        <form className="form-group" onSubmit={handleSubmit}>
          {!props.car.suspended && (
            <>
              <label className="mt-2">Suspend Reason</label>
              <textarea
                className="form-control"
                value={suspendReason}
                required
                onChange={handleChange}
                style={{ resize: "none" }}
              />
            </>
          )}

          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn bgOrange"
              disabled={suspendingCar}
            >
              {suspendingCar ? (
                <ButtonLoading
                  spinnerColor="white"
                  dimensions={{ height: "24px", width: "24px" }}
                />
              ) : props.car.suspended ? (
                "Unsuspend Car"
              ) : (
                "Suspend Car"
              )}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
