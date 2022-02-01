import React, { FC, SyntheticEvent } from "react";
import {
  Car,
  // useEditCarVerifiedMutation,
} from "../../../graphql_types/generated/graphql";

interface UnverifiedBoxProps {
  data: Car;
}

export const UnverifiedBox: FC<UnverifiedBoxProps> = (props) => {
  // const [editVerified, { loading }] = useEditCarVerifiedMutation();

  const handleClick = async (e: SyntheticEvent<HTMLButtonElement>) => {
    console.log("e :>> ", e);
    // const response = await editVerified({
    //   variables: { carId: props.data.id! },
    // });
    // console.log("response :>> ", response);
  };
  return (
    <div className="shadow p-3 mb- d-flex align-items-center justify-content-between">
      <h6>{props.data.name}</h6>
      <button className="btn bgOrange" onClick={handleClick}>
        Verify
      </button>
    </div>
  );
};
