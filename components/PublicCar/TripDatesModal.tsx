import React, {
  ReactChild,
  ReactElement,
  SyntheticEvent,
  useState,
} from "react";
import { Modal } from "react-bootstrap";
import { TripDatesObj } from "../../utils/interfaces";
import { TripDates } from "./TripDates";

interface Props {
  children: ReactChild;
  disableDates: any;
  values: TripDatesObj;
  setValues: any;
  timeError: string;
  applyTime: any;
  show: boolean;
  hide: any;
  startDate: number;
  endDate: number;
  setStartDate: any;
  setEndDate: any;
  isCarPage?: boolean;
}

export default function TripDateModal(props: Props): ReactElement {
  return (
    <>
      <span>{props.children}</span>

      <Modal
        show={props.show}
        onHide={props.hide}
        centered
        dialogClassName="trip-dates-modal"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Trip Dates & Time</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-1">
          <div>
            <TripDates
              disableDates={props.disableDates}
              values={props.values}
              setValues={props.setValues}
              timeError={props.timeError}
              startDate={props.startDate}
              endDate={props.endDate}
              setStartDate={props.setStartDate}
              setEndDate={props.setEndDate}
              isCarPage={props.isCarPage}
            />
            <div className="d-flex justify-content-end mt-2">
              <button
                className="btn bg-secondary"
                onClick={(e: SyntheticEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  props.applyTime();
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
