import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import {
  CarMilesInput,
  useEditCarMilesMutation,
} from "../../graphql_types/generated/graphql";
import { FormSaveButton } from "./FormSaveButton";

interface MilesProps {
  value: CarMilesInput;
  setData: Dispatch<SetStateAction<CarMilesInput>>;
  carId: number | undefined;
}

/**
 * @author
 * @function @Miles
 **/

export const Miles: FC<MilesProps> = (props) => {
  const [editMiles, { loading }] = useEditCarMilesMutation();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.setData({ miles_per_day: parseInt(e.target.value) });
  };
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response;
    try {
      response = await editMiles({
        variables: {
          carId: props.carId!,
          input: { miles_per_day: props.value.miles_per_day },
        },
      });
    } catch (error) {
      let errorMessage = "";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log("errorMessage :>> ", errorMessage);
      return;
      // setError("Network Error!");
    }

    if (response.data?.editCarMiles.error) {
    } else if (response.data?.editCarMiles.carId) {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }
  };

  return (
    <div>
      <p>This is the distance your car should cover in one day of a trip.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="miles">Miles</label>
          <input
            type="number"
            name="miles"
            className="form-control"
            value={props.value.miles_per_day}
            required
            onChange={handleChange}
            placeholder="eg 800"
          />
        </div>
        <FormSaveButton
          saved={saved}
          loading={loading}
          isEdit={false}
          carId={props.carId!}
        />
      </form>
    </div>
  );
};
