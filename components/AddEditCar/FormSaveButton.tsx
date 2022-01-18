import { Icon } from "@iconify/react";
import React, { FC } from "react";
import { ButtonLoading } from "../Loading/ButtonLoading";

interface FormSaveButtonProps {
  saved: boolean;
  loading: boolean;
  isEdit: boolean;
  carId: number;
  disabled?: boolean;
}

/**
 * @author @CodeYourEmpire
 * @function @FormSaveButton
 **/

export const FormSaveButton: FC<FormSaveButtonProps> = (props) => {
  return (
    <div className="d-flex justify-content-end align-items-center mt-3">
      {props.saved && (
        <span style={{ width: "calc(100px - 2em)", marginRight: "1em" }}>
          <div>
            <Icon
              icon="teenyicons:tick-circle-solid"
              style={{ color: "green" }}
            />
            <span className="ml-2">Saved</span>
          </div>
        </span>
      )}
      <div className="d-flex justify-content-end">
        {props.isEdit ? (
          <button
            className="btn bgOrange p-0 m-0"
            disabled={true}
            style={{ height: "35px", minWidth: "60px" }}
          >
            Save
          </button>
        ) : (
          <button
            className="btn bgOrange p-0 m-0"
            disabled={props.loading || !props.carId || props.disabled}
            style={{ height: "35px", minWidth: "60px" }}
            type="submit"
          >
            {props.loading ? (
              <ButtonLoading
                spinnerColor="white"
                dimensions={{ height: "18px", width: "18px" }}
              />
            ) : (
              "Save"
            )}
          </button>
        )}
      </div>
    </div>
  );
};
