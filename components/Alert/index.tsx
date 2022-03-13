import React, { ReactChild, useState } from "react";
import { Alert } from "react-bootstrap";

interface CustomAlertProps {
  variant: string;
  children: ReactChild;
  show: boolean;
  setShow: any;
}

export default function CustomAlert(props: CustomAlertProps) {
  if (!props.show) {
    return null;
  }
  return (
    <Alert
      variant={props.variant}
      onClose={() => props.setShow(false)}
      dismissible={true}
    >
      {props.children}
    </Alert>
  );
}
