import Link from "next/link";
import React, { ReactElement } from "react";
import { Modal } from "react-bootstrap";
import { Car } from "../../graphql_types/generated/graphql";

interface Props {
  showModal: boolean;
  handleClose: () => void;
  car: Car;
}

export default function ReserveSessionExpiredModal(props: Props): ReactElement {
  return (
    <Modal show={props.showModal} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reserve Session Expired</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Ooops! It seems your session to reserve this car has expired and
          another user has already booked this car. Due to booking
          competitiveness this might happen when it takes you longer to book a
          car. By default, each guest has{" "}
          {props.car.end_user_type === "self_driven" ? "30" : "20"} mins to book
          a car after which the car is published back to the public.
        </p>

        <br />

        <p>
          Worry not, we have other cars like this one. Try to spend the{" "}
          {props.car.end_user_type === "self_driven" ? "30" : "20"} mins
          reservation time wisely to effect your booking successfully. Thank you
        </p>

        <div className="d-grid gap-2 mt-3">
          <Link href="/browse-cars">
            <a>
              <button type="submit" className="btn bgOrange">
                Show Me Similar Cars
              </button>
            </a>
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
}
