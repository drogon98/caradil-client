import React, { FC, SyntheticEvent, useState } from "react";
import { Car, Transaction } from "../../../graphql_types/generated/graphql";

interface AllBoxProps {
  data: Transaction;
}

export const AllBox: FC<AllBoxProps> = (props) => {
  return (
    <>
      <div className="shadow p-3 d-flex m-0 align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div style={{ width: "280px" }}>
            <h6>{props.data.amount}</h6>
          </div>
          <div style={{ width: "280px" }}>
            <h6>{props.data.status}</h6>
          </div>
        </div>
        {/* <div>
          {props.data.suspended ? (
            <button
              className="btn text-light bg-danger"
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
        </div> */}
      </div>
    </>
  );
};
