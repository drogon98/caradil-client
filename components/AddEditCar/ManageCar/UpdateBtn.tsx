import React, { ReactElement } from "react";
import { ButtonLoading } from "../../Loading/ButtonLoading";

interface Props {
  loading: boolean;
  disabled?: boolean;
}

export default function UpdateBtn(props: Props): ReactElement {
  return (
    <div className="d-flex justify-content-end mt-5">
      <button
        type="submit"
        className="btn bgOrange"
        disabled={props.loading || props.disabled}
        style={{ width: "100px" }}
      >
        {props.loading ? (
          <ButtonLoading
            spinnerColor="white"
            dimensions={{ height: "24px", width: "24px" }}
          />
        ) : (
          "Update"
        )}
      </button>
    </div>
  );
}
