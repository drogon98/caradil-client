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
  useRescheduleTripMutation,
} from "../../../graphql_types/generated/graphql";
import { TripDatesObj } from "../../../utils/interfaces";
// import { TripDates } from "../../PublicCar/TripDates";

interface Props {
  //   children: ReactChild;
  showModal: boolean;
  handleClose: () => void;
  tripId: number | undefined;
  trip: Trip;
  // setTrip: Dispatch<SetStateAction<Trip | undefined>>;
}

export default function RescheduleTripModal(props: Props): ReactElement {
  //   const token = useAppSelector((state) => state.auth._id);
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [validDates, setValidDates] = useState(true);
  const [userDates, setUserDates] = useState<TripDatesObj>({
    start_date: new Date().getTime(),
    end_date: new Date().getTime(),
    start_time: "",
    end_time: "",
  });
  const [values, setValues] = useState<TripDatesObj>({
    start_date: new Date().getTime(),
    end_date: new Date().getTime(),
    start_time: "",
    end_time: "",
  });
  const [rescheduleTrip, { loading }] = useRescheduleTripMutation();
  //   const [tripDatesError, setTripDatesError] = useState(false);

  useEffect(() => {
    if (props.trip) {
      setValues({
        start_date: props.trip.start_date!,
        end_date: props.trip.end_date!,
        start_time: props.trip.start_time as string,
        end_time: props.trip.end_time as string,
      });
    }
  }, [props.trip]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setRescheduleReason(e.target.value);
  };

  const handleReschdeuleTrip = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let response = await rescheduleTrip({
        variables: {
          tripId: props.tripId!,
          input: {
            start_date: userDates?.start_date!,
            end_date: userDates?.end_date!,
            start_time: userDates?.start_time!,
            end_time: userDates?.end_time!,
            reschedule_reason: rescheduleReason,
          },
        },
      });
      if (response.data?.rescheduleTrip.trip) {
        props.handleClose();
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  //   console.log("values", values);

  return (
    <Modal show={props.showModal} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reschedule Trip</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You are about to reschedule this trip.
        {props.trip.status === "confirmed" && (
          <p className="my-2">
            <b>
              <small>
                To reschedule a confirmed trip we suggest you send a chat
                message to host and let him or her know about it to avoid
                inconveniences .
              </small>
            </b>
          </p>
        )}
        <form className="form-group" onSubmit={handleReschdeuleTrip}>
          {props.trip.status === "confirmed" && (
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={""}
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Yes, i have chatted with host and agreed that i can reschedule
                this trip.
              </label>
            </div>
          )}

          {/* {tripDatesError && (
            <div>
              <small className="text-danger">
                It seems your start date is ahead of end date. Please fix this!
              </small>
            </div>
          )} */}
          {/* <TripDates
            setValidDates={setValidDates}
            setTripDates={setUserDates}
            userDates={userDates}
            values={values}
            isReschedule
          /> */}

          <label className="mt-3">Reschedule Reason</label>
          <textarea
            className="form-control"
            value={rescheduleReason}
            required
            onChange={handleChange}
            style={{ resize: "none" }}
          />

          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn bgOrange"
              disabled={loading || !validDates}
            >
              {loading ? (
                <ButtonLoading
                  spinnerColor="white"
                  dimensions={{ height: "24px", width: "24px" }}
                />
              ) : (
                "Reschedule Trip"
              )}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
