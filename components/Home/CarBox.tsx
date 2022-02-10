import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import slugify from "slugify";
import {
  Car,
  useUpdateCarFavouriteMutation,
} from "../../graphql_types/generated/graphql";
import { useAppSelector } from "../../redux/hooks";
import LoginWithModal from "../Auth/LoginWithModal";
import { useUserId } from "../hooks/useUserId";

interface CarBoxProps {
  data: Car;
}

export const CarBox: FC<CarBoxProps> = (props) => {
  const router = useRouter();
  const [isFavourite, setIsFavourite] = useState<boolean>();
  const token = useAppSelector((state) => state.auth._id);
  const userId = useUserId(token);
  const [updateFavourite, { loading: updatingFavourite }] =
    useUpdateCarFavouriteMutation();

  // console.log("userId :>> ", userId);

  // console.log("props.data :>> ", props.data);

  useEffect(() => {
    if (props.data && userId) {
      const found = props.data?.besties?.find((user) => user.id === userId);
      setIsFavourite(found ? true : false);
    }
  }, [props.data, userId]);

  const handleFavClick = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await updateFavourite({
      variables: {
        carId: props.data.id!,
        opType: isFavourite ? "remove" : "add",
      },
    });
    // console.log("response :>> ", response);
    if (response.data?.updateFavourite.error) {
    } else {
      setIsFavourite(!isFavourite);
    }
  };
  // console.log("props.data :>> ", props.data);
  return (
    <div className="carBox shadow" style={{ width: "100%" }}>
      {token ? (
        <button
          onClick={handleFavClick}
          disabled={updatingFavourite}
          className="fav-icon cursor-pointer"
        >
          {isFavourite ? (
            <BsSuitHeartFill size="28px" />
          ) : (
            <BsSuitHeart size="28px" />
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
        <LoginWithModal>
          <a className="fav-icon cursor-pointer">
            <BsSuitHeart size="28px" />
          </a>
        </LoginWithModal>
        // </Link>
      )}

      <Link href={`/${slugify(props.data.name!)}/${props.data.id}`}>
        <a>
          <img
            className="carImage"
            src={props.data?.photos?.[0]?.secure_url ?? "/images/lambo.jpg"}
            width="100%"
            style={{ objectFit: "cover" }}
          />
          <div className="p-2">
            <h4 className="m-0">{props.data.name}</h4>
            {/* <p>Seats:{ props.data.seats}</p> */}
            {/* <p className="m-0">Trips:5</p> */}
            <hr />
            <div className="d-flex justify-content-end">
              <h6 className="fw-bolder">
                Ksh.
                {props.data?.daily_rate &&
                  props.data?.daily_rate.toLocaleString()}
                /day
              </h6>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
