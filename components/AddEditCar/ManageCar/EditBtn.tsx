import React, { MouseEvent, useEffect, useState } from "react";
import { Car } from "../../../graphql_types/generated/graphql";
import EditModal from "./EditModal";

interface EditBtnProps {
  car: Car;
  setCarData: any;
}

export default function EditBtn(props: EditBtnProps) {
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("proceed_to_edit");

  const handleEditClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  useEffect(() => {
    if (props.car) {
      if (props.car.being_edited) {
        setAction("proceed_to_republish");
      } else {
        if (props.car.reserved_for_booking) {
          setAction("reason_not_to_edit");
        } else {
          setAction("proceed_to_edit");
        }
      }
    }
  }, [props.car]);

  console.log("action", action);

  return (
    <>
      {showModal && (
        <EditModal
          show={showModal}
          close={() => setShowModal(false)}
          action={action}
          car={props.car}
          setCarData={props.setCarData}
        />
      )}

      <button className="btn bgOrange" onClick={handleEditClick}>
        {props.car.being_edited ? "Republish" : "Edit"}
      </button>
    </>
  );
}
