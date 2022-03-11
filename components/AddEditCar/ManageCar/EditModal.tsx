import React, { SyntheticEvent } from "react";
import { Modal } from "react-bootstrap";
import {
  Car,
  useMakeCarEditbaleMutation,
  useRepublishCarMutation,
} from "../../../graphql_types/generated/graphql";
import { ButtonLoading } from "../../Loading/ButtonLoading";

interface EditModalProps {
  show: boolean;
  close: any;
  action: string;
  car: Car;
}

export default function EditModal(props: EditModalProps) {
  const [markAsEdit, { loading: markingEditable }] =
    useMakeCarEditbaleMutation();
  const [republishCar, { loading: republishingCar }] =
    useRepublishCarMutation();

  const handleMarkEditable = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      let response = await markAsEdit({ variables: { carId: props.car?.id! } });

      if (response.data?.makeCarEditable.car) {
        props.close();
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleRepublish = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      let response = await republishCar({
        variables: { carId: props.car?.id! },
      });

      if (response.data?.republishCar) {
        props.close();
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <Modal show={props.show} onHide={props.close} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {(props.action === "proceed_to_edit" ||
            props.action === "reason_not_to_edit") &&
            "Mark As Edit"}
          {/* {props.action === "proceed_to_edit" && "Mark As Edit"} */}
          {props.action === "proceed_to_republish" && "Republish Car"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {props.action === "proceed_to_edit" && (
            <>
              <p>
                By activating edit mode of the car,guests will not be able to
                book it until you exit edit mode. Are you sure you want to
                activate edit mode.
              </p>
              <div className="d-grid gap-2 mt-3">
                <button
                  className="btn bgOrange"
                  onClick={handleMarkEditable}
                  disabled={markingEditable}
                >
                  {markingEditable ? (
                    <ButtonLoading
                      spinnerColor="white"
                      dimensions={{ height: "24px", width: "24px" }}
                    />
                  ) : (
                    "Yes,Activate edit"
                  )}
                </button>
              </div>
            </>
          )}
          {props.action === "reason_not_to_edit" && (
            <>
              <p>
                It seems you car is being booked. Please check later to make the
                edit.
              </p>
            </>
          )}
          {props.action === "proceed_to_republish" && (
            <>
              <p>
                I confirm that the information i have edited is true and does
                not violate caradil terms of service.
              </p>
              <div className="d-grid gap-2 mt-3">
                <button
                  className="btn bgOrange"
                  onClick={handleRepublish}
                  disabled={republishingCar}
                >
                  {republishingCar ? (
                    <ButtonLoading
                      spinnerColor="white"
                      dimensions={{ height: "24px", width: "24px" }}
                    />
                  ) : (
                    "Republish"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
