import React, { MouseEvent, useEffect, useState } from "react";
import { Car } from "../../../graphql_types/generated/graphql";
import ActivateModal from "./ActivateModal";

interface ActivateBtnProps {
  car: Car;
  setCarData: any;
}

export default function ActivateBtn(props: ActivateBtnProps) {
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("deactivate");

  const handleActivateClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  useEffect(() => {
    if (props.car) {
      if (props.car.active) {
        setAction("deactivate");
      } else {
        setAction("activate");
      }
    }
  }, [props.car]);

  return (
    <>
      {showModal && (
        <ActivateModal
          show={showModal}
          close={() => setShowModal(false)}
          action={action}
          car={props.car}
          setCarData={props.setCarData}
        />
      )}

      <button
        className="btn bg-success text-light"
        onClick={handleActivateClick}
      >
        {props.car.active ? "Deactivate" : "Activate"}
      </button>
    </>
  );
}
