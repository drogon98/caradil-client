import Link from "next/link";
import React, { FC, MouseEvent, useEffect, useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import slugify from "slugify";
import {
  Car,
  useUpdateCarFavouriteMutation,
} from "../../graphql_types/generated/graphql";
import { useAppSelector } from "../../redux/hooks";
import LoginWithModal from "../Auth/LoginWithModal";
import { useUserId } from "../hooks/useUserId";
import Image from "next/image";
import CustomImage from "../Image";

interface CarBoxProps {
  data: Car;
}

export const CarBox: FC<CarBoxProps> = (props) => {
  const [isFavourite, setIsFavourite] = useState<boolean>();
  const token = useAppSelector((state) => state.auth._id);
  const userId = useUserId(token);
  const [updateFavourite, { loading: updatingFavourite }] =
    useUpdateCarFavouriteMutation();

  useEffect(() => {
    if (props.data && userId) {
      const found = props.data?.besties?.find((user) => user.id === userId);
      setIsFavourite(found ? true : false);
    }
  }, [props.data, userId]);

  const handleFavClick = async (e: MouseEvent<HTMLButtonElement>) => {
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

  return (
    <div className="carBox shadow" style={{ width: "100%" }}>
      {token ? (
        <button
          onClick={handleFavClick}
          disabled={updatingFavourite}
          className="fav-icon cursor-pointer"
        >
          {isFavourite ? (
            <BsSuitHeartFill size="21px" />
          ) : (
            <BsSuitHeart size="21px" />
          )}
        </button>
      ) : (
        <LoginWithModal>
          <a className="fav-icon cursor-pointer">
            <BsSuitHeart size="21px" />
          </a>
        </LoginWithModal>
      )}

      <Link href={`/${slugify(props.data.name!)}/${props.data.id}`}>
        <a>
          <CustomImage
            src={props.data?.photos?.[0]?.secure_url ?? "/images/lambo.jpg"}
            alt="Car Photo"
            height={"200px"}
            width={"350px"}
            layout="responsive"
          />
          <div className="p-2">
            <h5 className="m-0">{props.data.name}</h5>
            {/* <p>Seats:{ props.data.seats}</p> */}
            {/* <p className="m-0">Trips:5</p> */}
            <hr />
            <div className="d-flex justify-content-end">
              <p className="fw-bolder">
                Ksh.
                {props.data?.daily_rate &&
                  props.data?.daily_rate.toLocaleString()}
                /day
              </p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
