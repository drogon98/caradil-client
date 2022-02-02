import React, { ReactElement, useEffect, useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { Car } from "../../graphql_types/generated/graphql";
import { useAppSelector } from "../../redux/hooks";
import LoginWithModal from "../Auth/LoginWithModal";
import { ButtonLoading } from "../Loading/ButtonLoading";

interface Props {
  car: Car;
  handleUpdateFavourite: any;
  updatingFavourite: any;
  isFavourite: boolean;
  isCarPreview: boolean;
}

export default function SharedSections(props: Props): ReactElement {
  // console.log("props.car :>> ", props.car);
  const token = useAppSelector((state) => state.auth._id);
  const [extraDistRate, setExtraDisRate] = useState(0);

  // console.log("extraDistRate :>> ", extraDistRate);

  useEffect(() => {
    if (props.car.distance_per_day && props.car?.daily_rate) {
      try {
        let tempRate = props.car?.daily_rate / props.car.distance_per_day;
        setExtraDisRate(Math.round(tempRate));
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  }, [props.car]);

  return (
    <>
      <div className="mt-3">
        <hr />
        <div className="d-flex justify-content-between">
          <h6>Distance included</h6>
          {props.car.has_unlimited_distance ? (
            <small className="fw-bolder">Unlimited</small>
          ) : (
            <p>{props.car?.distance_per_day} KM</p>
          )}
        </div>
        {!props.car.has_unlimited_distance && (
          <small>
            Ksh.{extraDistRate} per km fee for additional kilometres driven
          </small>
        )}
      </div>
      <div className="mt-3">
        <hr />
        <div className="d-flex justify-content-between">
          <h6>Location</h6>
        </div>
        <small>
          This {props.car?.name} is located at <b>{props.car?.location}</b>
        </small>
      </div>

      <hr />
      <div className="d-grid gap-2 mt-4">
        {token ? (
          <button
            onClick={props.handleUpdateFavourite}
            disabled={props.updatingFavourite || props.isCarPreview}
            className="btn bg-gray"
          >
            {props.updatingFavourite ? (
              <ButtonLoading
                spinnerColor="white"
                dimensions={{ height: "24px", width: "24px" }}
              />
            ) : (
              <>
                {" "}
                {props.isFavourite ? (
                  <span>
                    <BsSuitHeartFill className="carousel-heart-icon" /> Remove
                    from favourite
                  </span>
                ) : (
                  <span>
                    <BsSuitHeart className="carousel-heart-icon" /> Add to
                    favourite
                  </span>
                )}
              </>
            )}
          </button>
        ) : (
          // <Link
          //   href={{
          //     pathname: "/login",
          //     query: {
          //       next: router.pathname,
          //       nextQuery: JSON.stringify(router.query),
          //     },
          //   }}
          // >
          //   <a>
          <LoginWithModal>
            <div className="d-grid gap-2 mt-4">
              <button className="btn bg-gray">
                {" "}
                <BsSuitHeart className="carousel-heart-icon" /> Add to favourite
              </button>
            </div>
          </LoginWithModal>
          //   </a>
          // </Link>
        )}
      </div>
    </>
  );
}
