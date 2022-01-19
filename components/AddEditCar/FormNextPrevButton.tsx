import React, { Dispatch, FC, SetStateAction } from "react";
import { ButtonLoading } from "../Loading/ButtonLoading";

interface FormNextPrevButtonProps {
  loading: boolean;
  disabled?: boolean;
  setActiveSlide: Dispatch<SetStateAction<number>>;
  activeSlide: number;
}

export const FormNextPrevButton: FC<FormNextPrevButtonProps> = (props) => {
  return (
    <div className="d-flex justify-content-between mt-4">
      <div>
        {props.activeSlide !== 0 && (
          <button
            className="btn bgOrange"
            onClick={() => props.setActiveSlide(props.activeSlide - 1)}
          >
            Prev
          </button>
        )}
      </div>

      <button className="btn bgOrange" type="submit" disabled={props.disabled}>
        {props.loading ? (
          <ButtonLoading
            spinnerColor="white"
            dimensions={{ height: "18px", width: "18px" }}
          />
        ) : (
          "Next"
        )}
      </button>
    </div>
  );
};
