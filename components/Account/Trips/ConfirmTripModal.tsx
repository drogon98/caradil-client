import React, {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { Modal } from "react-bootstrap";
import { ButtonLoading } from "../../../components/Loading/ButtonLoading";
import {
  Trip,
  useConfirmTripMutation,
} from "../../../graphql_types/generated/graphql";
import { TripDatesObj } from "../../../utils/interfaces";
import { getTripDuration } from "../../../utils/trip_duration_ttl_calc";

interface Props {
  showModal: boolean;
  handleClose: () => void;
  // setTrip: Dispatch<SetStateAction<Trip | undefined>>;
  trip: Trip;
  tripId: string | undefined;
}

export default function ConfirmTripModal(props: Props): ReactElement {
  const [confirmTrip, { loading: confirmTripLoading }] =
    useConfirmTripMutation();
  const [publishable, setPublishable] = useState(false);
  const [publish, setPublish] = useState(false);

  useEffect(() => {
    if (props.trip) {
      let datesObj: TripDatesObj = {
        start_date: props.trip.start_date!,
        end_date: props.trip.end_date!,
        start_time: props.trip.start_time!,
        end_time: props.trip.end_time!,
      };

      let obj = getTripDuration(datesObj, false, true);

      let tripStartDate = props.trip.start_date!;

      console.log("obj :>> ", obj);

      // if (obj.type_ === "hour") {
      let now = new Date().getTime();

      let datesDifference = tripStartDate - now;

      if (datesDifference + 1 > 2) {
        setPublishable(true);
      } else {
        setPublishable(false);
      }
      // } else {
      // }
    }
  }, [props.trip]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPublish(e.target.value == "true" ? true : false);
  };

  const handleConfirmTrip = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let response = await confirmTrip({
        variables: { tripId: props.tripId!, publish: publish },
      });

      // console.log("response :>> ", response);

      if (response.data?.confirmTrip.success) {
        // props.setTrip(response.data?.confirmTrip.trip);
        props.handleClose();
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <Modal show={props.showModal} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Trip</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          By confirming this trip you agree that you are ready to provide your
          car on the specified date, on time and in good condition.
        </p>

        {publishable && (
          <>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={publish ? "false" : "true"}
                id="flexCheckDefault"
                checked={publish!}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Republish Car
              </label>
            </div>
            {publish && (
              <div className="text-warning">
                <small>
                  By republishing car,it will be visible again to the public
                  between now and one day before this trip starts.
                </small>
              </div>
            )}
          </>
        )}
        <form onSubmit={handleConfirmTrip} className="mt-3">
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn bgOrange"
              disabled={confirmTripLoading}
            >
              {confirmTripLoading ? (
                <ButtonLoading
                  spinnerColor="white"
                  dimensions={{ height: "24px", width: "24px" }}
                />
              ) : publish ? (
                "Yes,Confirm Trip and Publish"
              ) : (
                "Yes,Confirm Trip"
              )}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
