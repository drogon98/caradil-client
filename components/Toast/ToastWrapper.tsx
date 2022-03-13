import React, { Dispatch, FC, SetStateAction } from "react";
import { ToastPosition } from "react-bootstrap/esm/ToastContainer";
import CustomToast from ".";

interface ToastWrapperProps {
  setShow: Dispatch<SetStateAction<boolean>>;
  show: boolean;
  message: string;
  position: ToastPosition | undefined;
  delay?: number;
  bg: string;
}

export const ToastWrapper: FC<ToastWrapperProps> = (props) => {
  return (
    <div className="toast-wrapper">
      <CustomToast
        setShow={props.setShow}
        show={props.show}
        message={props.message}
        position={props.position}
        delay={props.delay}
        bg={props.bg}
      />
    </div>
  );
};
