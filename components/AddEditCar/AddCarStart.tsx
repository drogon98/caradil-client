import React, { Dispatch, SetStateAction } from "react";

interface AddCarStartProps {
  setActiveSlide: Dispatch<SetStateAction<number>>;
  //   activeSlide?: number;
}

export const AddCarStart = (props: AddCarStartProps) => {
  return (
    <>
      {/* <h1>List Car</h1> */}
      <h4>Requirements to list your car</h4>
      <ul>
        <li>Car Owner National ID copy</li>
        <li>Car Logbook Scanned Copy (Can add later)</li>
        <li>
          At least 5 clean photos of your car. These should be rear,fore,both
          sides and inner photos of the car. These photos <b>should not</b>{" "}
          contain any contact information like phone no. or email
        </li>
      </ul>
      <div className="d-flex justify-content-end mt-4">
        <button
          className="btn bgOrange"
          type="submit"
          onClick={() => props.setActiveSlide(0)}
        >
          Start
        </button>
      </div>
    </>
  );
};
