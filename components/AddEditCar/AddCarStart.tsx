import React, { Dispatch, SetStateAction } from "react";

interface AddCarStartProps {
  setActiveSlide: Dispatch<SetStateAction<number>>;
  //   activeSlide?: number;
}

export const AddCarStart = (props: AddCarStartProps) => {
  return (
    <>
      <h1>Let's set you up for success!</h1>
      <h6>Requirements to list your car</h6>
      <ul>
        <li>Car Owner National ID copy</li>
        <li>Car Logbook Scanned Copy</li>
        <li>At least 5 clean photos of your car</li>
      </ul>
      <div className="d-flex justify-content-between mt-4">
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
