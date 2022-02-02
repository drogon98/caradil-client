import React, { FC } from "react";

interface LogoutOverlayProps {}

export const LogoutOverlay: FC<LogoutOverlayProps> = (props) => {
  return (
    <div className="logout-overlay d-flex align-items-center justify-content-center flex-column">
      <div className="text-center">
        <div className="spinner-border colorOrange" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <div>
        <small className="colorOrange">Logging out...</small>
      </div>
    </div>
  );
};
