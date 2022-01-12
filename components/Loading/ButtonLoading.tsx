import React, { FC } from "react";

interface ButtonLoadingProps {
  spinnerColor: string;
  //   spinnerSize: string;
  dimensions: { width: string; height: string };
}

/**
 * @author @CodeYourEmpire
 * @function @ButtonLoading
 **/

export const ButtonLoading: FC<ButtonLoadingProps> = (props) => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className={`spinner-border 
         ${props.spinnerColor === "white" && "spinner-white"}
         ${props.spinnerColor === "orange" && "spinner-orange"}`}
        role="status"
        style={props.dimensions}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
