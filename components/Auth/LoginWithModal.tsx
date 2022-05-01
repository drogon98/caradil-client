import React, { ReactChild, ReactElement, MouseEvent, useState } from "react";
import { Modal } from "react-bootstrap";
import LoginForm from "./LoginForm";

interface Props {
  children: ReactChild;
}

export default function LoginWithModal(props: Props): ReactElement {
  const [showModal, setShowModal] = useState<boolean>();
  const handleClick = (e: MouseEvent<HTMLElement>) => {
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
          <LoginForm isModal close={handleClose} isAdmin={false} />
        </Modal.Body>
      </Modal>
    </>
  );
}
