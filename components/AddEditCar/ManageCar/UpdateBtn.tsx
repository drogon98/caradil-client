import React, { ReactElement } from "react";
import { ButtonLoading } from "../../Loading/ButtonLoading";

interface Props {
  loading: boolean;
  disabled?: boolean;
}

export default function UpdateBtn(props: Props): ReactElement {
  return (
    <div className="d-grid gap-2 mt-4">
      <button
        type="submit"
        className="btn bgOrange"
        disabled={props.loading || props.disabled}
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
