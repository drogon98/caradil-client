import React, {
  ReactChild,
  ReactElement,
  SyntheticEvent,
  useState,
} from "react";
import LoginForm from "./LoginForm";

import { Modal, Button } from "react-bootstrap";
interface Props {
  children: ReactChild;
}

export default function LoginWithModal(props: Props): ReactElement {
  const [showModal, setShowModal] = useState<boolean>();
  const handleClick = (e: SyntheticEvent<HTMLElement>) => {
    setShowModal(!showModal);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <span onClick={handleClick}>{props.children}</span>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm isModal close={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}
