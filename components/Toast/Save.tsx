import React, { Dispatch, ReactElement, SetStateAction } from "react";
import { Col, Row, Toast, ToastContainer } from "react-bootstrap";
import { ToastPosition } from "react-bootstrap/esm/ToastContainer";

interface Props {
  setShow: Dispatch<SetStateAction<boolean>>;
  show: boolean;
  message: string;
  position: ToastPosition | undefined;
}

export default function Save(props: Props): ReactElement {
  return (
    <Row>
      <Col xs={6}>
        <ToastContainer position={props.position}>
          <Toast
            onClose={() => props.setShow(false)}
            show={props.show}
            delay={3000}
            autohide
            bg="success"
          >
            <Toast.Body>
              <small className="text-light">{props.message}</small>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
      {/* <Col xs={6}>
        <Button onClick={() => setShow(true)}>Show Toast</Button>
      </Col> */}
    </Row>
  );
}
