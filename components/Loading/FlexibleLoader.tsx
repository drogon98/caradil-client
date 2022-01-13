import React, { ReactElement } from "react";

interface Props {}

export default function FlexibleLoader({}: Props): ReactElement {
  return (
    <div
      style={{ height: "100%", width: "100%" }}
      className="d-flex align-items-center justify-content-center"
    >
      <div className="text-center">
        <div className="spinner-border colorOrange" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}
