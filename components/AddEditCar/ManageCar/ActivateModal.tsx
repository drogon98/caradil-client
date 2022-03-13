import React, { SyntheticEvent } from "react";
import { Modal } from "react-bootstrap";
import {
  Car,
  useActivateCarMutation,
  useDeActivateCarMutation,
} from "../../../graphql_types/generated/graphql";
import { ButtonLoading } from "../../Loading/ButtonLoading";

interface ActivateModalProps {
  show: boolean;
  close: any;
  action: string;
  car: Car;
  setCarData: any;
}

export default function ActivateModal(props: ActivateModalProps) {
  const [activateCar, { loading: activatingCar }] = useActivateCarMutation();
  const [deactivateCar, { loading: deactivatingCar }] =
    useDeActivateCarMutation();

  const handleActivate = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      let response = await activateCar({
        variables: { carId: props.car?.id! },
      });

      if (response.data?.activateCar.car) {
        props.setCarData(response.data?.activateCar.car);
        props.close();
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleDeactivate = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      let response = await deactivateCar({
        variables: { carId: props.car?.id! },
      });

      if (response.data?.deActivateCar.car) {
        props.setCarData(response.data?.deActivateCar.car);
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
          {props.action === "activate" && "Activate Car"}
          {/* {props.action === "proceed_to_edit" && "Mark As Edit"} */}
          {props.action === "deactivate" && "Deactivate Car"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {props.action === "activate" && (
            <>
              <p>
                By making the car active this will make it visible to the
                public.
              </p>
              <div className="d-grid gap-2 mt-3">
                <button
                  className="btn bgOrange"
                  onClick={handleActivate}
                  disabled={activatingCar}
                >
                  {activatingCar ? (
                    <ButtonLoading
                      spinnerColor="white"
                      dimensions={{ height: "24px", width: "24px" }}
                    />
                  ) : (
                    "Yes,Activate Car"
                  )}
                </button>
              </div>
            </>
          )}

          {props.action === "deactivate" && (
            <>
              <p>
                By deactivating the car it will be hidden from the public. No
                one will see it or book. To deactivate it, click the button
                below.
              </p>
              <div className="d-grid gap-2 mt-3">
                <button
                  className="btn bgOrange"
                  onClick={handleDeactivate}
                  disabled={deactivatingCar}
                >
                  {deactivatingCar ? (
                    <ButtonLoading
                      spinnerColor="white"
                      dimensions={{ height: "24px", width: "24px" }}
                    />
                  ) : (
                    "Yes,Deactivate Car"
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
