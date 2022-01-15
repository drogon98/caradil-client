import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { ButtonLoading } from "../Loading/ButtonLoading";
import { Car } from "../../graphql_types/generated/graphql";
import { useAppSelector } from "../../redux/hooks";

interface Props {
  car: Car;
  handleUpdateFavourite: any;
  updatingFavourite: any;
  isFavourite: boolean;
}

export default function SharedSections(props: Props): ReactElement {
  const token = useAppSelector((state) => state.auth._id);
  const router = useRouter();
  return (
    <>
      <div className="mt-3">
        <hr />
        <div className="d-flex justify-content-between">
          <h6>Distance included</h6>
          <p>{props.car?.distance_per_day} KM</p>
        </div>
        <small>
          Ksh.{props.car?.extra_distance_rate} per km fee for additional
          kilometres driven
        </small>
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
            disabled={props.updatingFavourite}
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
          <Link
            href={{
              pathname: "/login",
              query: {
                next: router.pathname,
                nextQuery: JSON.stringify(router.query),
              },
            }}
          >
            <a>
              <div className="d-grid gap-2 mt-4">
                <button className="btn bg-gray">Add to favourite</button>
              </div>
            </a>
          </Link>
        )}
      </div>
    </>
  );
}
