import React, { FC, MouseEvent, useState } from "react";
import { Car } from "../../../graphql_types/generated/graphql";
import VerifyModal from "./VerifyModal";

interface UnderVerificationBoxProps {
  data: Car;
}

export const UnderVerificationBox: FC<UnderVerificationBoxProps> = (props) => {
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const handleVerifyClick = (e: MouseEvent<HTMLButtonElement>) => {
    setShowVerifyModal(true);
  };

  return (
    <>
      {showVerifyModal && (
        <VerifyModal
          car={props.data}
          show={showVerifyModal}
          handleClose={() => setShowVerifyModal(false)}
        />
      )}

      <div className="shadow p-3 row m-0 align-items-center">
        <div className="col-2">
          <h6>{props.data.name}</h6>
        </div>
        <div className="col-2">
          <h6>{props.data.reg_no}</h6>
        </div>
        <div className="col-7" />
        <div className="col-1">
          <button className="btn bgOrange" onClick={handleVerifyClick}>
            Verify
          </button>
        </div>
      </div>
    </>
  );
};
