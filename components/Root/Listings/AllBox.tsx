import React, { FC, MouseEvent, useState } from "react";
import { Car } from "../../../graphql_types/generated/graphql";
import { SuspendCarModal } from "./SuspendCarModal";

interface AllBoxProps {
  data: Car;
}

export const AllBox: FC<AllBoxProps> = (props) => {
  const [showSuspendModal, setShowSuspendModal] = useState(false);

  const handleSuspendEdit = (e: MouseEvent<HTMLButtonElement>) => {
    setShowSuspendModal(true);
  };

  return (
    <>
      {showSuspendModal && (
        <SuspendCarModal
          showModal={showSuspendModal}
          handleClose={() => setShowSuspendModal(false)}
          car={props.data}
        />
      )}
      <div className="shadow p-3 d-flex m-0 align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div style={{ width: "280px" }}>
            <h6>{props.data.name}</h6>
          </div>
          <div style={{ width: "280px" }}>
            <h6>{props.data.reg_no}</h6>
          </div>
        </div>
        <div>
          {props.data.suspended ? (
            <button
              className="btn text-light bg-dark"
              style={{ width: "100px" }}
              onClick={handleSuspendEdit}
            >
              Unsuspend
            </button>
          ) : (
            <button
              className="btn text-light bg-secondary"
              style={{ width: "100px" }}
              onClick={handleSuspendEdit}
            >
              Suspend
            </button>
          )}
        </div>
      </div>
    </>
  );
};
