import React, { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  ReviewInput,
  Trip,
  useCreateReviewMutation,
} from "../../../graphql_types/generated/graphql";
import BeautyStars from "beauty-stars";
import { ButtonLoading } from "../../Loading/ButtonLoading";

interface Props {
  //   children: ReactChild;
  showModal: boolean;
  handleClose: () => void;
  tripId: number | undefined;
  trip: Trip;
  // setTrip: Dispatch<SetStateAction<Trip | undefined>>;
}

export default function ReviewTripModal(props: Props): ReactElement {
  const [values, setValues] = useState<ReviewInput>({
    stars: 0,
    comment: "",
  });
  const [reviewTrip, { loading }] = useCreateReviewMutation();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (values.stars === 0) {
        return;
      }

      if (!values.comment) {
        return;
      }

      let response = await reviewTrip({
        variables: { tripId: props.tripId!, input: { ...values } },
      });

      if (response.data?.createReview) {
        props.handleClose();
      } else {
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <Modal show={props.showModal} onHide={props.handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Review Trip</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <BeautyStars
            value={values.stars}
            onChange={(value) => setValues({ ...values, stars: value })}
          />

          <div>
            <label>Comment</label>
            <textarea
              className="form-control"
              name="comment"
              value={values.comment}
              onChange={handleChange}
            />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn bgOrange"
              //   disabled={loading || !validDates}
            >
              {loading ? (
                <ButtonLoading
                  spinnerColor="white"
                  dimensions={{ height: "24px", width: "24px" }}
                />
              ) : (
                "Review Trip"
              )}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
